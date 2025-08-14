// Mongoose is an ODM(Object Data Modelling) library for MongoDB. It lets you define schemas and interact with the database using JavaScript obejcts instead of raw queries
import mongoose from "mongoose";

// This schema describes what fields a facility will have:
// name, String, required
// location, String, required
// description, String, optional
// pricePerHour, Number, required, cost per hour to book this facility
// isAvailable, Boolean, default true, indicates if the facility can be booked
// The { timestamps: true } option automatically adds: 
// createdAt, when the document was created
// updatedAt, when the document was last modified
const facilitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: String,
    pricePerHour: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// This compiles the schema into a model named "Facility". When used, it will interact with the facilities collection in MongoDB. 
export default mongoose.model("Facility", facilitySchema);


























