import express from "express";
import { addShow, getNowPlayingMovie, getShow, getShows } from "../Controllers/ShowCn_tmdb.js";
import { isAdmin } from "../Middlewares/IsAdmin.js";

const showRouterTmdb = express.Router();
showRouterTmdb
  .get("/now-playing",getNowPlayingMovie)
  .post("/add",  addShow)
  .get('/all',getShows)
  .get('/:movieId',getShow)

export default showRouterTmdb;
