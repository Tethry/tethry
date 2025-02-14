import { Request, Response } from "express";
import { User } from "../../schemas/user.collection";
import { ethers, id } from "ethers";
import { encrypt, decrypt } from "../../../common/utils/encryptionUtil";
import { emailValidator } from "../../../common/validators/emailValidator";
import { generateOtp, isOtpValid } from "../../../common/utils/OtpUtil";
import { sendEmail } from "../../../common/utils/emailUtils";
import { Verification } from "../../schemas/verification.collection";
import { OTP_EXPIRY_TIME, isOtpExpired } from "../../../common/utils/OtpUtil";
import { OtpTemplate } from "../../../common/templates/OtpTemplate";
import {
  createWallet,
  verifySignature,
} from "../../../common/utils/walletUtil";
import jwt from "jsonwebtoken";
import { ENVIRONMENT } from "../../../common/config/environment";
const JWT_SECRET = ENVIRONMENT.APP.JWT_SECRET;
import {
  hashPassword,
  verifyPassword,
} from "../../../common/utils/passwordUtil";
// import { BackupUtil } from "../../../common/utils/backupUtil";
import { LocalBackup } from "../../../common/utils/localBackup";
import { RefreshToken } from "../../schemas/refreshToken.collection";
import { encryptRefreshToken } from "../../../common/utils/encryptionUtil";
import { Nonce } from "../../schemas/nonce.collection";
import { generateNonce } from "siwe";
import { paymentTagValidator } from "../../../common/validators/paymentTagValidator";

export const authController = {
  sendOtp: async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ status: false, message: "Email is required" });
      return;
    }
    if (!emailValidator(email)) {
      res.status(400).json({ status: false, message: "Invalid email" });
      return;
    }

    const verification = await Verification.findOne({ email });
    if (verification && !isOtpExpired(verification.verificationCodeExpiry)) {
      res.status(400).json({ status: false, message: "OTP already sent" });
      return;
    }

    const verificationCode = generateOtp();
    const verificationCodeExpiry = new Date(Date.now() + OTP_EXPIRY_TIME);

    await Verification.create({
      email,
      verificationCode,
      verificationCodeExpiry,
    });

    const mailResponse = await sendEmail({
      email,
      subject: "OTP for verification",
      html: OtpTemplate(verificationCode),
    });

    if (!mailResponse) {
      res.status(500).json({ status: false, message: "Failed to send email" });
    }

    res.status(200).json({ status: true, message: "OTP sent to email" });
  },

  resendOtp: async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ status: false, message: "Email is required" });
      return;
    }
    if (!emailValidator(email)) {
      res.status(400).json({ status: false, message: "Invalid email" });
      return;
    }

    const verification = await Verification.findOne({ email });
    if (!verification) {
      res.status(400).json({ status: false, message: "No verification found" });
      return;
    }

    if (!isOtpExpired(verification.verificationCodeExpiry)) {
      res.status(400).json({ status: false, message: "OTP already sent" });
      return;
    }

    const verificationCode = generateOtp();
    const verificationCodeExpiry = new Date(Date.now() + OTP_EXPIRY_TIME);

    verification.verificationCode = verificationCode;
    verification.verificationCodeExpiry = verificationCodeExpiry;
    await verification.save();

    const mailResponse = await sendEmail({
      email,
      subject: "OTP for verification",
      html: OtpTemplate(verificationCode),
    });

    if (!mailResponse) {
      res.status(500).json({ status: false, message: "Failed to send email" });
    }

    res.status(200).json({ status: true, message: "OTP resent to email" });
  },

  verifyOtp: async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    console.log(otp);

    if (!email) {
      res.status(400).json({ status: false, message: "Email is required" });
      return;
    }
    if (!otp) {
      res.status(400).json({ status: false, message: "OTP is required" });
      return;
    }

    const verification = await Verification.findOne({ email });
    if (!verification) {
      res.status(400).json({ status: false, message: "No verification found" });
      return;
    }

    if (isOtpExpired(verification.verificationCodeExpiry)) {
      res.status(400).json({ status: false, message: "OTP expired" });
      return;
    }

    if (!isOtpValid(otp, verification.verificationCode)) {
      res.status(400).json({ status: false, message: "Invalid OTP" });
      return;
    }

    const user = await User.findOne({ email });

    // If the user is not found, create a new user

    if (!user) {
      //new user

      const wallet = await createWallet();

      const newWallet = {
        walletAddress: wallet.address,
        privateKey: encrypt(wallet.privateKey),
      };

      const newUser = await User.create({
        email,
        auth: {
          verificationCode: "",
          verificationCodeExpiry: new Date(),
        },
        wallet: {
          walletAddress: newWallet.walletAddress,
          paymentTag: `@${newWallet.walletAddress}`,
        },
      });

      await Verification.deleteOne({ email });

      const token = jwt.sign({ id: newUser._id }, JWT_SECRET as string, {
        expiresIn: "12h",
      });

      res.status(200).json({
        status: true,
        message: "OTP verified",
        wallet: newWallet,
        newUser: true,
        email,
        token,
      });

      return;
    }

    const wallet = user.wallet.walletAddress;

    const token = jwt.sign({ id: user._id }, JWT_SECRET as string, {
      expiresIn: "12h",
    });

    if (!user.wallet.googleDriveBackup.isEnabled) {
      res.status(400).json({
        status: false,
        message: "No Backup Found",
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: "OTP verified",
      wallet,
      isNewUser: false,
      email,
      token,
    });
  },

  //! Authenticated Route

  addPassword: async (req: Request, res: Response) => {
    const userId = req.user;

    const { password } = req.body;

    if (!password) {
      res.status(400).json({ status: false, message: "Password is required" });
      return;
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(400).json({ status: false, message: "User not found" });
      return;
    }

    if (user.auth.passwordHash) {
      res
        .status(400)
        .json({ status: false, message: "Password already added" });
      return;
    }

    const passwordHash = await hashPassword(password);

    user.auth.passwordHash = passwordHash;
    await user.save();

    res.status(200).json({ status: true, message: "Password added" });
  },

  //! Authenticated Route

  backupAccount: async (req: Request, res: Response) => {
    const userId = req.user;

    const { refreshToken, encryptedPrivateKey, os } = req.body;

    if (!os) {
      res.status(400).json({ status: false, message: "OS is required" });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({ status: false, message: "User not found" });
      return;
    }

    if (!user.auth.passwordHash) {
      res.status(400).json({ status: false, message: "Password not set" });
      return;
    }

    if (!refreshToken) {
      res
        .status(400)
        .json({ status: false, message: "Refresh token is required" });
      return;
    }

    if (!encryptedPrivateKey) {
      res
        .status(400)
        .json({ status: false, message: "Encrypted private key is required" });
      return;
    }

    // const backupUtil = new BackupUtil(refreshToken, os);
    const backupUtil = new LocalBackup(); // for testing

    const backup = await backupUtil.createBackup(
      userId as string,
      encryptedPrivateKey
    );

    user.wallet.googleDriveBackup.isEnabled = true;
    await user.save();

    await RefreshToken.create({
      userId,
      token: encryptRefreshToken(refreshToken),
    });

    res.status(200).json({ status: true, message: "Backup created", backup });
  },

  //! Authenticated Route

  getNonce: async (req: Request, res: Response) => {
    const userId = req.user;

    const nonce = await Nonce.findOne({ userId });

    if (!nonce) {
      const newNonce = await Nonce.create({
        userId,
        nonce: generateNonce().toLowerCase(),
      });

      res.status(200).json({
        status: true,
        message: "Nonce created",
        nonce: newNonce.nonce,
      });
      return;
    }

    nonce.nonce = generateNonce().toLowerCase();
    nonce.used = false;
    await nonce.save();

    res.status(200).json({
      status: true,
      message: "Nonce created",
      nonce: nonce.nonce,
    });
  },

  verifySignature: async (req: Request, res: Response) => {
    const { signature, message, walletAddress } = req.body;

    // console.log(req.body);

    if (!signature) {
      res.status(400).json({ status: false, message: "Signature is required" });
      return;
    }

    if (!message) {
      res.status(400).json({ status: false, message: "Message is required" });
      return;
    }
    if (!walletAddress) {
      res
        .status(400)
        .json({ status: false, message: "Wallet address is required" });
      return;
    }

    const { nonce, verified } = await verifySignature(
      signature,
      message,
      walletAddress
    );

    if (!nonce) {
      res.status(400).json({ status: false, message: "Invalid signature" });
      return;
    }

    if (!verified) {
      res.status(400).json({ status: false, message: "Invalid signature" });
      return;
    }

    const nonceIsUsed = await Nonce.findOne({ nonce: nonce.toLowerCase() });

    if (!nonceIsUsed) {
      res.status(400).json({ status: false, message: "Nonce not found" });
      return;
    }

    if (nonceIsUsed?.used) {
      res.status(400).json({ status: false, message: "Nonce already used" });
      return;
    }

    nonceIsUsed.used = true;
    await nonceIsUsed.save();

    const user = await User.findOne({ "wallet.walletAddress": walletAddress });

    if (!user) {
      res.status(400).json({ status: false, message: "User not found" });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET as string, {
      expiresIn: "30d",
    });

    res.status(200).json({
      status: true,
      message: "Signature verified",
      nonce,
      verified,
      token,
    });
  },

  //! Authenticated Route

  setPaymentTag: async (req: Request, res: Response) => {
    const userId = req.user;

    const { paymentTag } = req.body;

    console.log(paymentTag);

    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({ status: false, message: "User not found" });
      return;
    }

    if (!paymentTag) {
      res
        .status(400)
        .json({ status: false, message: "Payment tag is required" });
      return;
    }

    if (!paymentTagValidator(paymentTag)) {
      res.status(400).json({ status: false, message: "Invalid payment tag" });
      return;
    }

    const tagExists = await User.findOne({
      "wallet.paymentTag": `@${paymentTag}`.toLowerCase(),
    });

    if (tagExists) {
      res
        .status(400)
        .json({ status: false, message: "Payment tag already exists" });
      return;
    }

    user.wallet.paymentTag = `@${paymentTag}`.toLowerCase();
    await user.save();

    res.status(200).json({ status: true, message: "Payment tag set" });
  },

  //! Authenticated Route

  getLoggedInUser: async (req: Request, res: Response) => {
    const userId = req.user;

    const user = await User.findById(userId, {
      wallet: { paymentTag: 1, walletAddress: 1 },
      email: 1,
      auth: { passwordHash: 0 },
    });

    if (!user) {
      res.status(400).json({ status: false, message: "User not found" });
      return;
    }

    res.status(200).json({ status: true, user });
  },

  getUser: async (req: Request, res: Response) => {
    const userId = req.user;

    const user = await User.findById(userId).select({
      email: 1,
      "wallet.walletAddress": 1,
      "wallet.paymentTag": 1,
      "security.panicMode": 1,
      _id: 0,
    });

    res.status(200).json({ status: true, user });
  },

  checkPassword: async (req: Request, res: Response) => {
    const userId = req.user;

    const { password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({ status: false, message: "User not found" });
      return;
    }

    const isPasswordCorrect = await verifyPassword(
      password,
      user.auth.passwordHash
    );

    res
      .status(200)
      .json({ status: isPasswordCorrect, message: "Password verified" });
  },
};
