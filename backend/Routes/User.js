import express from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import {
  getAllUser,
  getFavorites,
  getOneUser,
  getUserBookings,
  updateFavorite,
  updateUser,
} from "../Controllers/UserCn.js";
import isLogin from "../Middlewares/IsLogin.js";

const userRouter = express.Router();
userRouter.route("/").get(isAdmin, getAllUser);
userRouter.route("/bookings").get(isLogin,getUserBookings);
userRouter.route("/favorites").get(isLogin,getFavorites);
userRouter.route("/update-favorites").post(isLogin,updateFavorite);
userRouter.route("/:id").get(isLogin, getOneUser).patch(isLogin, updateUser);

export default userRouter;
