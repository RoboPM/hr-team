import Room from "../models/Rooms.js";
import { Vehicle } from "../models/Vehicles.js";
import { roomSchema } from "../middleware/validation.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validate
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check existing user
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },     
      process.env.JWT_SECRET,                  
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Create Room 
export const createRoom = async (req, res) => {
  try {
    // Validate request body
    const { error } = roomSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Check if room already exists
    const exists = await Room.findOne({ id: req.body.id });
    if (exists) return res.status(400).json({ message: "Room with this ID already exists" });

    // Save to MongoDB
    const room = await Room.create(req.body);
    res.status(201).json({ message: "Room created successfully", room });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ rooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET room by ID
export const getRoomById = async (req, res) => {
  try {
    const roomId = req.headers.id
    // Find room in MongoDB
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ room });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// update room by id
export const updateRoomById = async (req, res) => {
  try {
    const roomId = Number(req.headers.id);

    // Validate numeric ID
    if (isNaN(roomId)) {
      return res.status(400).json({ message: "Invalid ID. ID must be a number." });
    }

    // Optional: validate request body with Joi if you want
    // const { error } = roomSchema.validate(req.body);
    // if (error) return res.status(400).json({ message: error.details[0].message });

    // Update room
    const updatedRoom = await Room.findOneAndUpdate(
      { id: roomId },       
      req.body,             
      { new: true }   
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({
      message: "Room updated successfully",
      room: updatedRoom
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Vehicales 
export const createVehicle = async (req, res) => {
  try {
    const { id, driver, status, speed, lat, lng } = req.body;
    // Check if vehicle already exists
    const exists = await Vehicle.findOne({ id });   
    if (exists) {
      return res.status(400).json({ message: "Vehicle ID already exists" });
    }
    // Create vehicle
    const newVehicle = await Vehicle.create({
      id,
      driver,
      status,
      speed,
      lat,
      lng
    });

    res.status(201).json({
      message: "Vehicle created successfully",
      vehicle: newVehicle
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all vehicles
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

