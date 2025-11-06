import express from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import { getAllUser, getOneUser, updateUser } from "../Controllers/UserCn.js";
import isLogin from "../Middlewares/IsLogin.js";

const userRouter = express.Router();
userRouter.route("/").get(isAdmin, getAllUser);
userRouter.route("/:id").get(isLogin, getOneUser).patch(isLogin, updateUser);

export default userRouter