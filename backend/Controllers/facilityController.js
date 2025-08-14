// Brings in the Facility model (a Mongoose model) so you can query and modify the MongoDB facilities collection
import Facility from "../Models/Facility.js";

// Creates a new facility using the request body
export const createFacility = async (req, res) => {
  const facility = await Facility.create(req.body); // Inserts a new document in MongoDB
  res.status(201).json(facility); // Responds with status 201 created and the created facility object
};

// Fetches all facilities from the database. 
export const getFacilities = async (req, res) => {
  const facilities = await Facility.find(); // returns an array of all facility documents
  res.json(facilities); // Responda with JSON list of facilities
};

// Retrieves a single facility by its MongoDB _id.
export const getFacilityById = async (req, res) => {
  const facility = await Facility.findById(req.params.id); // req.params.id gets the facility ID from the URL
  if (!facility) return res.status(404).json({ error: "Facility not found" });  // If no facility exists with that ID → returns a 404 error
  res.json(facility);  // Otherwise, responds with the facility object
};

// Updates an existing facility from req.body.
export const updateFacility = async (req, res) => {
  const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true }); //  { new: true } ensures the updated document is returned.
  if (!facility) return res.status(404).json({ error: "Facility not found" }); // If not found → returns 404 error
  res.json(facility); // Otherwise → respond with the updated facility
};

// Deletes a facility by ID. 
export const deleteFacility = async (req, res) => {
  const facility = await Facility.findByIdAndDelete(req.params.id);
  if (!facility) return res.status(404).json({ error: "Facility not found" }); // If facility does not exist → returns 404
  res.json({ message: "Facility deleted" }); // If deleted → responds with a success message
};
