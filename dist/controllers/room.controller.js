import { Room } from "../models/room.model";
import { Player } from "../models/player.model";
export const createRoom = async (req, res) => {
    try {
        const { serverName, code } = req.body;
        const isPasswordProtected = !!code;
        const room = new Room({
            serverName,
            code,
            isPasswordProtected,
        });
        await room.save();
        res.status(201).json(room);
    }
    catch (error) {
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
        // Create a player in this room
        const player = new Player({
            name,
            roomId,
            score: 0,
            isReady: false,
        });
        await player.save();
        res.status(201).json(player);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to join room" });
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
