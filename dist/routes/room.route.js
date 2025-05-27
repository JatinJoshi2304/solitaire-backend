import express from "express";
import { createRoom } from "../controllers/room.controller";
const router = express.Router();
router.post("/", createRoom);
// router.post("/:roomId/join", joinRoom);
// router.get("/:roomId", getRoomWithPlayers);
export default router;
