import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/UserMd.js";

export const login = catchAsync(async (req, res, next) => {
  const { username = null, password = null } = req?.body;
  if (!username || !password) {
    return next(new HandleERROR("", 400));
  }
  const user = await User.findOne({ username });
  if (!user) {
    return next(new HandleERROR("", 400));
  }
  const confirmPass = bcryptjs.compareSync(password, user.password);
  if (!confirmPass) {
    return next(new HandleERROR("", 400));
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  return res.status(200).json({
    success: true,
    message: "",
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

export const register = catchAsync(async (req, res, next) => {
  const { username = null, password = null } = req.body;
  if (!username || password) {
    return next(new HandleERROR("", 400));
  }
  const passReg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
  if (!passReg.test(password)) {
    return next(new HandleERROR("", 400));
  }
  const hashPassword = bcryptjs.hashSync(password, 12);
  await User.create({ username, password: hashPassword });

  return res.status(200).json({
    success: true,
    message: "",
  });
});

export const changePassword = catchAsync(async (req, res, next) => {
  const id = req.userId;
  const { oldPass = null, newPass = null } = req.body;
  if (!oldPass || !newPass) {
    return next(new HandleERROR("", 400));
  }

  const user = await User.findById(id);
  if (!user) {
    return next(new HandleERROR("", 400));
  }

  const checkOldPass = bcryptjs.compareSync(oldPass, user.password);
  if (!checkOldPass) {
    return next(new HandleERROR("", 400));
  }
  const passReg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
  if (!passReg.test(newPass)) {
    return next(new HandleERROR("", 400));
  }
  user.password = bcryptjs.hashSync(newPass, 12);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "",
  });
});

export const forgetPassword = catchAsync(async (req,res,next) => {
    
})