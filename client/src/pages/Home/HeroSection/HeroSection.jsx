import { useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { ArrowLeft, ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
      <img
        src={assets.marvelLogo}
        alt="لوگو مارول"
        className="max-h-11 lg:h-11 mt-20"
      />

      <h1 className="text-5xl md:text-[70px] md:leading-20 font-semibold">
        نگهبانان <br /> کهکشان
      </h1>

      <div className="flex items-center gap-4 text-gray-300">
        <span>اکشن | ماجراجویی | علمی-تخیلی</span>
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4 h-4" /> ۲۰۱۸
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="w-4 h-4" /> ۲ ساعت و ۸ دقیقه
        </div>
      </div>

      <p className="max-w-md text-gray-300">
        نگهبانان کهکشان گروهی از قهرمانان غیرمعمول هستند که باید با تهدیدی که
        جهان را در خطر قرار داده مبارزه کنند. هرکدام توانایی‌ها و شخصیت خاص خود
        را دارند و با همکاری، دشمنان قدرتمند را شکست می‌دهند.
      </p>

      <button
        onClick={() => navigate("/movies")}
        className="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
      >
        مشاهده فیلم‌ها
        <ArrowLeft className="w-5 h-5" />
      </button>
    </div>
  );
}
