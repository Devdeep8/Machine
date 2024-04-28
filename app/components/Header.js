"use client";

import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import UserDropdownMenu from "./userprofile";
const Header = () => {
  return (
    <header className="text-gray-600 body-font  ">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-royalblue mb-4 md:mb-0">
          <Square3Stack3DIcon className="w-10 h-10 text- p-2 text-white cursor-pointer bg-royalblue rounded-full"/>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        
          <span className="ml-3 text-xl cursor-pointer">Machine invoice</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a href="/dashboard" className="mr-5 hover:text-royalblue cursor-pointer hover:underline">First Link</a>
          <a href='/dashboard/total' className="mr-5  hover:text-royalblue cursor-pointer hover:underline">total Profit</a>
          <a className="mr-5 hover:text-royalblue cursor-pointer hover:underline"></a>
          <a className="mr-5 hover:text-royalblue cursor-pointer hover:underline"></a>

        </nav>
        <UserDropdownMenu />
      </div>
    </header>
  );
};

export default Header;
