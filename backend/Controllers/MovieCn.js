import { catchAsync } from "vanta-api";
import Movie from "../Models/MovieMd.js";

// export const createMovie = catchAsync(async (req,res,next) => {
//     console.log("createMovie endpoint hit", req.body)
//     const movie = await Movie.create(req.body)
//     return res.status(200).json({
//         success:true,
//         movie,
//         message:"Movie created"
//     })
// })
