import mongoose, { Schema } from "mongoose";
const PlayerSchema = new Schema({
    name: { type: String, required: true },
    points: { type: Number, default: 0 },
    bet: { type: Number, default: 0 },
    roomId: { type: Schema.Types.ObjectId, ref: "Room" },
    isOwner: { type: Boolean, default: false },
    isReady: { type: Boolean, default: false },
}, { timestamps: true });
export const Player = mongoose.model("Player", PlayerSchema);
