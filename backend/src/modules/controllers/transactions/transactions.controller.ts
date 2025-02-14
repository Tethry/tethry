import { Request, Response } from "express";
import { Transaction } from "../../schemas/transaction.collection";

export const transactionsController = {
  getRecentTransactions: async (req: Request, res: Response) => {
    const userId = req.user;

    const transactions = await Transaction.find({
      user: userId,
      type: "transfer",
    })
      .sort({ timestamp: -1 })
      .skip(0)
      .limit(6);

    res.status(200).json({ status: true, transactions });
  },

  getCardRecentTransactions: async (req: Request, res: Response) => {
    const userId = req.user;

    const transactions = await Transaction.find({ user: userId, type: "card" })
      .sort({ createdAt: -1 })
      .skip(0)
      .limit(6);


    res.status(200).json({ status: true, transactions });
  },
};
