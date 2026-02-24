import React from "react";
// import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// import Button from "../button/Button";

const MobileHeader = () => {
  // const [menuOpen, setMenuOpen] = useState(false);

  // const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md fixed w-full z-50 md:hidden">
      <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
         <Link href="/">
          {" "}
          <Image src="/layouts/logo.svg" width={182} height={36} alt="logo" />
        </Link>
        {/* Hamburger */}
        {/* <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button> */}
      </div>

      {/* <div
        className={`md:hidden transition-all duration-500 ease-in-out ${
            menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
      >
        <nav className="flex flex-col px-4 pb-4 text-gray-700 font-medium">
          <Link className="py-3.5 text-base font-medium border-b border-b-[#F1F1F1]" href="#">
            Home
          </Link>
          <Link className="py-3.5 text-base font-medium border-b border-b-[#F1F1F1]" href="#">
            About
          </Link>
          <Link className="py-3.5 text-base font-medium border-b border-b-[#F1F1F1]" href="#">
            Services
          </Link>
          <Link className="py-3.5 text-base font-medium border-b border-b-[#F1F1F1]" href="#">
            Contact
          </Link>
        </nav>
        <div className="p-4">
            <Button text="Open account" />
        </div>
      </div> */}
    </header>
  );
};

export default MobileHeader;
