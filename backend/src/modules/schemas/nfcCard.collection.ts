import { model, Schema } from "mongoose";
import { INfcCard } from "../interfaces/INfcCard";

export const nfcCardSchema = new Schema<INfcCard>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cardId: { type: String, required: true },
    pinHash: { type: String, required: true },
    usdtBalance: { type: String, required: true, default: "0" },
    isActive: { type: Boolean, required: true, default: false },
    transactionLimit: { type: String, required: true, default: "0" },
  },
  { timestamps: true }
);

export const NfcCard = model<INfcCard>("NfcCard", nfcCardSchema);
