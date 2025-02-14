import { Document, Types } from "mongoose";

export interface ITransaction extends Document {
  user: Types.ObjectId;
  type: "card" | "transfer";
  asset: "USDT";
  credit: boolean;
  amount: string;
  charge: string;
  timestamp: Date;
  receiverAddress: string;
  senderAddress: string;
  senderPaymentTag: string;
  receiverPaymentTag: string;
  location: string;
}
