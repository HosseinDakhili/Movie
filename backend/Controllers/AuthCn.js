import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/UserMd.js";
import crypto from "crypto";
import sendResetEmail from "../Utils/SendResetEmail.js";

export const login = catchAsync(async (req, res, next) => {
  const { username = null, password = null } = req?.body;

  if (!username || !password) {
    return next(new HandleERROR("نام کاربری و رمز عبور الزامی است", 400));
  }

  const user = await User.findOne({ username });
  if (!user) {
    return next(new HandleERROR("کاربری با این نام وجود ندارد", 400));
  }

  const confirmPass = await bcryptjs.compare(password, user.password);
  if (!confirmPass) {
    return next(new HandleERROR("رمز عبور اشتباه است", 400));
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  return res.status(200).json({
    success: true,
    message: "ورود با موفقیت انجام شد",
    data: {
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    },
  });
});

// ------------------------- ثبت‌نام -------------------------
export const register = catchAsync(async (req, res, next) => {
  const { username = null, password = null } = req.body;

  if (!username || !password) {
    return next(new HandleERROR("نام کاربری و رمز عبور الزامی است", 400));
  }

  const passReg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
  if (!passReg.test(password)) {
    return next(
      new HandleERROR(
        "رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک و عدد باشد",
        400
      )
    );
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return next(new HandleERROR("این نام کاربری قبلاً استفاده شده است", 400));
  }

  const hashPassword = bcryptjs.hashSync(password, 12);
  await User.create({ username, password: hashPassword });

  return res.status(200).json({
    success: true,
    message: "ثبت‌نام با موفقیت انجام شد",
  });
});

export const changePassword = catchAsync(async (req, res, next) => {
  const id = req.userId;
  const { oldPass = null, newPass = null } = req.body;

  if (!oldPass || !newPass) {
    return next(new HandleERROR("رمز عبور قبلی و جدید الزامی است", 400));
  }

  const user = await User.findById(id);
  if (!user) {
    return next(new HandleERROR("کاربر یافت نشد", 404));
  }

  const checkOldPass = await bcryptjs.compare(oldPass, user.password);
  if (!checkOldPass) {
    return next(new HandleERROR("رمز عبور قبلی اشتباه است", 400));
  }

  const passReg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
  if (!passReg.test(newPass)) {
    return next(
      new HandleERROR(
        "رمز عبور جدید باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک و عدد باشد",
        400
      )
    );
  }

  user.password = bcryptjs.hashSync(newPass, 12);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "رمز عبور با موفقیت تغییر کرد",
  });
});

// ------------------------- فراموشی رمز عبور -------------------------
export const forgetPassword = catchAsync(async (req, res, next) => {
  const { email = null } = req?.body;
  if (!email) {
    return next(new HandleERROR("ایمیل الزامی است", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleERROR("کاربری با این ایمیل یافت نشد", 404));
  }

  const resetToken = crypto.randomInt(100000, 999999).toString();
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // ده دقیقه
  await user.save();

  await sendResetEmail(email, resetToken);

  return res.status(200).json({
    success: true,
    message: "کد بازیابی رمز عبور به ایمیل شما ارسال شد",
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const { email = null, token = null, newPass = null } = req?.body;

  if (!email || !token || !newPass) {
    return next(new HandleERROR("تمام فیلدها الزامی هستند", 400));
  }

  const user = await User.findOne({ email, resetPasswordToken: token });
  if (!user) {
    return next(new HandleERROR("اطلاعات بازیابی معتبر نیست", 400));
  }

  if (Date.now() > user.resetPasswordExpires) {
    return next(new HandleERROR("کد بازیابی منقضی شده است", 400));
  }

  const passReg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
  if (!passReg.test(newPass)) {
    return next(
      new HandleERROR(
        "رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک و عدد باشد",
        400
      )
    );
  }

  user.password = bcryptjs.hashSync(newPass, 12);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "رمز عبور با موفقیت تغییر کرد",
  });
});
