import { Document, Types } from "mongoose";

export interface INfcCard extends Document {
  user: Types.ObjectId;
  cardId: string;
  pinHash: string;
  usdtBalance: string;
  isActive: boolean;
  transactionLimit: string;
}
