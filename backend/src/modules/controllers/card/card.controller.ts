import { CardOrder } from "../../schemas/cardOrder.collection";
import { NfcCard } from "../../schemas/nfcCard.collection";
import { Request, Response } from "express";
import { transferGasless } from "../../services/transfer.service";
import { Message } from "../../interfaces/Imessage";
import { hashPassword } from "../../../common/utils/passwordUtil";
import { CardService } from "../../services/card.service";
import { User } from "../../schemas/user.collection";
import { Transaction } from "../../schemas/transaction.collection";
import { verifyPassword } from "../../../common/utils/passwordUtil";

export const cardController = {
  checkIfUserHasCard: async (req: Request, res: Response) => {
    const userId = req.user;

    const card = await NfcCard.findOne({ user: userId });
    const cardOrder = await CardOrder.findOne({
      user: userId,
      status: "pending",
    });

    const isUserHasCard = card ? true : false;
    const isUserHasCardOrder = cardOrder ? true : false;

    res
      .status(200)
      .json({ status: true, isUserHasCard, isUserHasCardOrder, card });
  },

  createCardOrder: async (req: Request, res: Response) => {
    const userId = req.user;
    const { fullName, address, state, city, country, signature, message } =
      req.body;

    console.log(req.body);

    if (!fullName) {
      res.status(400).json({ status: false, message: "Full name is required" });
      return;
    }

    if (!address) {
      res.status(400).json({ status: false, message: "Address is required" });
      return;
    }

    if (!state) {
      res.status(400).json({ status: false, message: "State is required" });
      return;
    }

    if (!city) {
      res.status(400).json({ status: false, message: "City is required" });
      return;
    }

    if (!country) {
      res.status(400).json({ status: false, message: "Country is required" });
      return;
    }

    if (!signature) {
      res.status(400).json({ status: false, message: "Signature is required" });
      return;
    }

    if (!message) {
      res.status(400).json({ status: false, message: "Message is required" });
      return;
    }

    //check if the user has a pending card order
    const pendingCardOrder = await CardOrder.findOne({
      user: userId,
      status: "pending",
    });

    if (pendingCardOrder) {
      res
        .status(400)
        .json({ status: false, message: "User has a pending card order" });
      return;
    }

    //delivery date is 10 days from now
    const deliveryDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);

    //generate a random card id (CHECK BACK FOR BETTER SOLUTION)
    const cardId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const orderId = Math.random().toString(36).substring(2, 15);

    const messageObject = message as Message;

    const result = await transferGasless(signature, messageObject);
    console.log(result);

    await CardOrder.create({
      user: userId,
      cardId,
      fullName,
      address,
      state,
      city,
      country,
      deliveryDate,
    });

    res.status(200).json({
      status: true,
      message: "Card order created successfully",
      orderId,
      deliveryDate,
    });
  },

  activateCard: async (req: Request, res: Response) => {
    const userId = req.user;
    const { cardNumber, pin } = req.body;

    const card = await CardOrder.findOne({
      user: userId,
      cardId: String(cardNumber).trim().toLowerCase(),
    }).populate<{ user: { wallet: { walletAddress: string } } }>(
      "user",
      "wallet.walletAddress"
    );

    if (!card) {
      res.status(400).json({ status: false, message: "Card not found" });
      return;
    }

    if (card.status !== "pending") {
      res.status(400).json({ status: false, message: "Card is not pending" });
      return;
    }

    const hashedPin = await hashPassword(pin);

    await NfcCard.create({
      user: userId,
      cardId: card.cardId,
      pinHash: hashedPin,
      isActive: true,
    });

    card.status = "delivered";
    await card.save();

    const cardService = new CardService();
    await cardService.createCard(card.user.wallet.walletAddress);

    res.status(200).json({
      status: true,
      message: "Card activated successfully",
      card: card.cardId,
    });
  },

  fundCard: async (req: Request, res: Response) => {
    const userId = req.user;
    const { amount, signature, deadline, owner } = req.body;

    if (!amount) {
      res.status(400).json({ status: false, message: "Amount is required" });
      return;
    }

    if (!signature) {
      res.status(400).json({ status: false, message: "Signature is required" });
      return;
    }

    if (!deadline) {
      res.status(400).json({ status: false, message: "Deadline is required" });
      return;
    }

    if (!owner) {
      res.status(400).json({ status: false, message: "Owner is required" });
      return;
    }

    const cardService = new CardService();
    await cardService.fundCard({
      signature,
      owner,
      value: amount,
      deadline,
    });

    await Transaction.create({
      user: userId,
      amount,
      type: "card",
      credit: true,
      asset: "USDT",
      timestamp: new Date(),
      receiverAddress: owner,
      charge: "0",
    });

    res.status(200).json({
      status: true,
      message: "Card funded successfully",
      amount,
    });
  },

  getCardBalance: async (req: Request, res: Response) => {
    const userId = req.user;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(400).json({ status: false, message: "User not found" });
      return;
    }

    const cardService = new CardService();
    const balance = await cardService.getCardBalance(user.wallet.walletAddress);

    res.status(200).json({ status: true, balance });
  },

  processCardValidity: async (req: Request, res: Response) => {
    const userId = req.user;
    const { cardId } = req.body;

    const card = await NfcCard.findOne({ user: { $ne: userId }, cardId });

    if (!card) {
      res.status(400).json({ status: false, message: "Card not found" });
      return;
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(400).json({ status: false, message: "User not found" });
      return;
    }

    const cardOwner = await User.findOne({ _id: card.user });

    if (!cardOwner) {
      res.status(400).json({ status: false, message: "Card owner not found" });
      return;
    }

    const cardService = new CardService();
    const balance = await cardService.getCardBalance(
      cardOwner.wallet.walletAddress
    );

    res.status(200).json({
      status: true,
      card,
      balance,
      cardOwner: cardOwner.wallet.paymentTag,
    });
  },

  processCardTransfer: async (req: Request, res: Response) => {
    const userId = req.user;
    const { cardId, amount, pin } = req.body;

    if (!cardId) {
      res.status(400).json({ status: false, message: "Card ID is required" });
      return;
    }

    if (!amount) {
      res.status(400).json({ status: false, message: "Amount is required" });
      return;
    }

    if (!pin) {
      res.status(400).json({ status: false, message: "Pin is required" });
      return;
    }

    const card = await NfcCard.findOne({ user: { $ne: userId }, cardId });

    if (!card) {
      res.status(400).json({ status: false, message: "Card not found" });
      return;
    }

    const pinIsCorrect = await verifyPassword(pin, card.pinHash);

    if (!pinIsCorrect) {
      res.status(400).json({ status: false, message: "Pin is incorrect" });
      return;
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(400).json({ status: false, message: "User not found" });
      return;
    }

    const cardOwner = await User.findOne({ _id: card.user });

    if (!cardOwner) {
      res.status(400).json({ status: false, message: "Card owner not found" });
      return;
    }

    const cardService = new CardService();
    await cardService.cardTransfer(
      cardOwner.wallet.walletAddress,
      user.wallet.walletAddress,
      amount
    );

    await Transaction.create({
      user: userId,
      amount,
      type: "transfer",
      credit: true,
      asset: "USDT",
      timestamp: new Date(),
      receiverAddress: user.wallet.walletAddress,
      senderAddress: cardOwner.wallet.walletAddress,
      charge: "0",
    });

    await Transaction.create({
      user: cardOwner._id,
      amount,
      type: "card",
      credit: false,
      asset: "USDT",
      timestamp: new Date(),
      receiverAddress: user.wallet.walletAddress,
      senderAddress: cardOwner.wallet.walletAddress,
      charge: "0",
    });

    res.status(200).json({
      status: true,
      message: "Card Payment Successful",
      amount,
    });
  },
};
