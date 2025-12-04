// export default router;
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { registerUser,loginUser,createRoom, getAllRooms, getRoomById, updateRoomById, createVehicle, getVehicles  } from "../controllers/taskController.js"; 

const router = express.Router();
// Resgister and login routes can be added here in future
router.post("/register",registerUser);
router.post("/login",loginUser)

// POST /api/rooms
router.post("/rooms", authMiddleware,createRoom);
router.get("/get-all-rooms",authMiddleware, getAllRooms);
router.get("/get-roombyid", authMiddleware,getRoomById);
router.put("/update-room-by-id",authMiddleware,updateRoomById);

//vehicles Create
router.post("/add-vehicles", authMiddleware,createVehicle )
router.get("/get-all-vehicles",authMiddleware, getVehicles)

export default router;


