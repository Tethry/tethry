import { model, Schema } from "mongoose";
import { ITransaction } from "../interfaces/ITransaction";

export const transactionSchema = new Schema<ITransaction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      required: true,
      enum: ["card", "transfer"],
    },
    credit: {
      type: Boolean,
      required: true,
    },
    asset: {
      type: String,
      required: true,
      enum: ["USDT"],
    },
    amount: { type: String, required: true },
    charge: { type: String, required: true },
    timestamp: { type: Date, required: true },
    receiverAddress: { type: String, required: true },
    receiverPaymentTag: { type: String },
    senderAddress: { type: String },
    senderPaymentTag: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

export const Transaction = model<ITransaction>(
  "Transaction",
  transactionSchema
);
