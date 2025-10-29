import express from "express";
import { addShow, getNowPlayingMovie } from "../Controllers/ShowCn.js";

const showRouter = express.Router();
showRouter.get("/now-playing", getNowPlayingMovie).post('/add',addShow);

export default showRouter;
