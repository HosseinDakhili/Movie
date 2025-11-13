import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon,UserIcon, SearchIcon, XIcon } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

//todo line 83

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  // console.log(token);

  return (
    <nav
      dir="rtl"
      className="fixed top-0 right-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-inherit backdrop-blur"
    >
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="لوگو" className="w-36 h-auto" />
      </Link>

      <div
        className={`max-md:absolute max-md:top-0 max-md:right-0 z-40 flex flex-col md:flex-row items-center max-md:justify-center gap-8 px-8 py-3 max-md:h-screen md:rounded-full bg-black/90 md:bg-white/10 md:border border-gray-300/20 transition-all duration-300 ${
          isOpen ? "max-md:w-full" : "max-md:w-0 max-md:translate-x-[150px]"
        }`}
      >
        <XIcon
          className="md:hidden absolute top-6 left-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/"
        >
          خانه
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/movies"
        >
          فیلم‌ها
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/"
        >
          سینماها
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/"
        >
          اکران‌ها
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/favorite"
        >
          علاقه‌مندی‌ها
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer text-white" />
        
        {token ? (
          <UserIcon onClick={()=>navigate('/my-bookings')} className="cursor-pointer" />  /** handle classes and links */
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer text-white"
          >
            ورود
          </button>
        )}
      </div>

      <MenuIcon
        onClick={() => setIsOpen(!isOpen)}
        className="max-md:mr-4 md:hidden w-8 h-8 cursor-pointer text-white"
      />
    </nav>
  );
};

export default Navbar;
