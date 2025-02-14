import { Router } from "express";
import { cardController } from "../../controllers/card/card.controller";
import { userAuthMiddleware } from "../../middlewares/userAuthMiddleware";

const router = Router();

router.get(
  "/check-if-user-has-card",
  userAuthMiddleware,
  cardController.checkIfUserHasCard
);

router.post("/activate", userAuthMiddleware, cardController.activateCard);

router.post("/order", userAuthMiddleware, cardController.createCardOrder);

router.post("/fund", userAuthMiddleware, cardController.fundCard);

router.get("/balance", userAuthMiddleware, cardController.getCardBalance);

router.post(
  "/process-validity",
  userAuthMiddleware,
  cardController.processCardValidity
);

router.post(
  "/transfer",
  userAuthMiddleware,
  cardController.processCardTransfer
);

export default router;
