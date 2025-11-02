import ApiFeatures, { catchAsync } from "vanta-api";
import Booking from "../Models/BookingMd.js";
import Show from "../Models/ShowMd.js";
import User from "../Models/UserMd.js";

export const getDashboardData = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ isPaid: true });
  const activeShows = await Show.find({
    showDateTime: { $gte: new Date() },
  }).populate("movie");

  const totalUser = await User.countDocuments();

  const dashboardData = {
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
    activeShows,
    totalUser,
  };

  res.status(200).json({
    success: true,
    dashboardData,
    message: "",
  });
});

export const getAllShows = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Show, req.query, req.role)
    .addManualFilters({ showDateTime: { $gte: new Date() } })
    .filter()
    .sort({ showDateTime: 1 })
    .paginate()
    .populate("movie");
  const result = await features.execute();
  res.status(200).json({
    success: true,
    result,
    message: "",
  });
});
export const getAllBookings = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Booking, req.query, req.role)

    .filter()
    .sort({ createdAt: -1 })
    .paginate()
    .populate("user")
    .populate({
      path: "show",
      populate: { path: "movie" },
    });
  const result = await features.execute(); 
  res.status(200).json({
    success: true,
    result,
    message: "",
  });
});
