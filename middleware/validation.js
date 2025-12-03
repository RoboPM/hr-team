
import Joi from "joi";
//Rooms validation schema
export const roomSchema = Joi.object({
  id: Joi.number().required(),
  type: Joi.string().valid("Deluxe", "Suite", "Standard").required(),
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




