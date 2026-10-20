"use client";

import { FiBell, FiChevronDown, FiMenu, FiSearch } from "react-icons/fi";

export default function Header({ setSidebarOpen }) {
  return (
    <header className="fixed top-0 right-0 z-30 h-[65px] w-full lg:w-[calc(100%-255px)] bg-white border-b border-[#e9edf1]">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-10 h-10 rounded-xl bg-[#f5f6fa] text-[#1D1B67] flex items-center justify-center"
          >
            <FiMenu size={21} />
          </button>

          <div className="hidden sm:flex items-center gap-2 w-[240px] lg:w-[300px] h-10 rounded-xl bg-[#f6f7fa] px-3">
            <FiSearch size={17} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            className="relative w-10 h-10 rounded-xl hover:bg-[#f5f6fa] flex items-center justify-center text-gray-500"
          >
            <FiBell size={19} />

            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D91C24] border-2 border-white" />
          </button>

          <div className="hidden sm:block h-7 w-px bg-gray-200" />

          <button type="button" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#1D1B67] text-white flex items-center justify-center font-bold text-sm">
              A
            </div>

            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-[#1D1B67]">Admin</p>

              <p className="text-[10px] text-gray-400">Administrator</p>
            </div>

            <FiChevronDown
              size={15}
              className="hidden md:block text-gray-400"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
