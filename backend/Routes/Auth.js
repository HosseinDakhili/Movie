import express from "express";
import { forgetPassword, login, register, resetPassword } from "../Controllers/AuthCn";

const authRouter = express.Router()
authRouter.route('/login').post(login)
authRouter.route('/register').post(register)
authRouter.route('/forget-pass').post(forgetPassword)
authRouter.route('/reset-pass').post(resetPassword)

export default authRouter;