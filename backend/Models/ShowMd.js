import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "فیلم الزامی است"],
      ref: "Movie",
    },
    showDateTime: {
      type: Date,
      required: [true, "تاریخ و ساعت نمایش الزامی است"],
    },
    showPrice: {
      type: Number,
      required: [true, "قیمت نمایش الزامی است"],
    },
    occupiesSeats: {
      type: Object,
      default: {},
    },
  },
  { minimize: false, timestamps: true }
);

const Show = mongoose.model("Show", showSchema);
export default Show;
