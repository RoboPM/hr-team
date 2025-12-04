import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./db.js";
import router from "./routes/apiRoutes.js";
import initSocket from "./socket/index.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api", router);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // replace with your frontend URL
    methods: ["GET", "POST"]
  }
});

// Initialize socket events
initSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
