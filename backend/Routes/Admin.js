import express from "express";
import {
  getAllBookings,
  getAllShows,
  getDashboardData,
} from "../Controllers/AdminCn.js";
import isAdmin from "../Middlewares/IsAdmin.js";
const adminRouter = express.Router();
adminRouter.route("/dashboard").get(isAdmin,getDashboardData);
adminRouter.route("/all-shows").get(isAdmin,getAllShows);
adminRouter.route("/all-bookings").get(isAdmin,getAllBookings);

export default adminRouter