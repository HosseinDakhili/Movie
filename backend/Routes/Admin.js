import express from "express";
import {
  getAllBookings,
  getAllShows,
  getDashboardData,
} from "../Controllers/AdminCn.js";

const adminRouter = express.Router();
adminRouter.route("/dashboard").get(getDashboardData);
adminRouter.route("/all-shows").get(getAllShows);
adminRouter.route("/all-bookings").get(getAllBookings);

export default adminRouter