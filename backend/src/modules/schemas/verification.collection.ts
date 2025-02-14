import { model, Schema } from "mongoose";
import { IVerification } from "../interfaces/IVerification";

export const verificationSchema = new Schema<IVerification>(
  {
    email: { type: String, required: true, unique: true },
    verificationCode: { type: String, required: true },
    verificationCodeExpiry: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Verification = model<IVerification>(
  "Verification",
  verificationSchema
);
