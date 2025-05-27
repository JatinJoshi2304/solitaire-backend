import { Room } from "../models/roomModel.js";
import { Player } from "../models/playerModel.js";
export const createRoom = async (req, res) => {
    try {
        const { serverName, code } = req.body;
        const isPasswordProtected = !!code;
        // console.log("isPasswordProtected:", isPasswordProtected);
        const room = new Room({
            serverName,
            code,
            isPasswordProtected,
        });
        await room.save();
        res.status(201).json(room);
    }
    catch (error) {
        console.error("Room creation error:", error);
        res.status(500).json({ message: "Failed to create room" });
    }
};
export const joinRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { name, code } = req.body;
        const room = await Room.findById(roomId);
        if (!room)
            return res.status(404).json({ message: "Room not found" });
        if (room.isPasswordProtected && room.code !== code) {
            return res.status(403).json({ message: "Invalid room code" });
        }
        console.log("First check passed");
        const player = new Player({
            name,
            roomId,
            score: 0,
            isReady: false,
        });
        console.log("second check passed");
        await player.save();
        console.log("third check passed");
        res.status(201).json(room);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to join room" });
    }
};
export const getRooms = async (req, res) => {
    try {
        const room = await Room.find();
        res.json({ room });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch room" });
    }
};
export const getRoomWithPlayers = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findById(roomId);
        if (!room)
            return res.status(404).json({ message: "Room not found" });
        const players = await Player.find({ roomId });
        res.json({ room, players });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch room" });
    }
};
