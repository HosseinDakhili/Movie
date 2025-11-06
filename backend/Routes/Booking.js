import express from "express";
import { createBooking, getOccupiedSeats } from "../Controllers/BookingCn.js";
import isAdmin from "../Middlewares/IsAdmin.js";

const bookingRouter = express.Router()
bookingRouter.route('/create').post(isAdmin,createBooking)
bookingRouter.route('/seats/:showId').get(getOccupiedSeats)

export default bookingRouter;