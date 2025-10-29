import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان فیلم الزامی است"],
    },
    overview: {
      type: String,
      required: [true, "خلاصه فیلم الزامی است"],
    },
    poster_path: {
      type: String,
      required: [true, "مسیر پوستر الزامی است"],
    },
    backdrop_path: {
      type: String,
      required: [true, "مسیر تصویر پس‌زمینه الزامی است"],
    },
    release_date: {
      type: String,
      required: [true, "تاریخ انتشار الزامی است"],
    },
    original_language: {
      type: String,
    },
    tagline: {
      type: String,
    },
    genres: {
      type: Array,
      required: [true, "ژانرها الزامی هستند"],
    },
    casts: {
      type: Array,
      required: [true, "بازیگران الزامی هستند"],
    },
    vote_average: {
      type: Number,
      required: [true, "میانگین رای الزامی است"],
    },
    runtime: {
      type: Date,
      required: [true, "مدت زمان فیلم الزامی است"],
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
