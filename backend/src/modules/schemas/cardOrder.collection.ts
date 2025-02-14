import { model, Schema } from "mongoose";
import { ICardOrder } from "../interfaces/ICardOrder";

export const cardOrderSchema = new Schema<ICardOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cardId: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const CardOrder = model<ICardOrder>("CardOrder", cardOrderSchema);
