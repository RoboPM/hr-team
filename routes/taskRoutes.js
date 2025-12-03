// export default router;
import express from "express";
import { createRoom, getAllRooms, getRoomById, updateRoomById, createVehicle, getVehicles } from "../controllers/taskController.js"; 

const router = express.Router();

// POST /api/rooms
router.post("/rooms", createRoom);
router.get("/get-all-rooms", getAllRooms);
router.get("/get-roombyid", getRoomById);
router.patch("/update-room-by-id",updateRoomById);

//vehicles Create
router.post("/add-vehicles", createVehicle )
router.get("/get-all-vehicles", getVehicles)

export default router;

