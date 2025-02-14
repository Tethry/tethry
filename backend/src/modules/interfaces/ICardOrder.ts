import { Document, Types } from "mongoose";

export interface ICardOrder extends Document {
  user: Types.ObjectId;
  cardId: string;
  status: "pending" | "delivered" | "cancelled";
  fullName: string;
  address: string;
  state: string;
  city: string;
  country: string;
  deliveryDate: Date;
}
