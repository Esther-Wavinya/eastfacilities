import User from "../Models/User.js";
import Booking from "../Models/Booking.js";
import Payment from "../Models/Payment.js";

export const getDashboardStats = async (req, res) => {
  const usersCount = await User.countDocuments();
  const bookingsCount = await Booking.countDocuments();
  const totalRevenue = await Payment.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);

  res.json({
    users: usersCount,
    bookings: bookingsCount,
    revenue: totalRevenue[0]?.total || 0
  });
};
