
import Joi from "joi";

// REGISTER Validation
export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).required(),
  role: Joi.string().valid("admin", "user").default("user")
});

// LOGIN Validation
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).required()});

//Rooms validation schema
export const roomSchema = Joi.object({
  id: Joi.number().required(),
  type: Joi.string().valid("Deluxe", "Suite", "Standard","Superior Room",
    "Junior Suite","Accessible Room","Presidential Suite","Executive Room","Connecting Rooms","Loft Room").required(),
  status: Joi.string().valid("Available", "Occupied", "Cleaning").required()
});


//Vehicals validation schema

export const vehicleSchema = Joi.object({
  id: Joi.string().required(),
  driver: Joi.string().required(),
  status: Joi.string().valid("Running", "Idle", "Stopped").required(),
  speed: Joi.number().min(0).required(),
  lat: Joi.number().required(),
  lng: Joi.number().required()
});



