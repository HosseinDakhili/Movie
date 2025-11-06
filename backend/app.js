import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import { catchError, HandleERROR } from "vanta-api";
import showRouterTmdb from "./Routes/Show_tmdb.js";
// import showRouter from "./Routes/Show.js";
// import movieRouter from "./Routes/Movie.js";
import bookingRouter from "./Routes/Booking.js";
import adminRouter from "./Routes/Admin.js";
import exportValidation from "./Middlewares/ExportValidation.js";
import authRouter from "./Routes/Auth.js";
// import { clerkMiddleware } from '@clerk/express'

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// app.use(clerkMiddleware())
// app.use('/uploads',express.static("Public/Uploads"));
// app.use(exportValidation);
app.use(exportValidation);
app.use("/api/auth", authRouter);
app.use("/api/showtmdb", showRouterTmdb);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);

app.use((req, res, next) => {
  return next(new HandleERROR("Not Found", 404));
});
app.use(catchError);
export default app;
