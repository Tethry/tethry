import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

export const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    auth: {
      passwordHash: { type: String },
      verificationCode: { type: String },
      verificationCodeExpiry: { type: Date },
    },

    wallet: {
      walletAddress: { type: String, required: true },
      paymentTag: { type: String, required: true },
      googleDriveBackup: {
        isEnabled: { type: Boolean, required: true, default: false },
      },
    },
    mfa: {
      isEnabled: { type: Boolean, required: true, default: false },
      backupCode: { type: String },
    },
    security: {
      reversePasswordHash: { type: String },
      panicMode: { type: Boolean, required: true, default: false },
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
