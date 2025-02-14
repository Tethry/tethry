import { model, Schema } from "mongoose";
import { INonce } from "../interfaces/INonce";

export const NonceSchema = new Schema<INonce>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    nonce: { type: String, required: true },
    used: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export const Nonce = model<INonce>("Nonce", NonceSchema);
