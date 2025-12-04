import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, enum: ["Deluxe", "Suite", "Standard","Superior Room","Junior Suite",
      "Accessible Room","Presidential Suite","Executive Room","Connecting Rooms","Loft Room"], required: true },
    status: { type: String, enum: ["Available", "Occupied", "Cleaning",], required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);

