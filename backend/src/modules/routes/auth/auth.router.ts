import { Router } from "express";
import { authController } from "../../controllers/auth/auth.controller";
import { userAuthMiddleware } from "../../middlewares/userAuthMiddleware";
const router = Router();

router.post("/send-otp", authController.sendOtp);
router.post("/resend-otp", authController.resendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/add-password", userAuthMiddleware, authController.addPassword);
router.post(
  "/backup-account",
  userAuthMiddleware,
  authController.backupAccount
);
router.get("/get-nonce", userAuthMiddleware, authController.getNonce);
router.post("/verify-signature", authController.verifySignature);
router.post(
  "/set-payment-tag",
  userAuthMiddleware,
  authController.setPaymentTag
);
router.get("/me", userAuthMiddleware, authController.getUser);
router.post("/check-password", userAuthMiddleware, authController.checkPassword);

export default router;
