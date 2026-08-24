import React from "react";

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-end z-[9999] h-auto ">
      <nav style={{ padding: "40px" }} className="">
        <a
          target="_blank"
          href="https://portfolio-ashen-sigma-82.vercel.app/"
          className="text-white  font-medium"
        >
          Кто разработал?
        </a>
      </nav>
    </header>
  );
}

export default Header;
