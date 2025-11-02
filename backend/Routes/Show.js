import express from "express";
import { addShow, getNowPlayingMovie } from "../Controllers/ShowCn.js";
import { isAdmin } from "../Middlewares/IsAdmin.js";

const showRouter = express.Router();
showRouter
  .get("/now-playing",isAdmin,getNowPlayingMovie)
  .post("/add", isAdmin, addShow);

export default showRouter;
