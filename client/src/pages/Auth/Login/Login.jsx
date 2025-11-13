import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
 return (
  <div className="relative min-h-screen flex items-center justify-center bg-[url('/bg-cinema.jpg')] bg-cover bg-center bg-no-repeat">
    {/* پس‌زمینه تیره */}
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

    {/* فرم */}
    <form
      //! onSubmit={handleSubmit}
      className="relative z-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[35rem] bg-gradient-to-b from-zinc-900/95 to-black/95 p-8 sm:p-10 md:p-12 rounded-3xl shadow-[0_0_30px_rgba(255,0,80,0.25)] flex flex-col gap-6 sm:gap-8 text-white border border-zinc-800/60"
    >
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)] leading-snug">
        عضویت در سینماکلاب
      </h3>

      <input
        type="text"
        //! onChange={handleChange}
        name="username"
        placeholder="نام کاربری"
        className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 rounded-xl border border-zinc-700 bg-zinc-800/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 text-gray-100 placeholder-gray-400 transition text-base sm:text-lg"
      />

      <input
        type="email"
        //! onChange={handleChange}
        name="email"
        placeholder="ایمیل"
        className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 rounded-xl border border-zinc-700 bg-zinc-800/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 text-gray-100 placeholder-gray-400 transition text-base sm:text-lg"
      />

      <input
        type="password"
        //! onChange={handleChange}
        name="password"
        placeholder="رمز عبور"
        className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 rounded-xl border border-zinc-700 bg-zinc-800/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 text-gray-100 placeholder-gray-400 transition text-base sm:text-lg"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-500 hover:to-pink-400 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-[0_0_25px_rgba(255,0,90,0.3)] transition-all duration-300"
      >
        ثبت‌نام
      </button>

      <button
        type="button"
         onClick={()=>navigate('/register')}
        className="text-center text-red-400 hover:text-red-300 underline font-medium text-base sm:text-lg transition"
      >
        قبلاً حساب دارید؟ وارد شوید
      </button>
    </form>
  </div>
);



}
