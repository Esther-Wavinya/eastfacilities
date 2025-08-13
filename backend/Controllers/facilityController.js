import Facility from "../Models/Facility.js";

export const createFacility = async (req, res) => {
  const facility = await Facility.create(req.body);
  res.status(201).json(facility);
};

export const getFacilities = async (req, res) => {
  const facilities = await Facility.find();
  res.json(facilities);
};

export const getFacilityById = async (req, res) => {
  const facility = await Facility.findById(req.params.id);
  if (!facility) return res.status(404).json({ error: "Facility not found" });
  res.json(facility);
};

export const updateFacility = async (req, res) => {
  const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!facility) return res.status(404).json({ error: "Facility not found" });
  res.json(facility);
};

export const deleteFacility = async (req, res) => {
  const facility = await Facility.findByIdAndDelete(req.params.id);
  if (!facility) return res.status(404).json({ error: "Facility not found" });
  res.json({ message: "Facility deleted" });
};
