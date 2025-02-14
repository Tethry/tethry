import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  auth: {
    passwordHash: string;
    verificationCode: string;
    verificationCodeExpiry: Date;
  };
  wallet: {
    walletAddress: string;
    paymentTag: string;

    googleDriveBackup: {
      isEnabled: boolean;
    };
  };

  mfa: {
    isEnabled: boolean;
    backupCode: string;
  };
  security: {
    reversePasswordHash: string;
    panicMode: boolean;
  };
}
