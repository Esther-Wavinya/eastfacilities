import Booking from "../Models/Booking.js";

export const createBooking = async (req, res) => {
  const booking = await Booking.create({ ...req.body, user: req.user.id });
  res.status(201).json(booking);
};

export const getBookings = async (req, res) => {
  const bookings = await Booking.find().populate("user facility");
  res.json(bookings);
};

export const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("user facility");
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  res.json(booking);
};

export const updateBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  res.json(booking);
};

export const deleteBooking = async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  res.json({ message: "Booking deleted" });
};
