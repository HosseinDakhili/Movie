import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "نام کاربری الزامی است"],
  },
  email: {
    type: String,
    required: [true, "ایمیل الزامی است"],
    unique: [true, "ایمیل قبلا استفاده شده است"],
  },
  password: {
    type: String,
    required: [true, "رمز عبور الزامی است"],
  },
  image: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    // type: [String],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
