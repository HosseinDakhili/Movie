import { ArrowRight, PlayCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "../../../components/BlurCircle";
import { dummyShowsData, dummyTrailers } from "../../../assets/assets";
import MovieCard from "./MovieCard";
import { useState } from "react";

export default function FeaturedSection() {
  const navigate = useNavigate();
  const [currentTrailer,setCurrentTrailer] = useState(dummyTrailers[0])
  return (
    <div dir="rtl" className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" left="-80px " />

        <p className="text-gray-300 font-medium text-lg">در حال پخش</p>

        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
        >
          مشاهده همه
          <ArrowRight className="group-hover:translate-x-0.5 transition w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap max-sm:justify-center gap-8 mt-8">
        {dummyShowsData.slice(0, 4).map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          نمایش بیشتر
        </button>
      </div>

      
    </div>
  );
}
