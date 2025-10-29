import { catchAsync, HandleERROR } from "vanta-api";

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
      new HandleERROR(`TMDB api Error:${response.status}`, response.status)
    );
  }

  const data = await response.json();
  if (!data.results?.length) {
    return next(new HandleERROR("", 404));
  }

  res.status(200).json({
    success: true,
    data: data.results,
    message: "",
  });
});
