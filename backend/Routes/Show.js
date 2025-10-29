import express from "express";
import { getNowPlayingMovie } from "../Controllers/ShowCn.js";

const showRouter = express.Router();
showRouter.get("/now-playing", getNowPlayingMovie);

export default showRouter;
