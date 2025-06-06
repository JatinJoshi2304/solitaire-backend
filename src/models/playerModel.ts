import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPlayer extends Document {
  name: string;
  points: number;
  bet: number;
  orderId: number;
  roomId: Types.ObjectId;
  isOwner: boolean;
  isReady: boolean;
}

const PlayerSchema = new Schema<IPlayer>(
  {
    name: { type: String, required: true },
    points: { type: Number, default: 0 },
    bet: { type: Number, default: 0 },
    orderId: { type: Number, default: 0 },
    roomId: { type: Schema.Types.ObjectId, ref: "Room" },
    isOwner: { type: Boolean, default: false },
    isReady: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Player = mongoose.model<IPlayer>("Player", PlayerSchema);
