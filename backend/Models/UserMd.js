import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "نام کاربری الزامی است"],
  },
  email: {
    type: String,
    required: [true, "ایمیل الزامی است"],
  },
  password: {
    type: String,
    required: [true, "رمز عبور الزامی است"],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin", "superAdmin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
