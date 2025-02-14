import { Router } from "express";
import { transferController } from "../../controllers/transfer/transfer.controller";
import { userAuthMiddleware } from "../../middlewares/userAuthMiddleware";

const router = Router();

router.post(
  "/check-transfer-tag",
  userAuthMiddleware,
  transferController.checkTransferTag
);

router.post("/transfer", userAuthMiddleware, transferController.transfer);
export default router;
