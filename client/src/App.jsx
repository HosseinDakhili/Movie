import React from "react";
import Navbar from "./components/Navbar.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import MovieDetails from "./pages/MovieDatails/MovieDetails";
import SeatLayout from "./pages/SeatLayout/SeatLayout";
import { MyBookings } from "./pages/MyBookings/MyBookings";
import Favorite from "./pages/Favorite/Favorite";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const App = () => {
  const isAdmin = useLocation().pathname.startsWith("/admin");
  return (
    <>
    <Toaster />
      <main dir="rtl">
        {!isAdmin && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/movies/:id/:date" element={<SeatLayout />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
        {!isAdmin && <Footer />}
      </main>
    </>
  );
};

export default App;
