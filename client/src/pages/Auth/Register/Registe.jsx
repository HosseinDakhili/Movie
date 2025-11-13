import React from "react";
import useFormFields from "../../../utils/useFormFields";
import fetchData from "../../../utils/fetchDate";
import { useNavigate } from "react-router-dom";
import notify from "../../../utils/Notify";

export default function Register() {
  const navigate = useNavigate();
  const [fields, handleChange] = useFormFields({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchData("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    if (response?.success) {
      notify("success", "ثبت نام انجام شد");
      navigate("/login");
    } else {
      
      notify("error", response?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-black via-zinc-900 to-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900/90 backdrop-blur-lg p-8 sm:p-10 mt-20 rounded-3xl shadow-[0_0_25px_rgba(255,0,80,0.25)] flex flex-col gap-6 text-white border border-zinc-800"
      >
        <h3 className="text-2xl sm:text-3xl font-extrabold text-center text-primary drop-shadow-[0_0_6px_rgba(255,0,0,0.4)]">
          🎬 عضویت در دنیای سینما
        </h3>

        <input
          type="text"
          onChange={handleChange}
          name="username"
          placeholder="نام کاربری"
          className="w-full px-5 py-3 sm:py-4 rounded-xl border border-gray-700 bg-zinc-800/80 focus:border-primary focus:ring-2 focus:ring-primary/40 text-gray-200 placeholder-gray-400 transition text-base sm:text-lg"
        />

        

        <input
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="رمز عبور"
          className="w-full px-5 py-3 sm:py-4 rounded-xl border border-gray-700 bg-zinc-800/80 focus:border-primary focus:ring-2 focus:ring-primary/40 text-gray-200 placeholder-gray-400 transition text-base sm:text-lg"
        />

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dull text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg transition-all duration-300"
        >
          ثبت‌نام
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-center text-primary hover:text-primary-dull underline font-medium transition text-base sm:text-lg"
        >
          قبلاً عضو شدید؟ وارد شوید
        </button>
      </form>
    </div>
  );
}
