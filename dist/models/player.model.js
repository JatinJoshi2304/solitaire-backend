import mongoose, { Schema } from "mongoose";
const PlayerSchema = new Schema({
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    isReady: { type: Boolean, default: false },
}, { timestamps: true });
export const Player = mongoose.model("Player", PlayerSchema);
