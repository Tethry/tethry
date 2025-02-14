import { Document } from "mongoose";

export interface IVerification extends Document {
  email: string;
  verificationCode: string;
  verificationCodeExpiry: Date;
}
