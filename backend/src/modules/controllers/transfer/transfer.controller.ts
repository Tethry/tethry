import { Request, Response } from "express";
import { User } from "../../schemas/user.collection";
import { paymentTagValidator } from "../../../common/validators/paymentTagValidator";
import { transferGasless } from "../../services/transfer.service";
import { Message } from "../../interfaces/Imessage";
import { Transaction } from "../../schemas/transaction.collection";

export const transferController = {
  checkTransferTag: async (req: Request, res: Response): Promise<void> => {
    const userId = req.user;

    const { tag } = req.body;

    if (!tag) {
      res.status(400).json({ message: "Tag is required" });
      return;
    }

    if (!paymentTagValidator(tag)) {
      res.status(400).json({ status: false, message: "Invalid transfer tag" });
      return;
    }

    // the tag should not be the same as the user's payment tag
    const user = await User.findById(userId);
    if (user?.wallet.paymentTag.replace("@", "") === tag.replace("@", "")) {
      res.status(400).json({
        status: false,
        message: "Tag is the same as your payment tag",
      });
      return;
    }

    const tagExists = await User.findOne({
      "wallet.paymentTag": `@${tag}`.toLowerCase(),
    });

    if (tagExists) {
      res.status(200).json({
        status: true,
        message: "Transfer tag found",
        address: tagExists.wallet.walletAddress,
      });
      return;
    }

    res.status(404).json({ status: false, message: "Transfer tag not found" });
  },

  transfer: async (req: Request, res: Response): Promise<void> => {
    const userId = req.user;
    const { signature, message } = req.body;

    console.log(signature, message);

    try {
      if (!signature) {
        res.status(400).json({
          status: false,
          message: "Signature not found",
        });
        return;
      }

      if (!message) {
        res.status(400).json({
          status: false,
          message: "Message not found",
        });
        return;
      }

      const messageObject = message as Message;

      const result = await transferGasless(signature, messageObject);

      const internalReceiver = await User.findOne({
        "wallet.walletAddress": messageObject.recipient,
      });

      const internalSender = await User.findById(userId);

      await Transaction.create({
        user: userId,
        type: "transfer",
        asset: "USDT",
        credit: false,
        amount: messageObject.value,
        charge: messageObject.charge,
        timestamp: new Date(),
        receiverAddress: messageObject.recipient,
        receiverPaymentTag: internalReceiver?.wallet.paymentTag,
        senderAddress: internalSender?.wallet.walletAddress,
        senderPaymentTag: internalSender?.wallet.paymentTag,
        location: "transfer",
      });

      if (internalReceiver) {
        await Transaction.create({
          user: internalReceiver._id,
          type: "transfer",
          asset: "USDT",
          credit: true,
          amount: messageObject.value,
          charge: messageObject.charge,
          timestamp: new Date(),
          receiverAddress: messageObject.recipient,
          receiverPaymentTag: internalReceiver?.wallet.paymentTag,
          senderAddress: internalSender?.wallet.walletAddress,
          senderPaymentTag: internalSender?.wallet.paymentTag,
          location: "transfer",
        });
      }

      res.status(200).json({
        status: true,
        message: "Transaction Completed",
        transactionHash: result,
      });

      //   const result = await dryRunGaslessTransfer(
      //     signature,
      //     messageObject,
      //     CONTRACT_ADDRESS,
      //     rpcUrl
      //   );

      //   if (result.willSucceed) {

      //     res
      //       .status(200)
      //       .json({ status: true, message: "Transaction will succeed" });

      //     return;
      //   } else {
      //     res.status(400).json({ status: false, message: "Transaction will fail" });
      //     return;
      //   }
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ status: false, message: "Internal server error" });
      return;
    }
  },
};
