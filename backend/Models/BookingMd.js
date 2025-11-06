import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "شناسه کاربر الزامی است"],
      ref: "User",
    },
    show: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "نمایش الزامی است"],
      ref: "Show",
    },
    amount: {
      type: Number,
      required: [true, "مبلغ رزرو الزامی است"],
    },
    bookedSeats: {
      type: Array,
      required: [true, "صندلی‌های رزرو شده الزامی است"],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
