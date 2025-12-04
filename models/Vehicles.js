import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  driver: { type: String, required: true },
  status: { type: String, required: true },
  speed: { type: Number, default: 0 },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
  },
  { timestamps: true }
);

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
