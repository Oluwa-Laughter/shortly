import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleMenuClick = () => {
    setNavOpen(!navOpen);
  };

  const handleNavClick = () => {
    setNavOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="h-24 w-full sticky top-0 md:p-8 px-2 py-8">
      <div className="max-w-container flex items-center justify-between md:px-0 px-4 gap-6 mx-auto">
        <img src="./images/logo.svg" alt="shortly" className="" />

        <nav
          className={`${
            navOpen
              ? "absolute top-24 bg-dark rounded-lg p-6"
              : "hidden md:flex"
          } justify-between w-[90%] items-center`}
          onClick={handleNavClick}
        >
          <ul className="flex flex-col md:flex-row md:gap-4 text-center">
            <li className="text-white md:text-lightGray text-sm hover:text-veryDarkViolet font-medium py-3 md:py-0">
              <a className="cursor-pointer">Features</a>
            </li>
            <li className="text-white md:text-lightGray text-sm hover:text-veryDarkViolet font-medium py-3 md:py-0">
              <a className="cursor-pointer">Pricing</a>
            </li>
            <li className="text-white md:text-lightGray text-sm hover:text-veryDarkViolet font-medium py-3 md:py-0">
              <a className="cursor-pointer">Resources</a>
            </li>
          </ul>

          <div className="flex flex-col md:flex-row md:gap-4 border-t border-gray md:border-none pt-6 md:pt-0">
            <button className="text-white md:text-lightGray hover:text-veryDarkViolet text-sm font-medium py-3 md:py-0">
              Login
            </button>
            <button className="bg-primary hover:bg-opacity-80 rounded-full py-3 px-6 font-medium text-white text-sm">
              Sign Up
            </button>
          </div>
        </nav>

        <button className="md:hidden text-2xl" onClick={handleMenuClick}>
          {navOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Header;
