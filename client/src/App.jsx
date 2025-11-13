import React, { useContext } from "react";
import Navbar from "./components/Navbar.jsx";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import MovieDetails from "./pages/MovieDatails/MovieDetails";
import SeatLayout from "./pages/SeatLayout/SeatLayout";
import { MyBookings } from "./pages/MyBookings/MyBookings";
import Favorite from "./pages/Favorite/Favorite";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { AuthContext } from "./context/AuthContext.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Login from "./pages/Auth/Login/Login.jsx";
import Register from "./pages/Auth/Register/Registe.jsx";

const App = () => {
  const { token } = useContext(AuthContext);
  const isAdmin = useLocation().pathname.startsWith("/admin");
  const isLogin = useLocation().pathname.startsWith("/login");
  const isRegister = useLocation().pathname.startsWith("/register");
  return (
    <>
      <Toaster />
      <main dir="rtl">
        {(!isAdmin && !isLogin && !isRegister) && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/movies/:id/:date" element={<SeatLayout />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {(!isAdmin && !isLogin && !isRegister) && <Footer />}
      </main>
    </>
  );
};

export default App;
