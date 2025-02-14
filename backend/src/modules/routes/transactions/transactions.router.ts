import { Router } from "express";
import { transactionsController } from "../../controllers/transactions/transactions.controller";
import { userAuthMiddleware } from "../../middlewares/userAuthMiddleware";

const router = Router();

router.get(
  "/recent",
  userAuthMiddleware,
  transactionsController.getRecentTransactions
);

router.get(
  "/card/recent",
  userAuthMiddleware,
  transactionsController.getCardRecentTransactions
);

export default router;
