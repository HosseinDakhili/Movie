import { catchAsync, HandleERROR } from "vanta-api";
import Movie from "../Models/MovieMd.js";
import Show from "../Models/ShowMd.js";

export const getNowPlayingMovie = catchAsync(async (req, res, next) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing",
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    }
  );
  if (!response?.ok) {
    return next(
      new HandleERROR(`خطا در TMDB API: ${response.status}`, response.status)
    );
  }

  const data = await response.json();
  if (!data.results?.length) {
    return next(new HandleERROR("فیلمی یافت نشد", 404));
  }

  res.status(200).json({
    success: true,
    data: data.results,
    message: "عملیات با موفقیت انجام شد",
  });
});
// ------------------

export const addShow = catchAsync(async (req, res, next) => {
  const { movieId, showsInput, showPrice } = req.body;

  let movie = await Movie.findOne({tmdbId:movieId});
  if (!movie) {
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
      }
    );
    if (!movieRes.ok) {
      return next(new HandleERROR("خطا در دریافت اطلاعات فیلم", movieRes.status));
    }
    const movieData = await movieRes.json();
    const creditsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
      }
    );
    if (!creditsRes.ok) {
      return next(new HandleERROR("خطا در دریافت اطلاعات بازیگران", creditsRes.status));
    }
    const creditsData = await creditsRes.json();

    movie = await Movie.create({
      tmdbId: movieId,
      title: movieData.title,
      overview: movieData.overview,
      poster_path: movieData.poster_path,
      backdrop_path: movieData.backdrop_path,
      genres: movieData.genres,
      casts: movieData.casts,
      release_date: movieData.release_date,
      original_language: movieData.original_language,
      tagline: movieData.tagline || "",
      runtime:movieData.runtime,
      vote_average:movieData.vote_average
    });
  }

  const showsToCreate = [];
  showsInput.forEach((show) => {
    const showDate = show.date;
    show.time.forEach((time) => {
      const dateTimeString = `${showDate}T${time}`;
      showsToCreate.push({
        movie: movie._id,
        showDateTime: new Date(dateTimeString),
        showPrice,
        occupiedSeats: {},
      });
    });
  });
  if (showsToCreate.length > 0) {
    await Show.insertMany(showsToCreate);
  }
  res.status(200).json({
    success: true,
    message: "نمایش‌ها با موفقیت اضافه شدند",
  });
});
