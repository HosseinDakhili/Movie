import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/UserMd.js";
import bcrypt from "bcryptjs";
import Booking from "../Models/BookingMd.js";

import Movie from "../Models/MovieMd.js";
import mongoose from "mongoose";


export const getAllUser = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req?.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();

  return res.status(200).json({
    success: true,
    message: "کاربران با موفقیت دریافت شدند",
    ...result,
  });
});

export const getOneUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const filters = req?.role === "admin" ? { _id: id } : { _id: req.userId };

  const features = new ApiFeatures(User, req?.query, req.role)
    .addManualFilters(filters)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();

  return res.status(200).json({
    success: true,
    message: "اطلاعات کاربر با موفقیت دریافت شد",
    ...result,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  if (req.role !== "admin" && req.userId !== req.params.id) {
    return next(new HandleERROR("شما مجاز به ویرایش این کاربر نیستید", 403));
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new HandleERROR("کاربر مورد نظر یافت نشد", 404));
  }

  user.username = req?.body?.username || user.username;
  user.password = req?.body?.password
    ? bcrypt.hashSync(req.body.password, 12)
    : user.password;
  user.email = req?.body?.email || user.email;

  if (req?.body?.role && req?.role === "admin") {
    user.role = req.body.role;
  }

  const newUser = await user.save();

  return res.status(200).json({
    success: true,
    message: "اطلاعات کاربر با موفقیت بروزرسانی شد",
    data: newUser,
  });
});

export const getUserBookings = catchAsync(async (req, res, next) => {
  const id = req.userId;

  const bookings = await Booking.find({ user: id })
    .populate({
      path: "show",
      populate: { path: "movie" },
    })
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "",
    bookings,
  });
});

export const updateFavorite = catchAsync(async (req, res, next) => {
  const id = req?.userId;
  const { movieId } = req.body;
    if (!movieId) return next(new HandleERROR("آیدی فیلم الزامی است", 400));
  const user = await User.findById(id);
  if (!user) return next(new HandleERROR("کاربر یافت نشد", 400));
  console.log(movieId)


 

  if (!user.favorites.includes(movieId)) {
    user.favorites.push(movieId);
  } else {
    user.favorites = user.favorites.filter(f => f!= movieId);
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: "علاقه‌مندی‌ها بروزرسانی شد",
    favorites: user.favorites,
  });
});

export const getFavorites = catchAsync(async (req, res, next) => {
  const user = await User.findById(req?.userId);
  const favorites = await user.favorites;
  const movie = await Movie.find({ _id: { $in: favorites } });

  res.status(200).json({
    success: true,
    message: "",
    movie,
  });
});
