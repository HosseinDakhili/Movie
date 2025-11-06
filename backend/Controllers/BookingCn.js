import { catchAsync, HandleERROR } from "vanta-api";
import Show from "../Models/ShowMd.js";
import Booking from "../Models/BookingMd.js";

const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;
    const occupiedSeats = showData.occupiedSeats;
    const isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]);
    return !isAnySeatTaken;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const createBooking = catchAsync(async (req, res, next) => {
  const  id = req.userId; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const { showId, selectedSeats } = req.body;
  const { origin } = req.headers;

  const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
  if (!isAvailable) return next(new HandleERROR("صندلی‌های انتخابی قبلاً رزرو شده‌اند", 400));

  const showData = await Show.findById(showId).populate("movie");
  if (!showData) {
    return next(new HandleERROR("نمایش مورد نظر یافت نشد", 404));
  }

  const booking = await Booking.create({
    user: id,
    show: showId,
    amount: showData.showPrice * selectedSeats.length,
    bookedSeats: selectedSeats,
  });

  selectedSeats.map((seat) => {
    showData.occupiedSeats[seat] = id;
  });
  showData.markModified("occupiedSeats");
  await showData.save();

  res.status(200).json({
    success: true,
    booking,
    message: "رزرو با موفقیت انجام شد",
  });
});

export const getOccupiedSeats = catchAsync(async (req, res, next) => {
  const { showId } = req.params;
  const showData = await Show.findById(showId);
  const occupiedSeats = Object.keys(showData.occupiedSeats);

  res.status(200).json({
    success: true,
    occupiedSeats,
    message: "صندلی‌های رزرو شده دریافت شدند",
  });
});
