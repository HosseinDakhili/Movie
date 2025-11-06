import express from "express";
import {
    changePassword,
  forgetPassword,
  login,
  register,
  resetPassword,
} from "../Controllers/AuthCn.js";

const authRouter = express.Router();
authRouter.route("/login").post(login);
authRouter.route("/register").post(register);
authRouter.route("/change-pass").post(changePassword);
authRouter.route("/forget-pass").post(forgetPassword);
authRouter.route("/reset-pass").post(resetPassword);

export default authRouter;
