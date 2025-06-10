import { Player } from "../models/playerModel.js";
export const createGuestPlayer = async (req, res) => {
    try {
        const { name, points } = req.body;
        if (!name || typeof name !== "string") {
            return res
                .status(400)
                .json({ message: "Name is required and must be a string." });
        }
        const existingPlayer = await Player.findOne({ name });
        if (existingPlayer) {
            return res.status(409).json({ message: "Player name already exists." });
        }
        const newPlayer = await Player.create({
            name,
            points,
            bet: 0,
            isReady: false,
            roomId: null,
            isOwner: false,
        });
        return res
            .status(201)
            .json({ message: "Guest player created.", player: newPlayer });
    }
    catch (error) {
        console.error("Error creating player:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
export const getPlayerWithRoomId = async (req, res) => {
    try {
        const { roomId } = req.params;
        if (!roomId) {
            return res.status(400).json({ message: "Room ID is required." });
        }
        const players = await Player.find({ roomId }).sort({ orderId: 1 });
        if (!players) {
            return res.status(404).json({ message: "Players not found." });
        }
        return res.status(200).json({ players });
    }
    catch (error) {
        console.error("Error fetching player with room ID:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
