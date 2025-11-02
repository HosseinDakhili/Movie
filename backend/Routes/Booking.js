import express from "express";
import { createBooking, getOccupiedSeats } from "../Controllers/BookingCn.js";

const bookingRouter = express.Router()
bookingRouter.route('/create').post(createBooking)
bookingRouter.route('/seats/:showId').get(getOccupiedSeats)

export default bookingRouter;