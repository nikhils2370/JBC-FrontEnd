"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertTriangle, FiHome, FiRefreshCw } from "react-icons/fi";

export default function AdminError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center p-5">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 text-center border border-gray-100 shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center">
          <FiAlertTriangle size={30} className="text-[#D91C24]" />
        </div>

        <h1 className="mt-6 text-2xl font-extrabold text-[#1D1B67]">
          Admin Panel Error
        </h1>

        <p className="mt-3 text-sm text-gray-500 leading-6">
          Something went wrong while loading this admin page. Please try again.
        </p>

        <div className="mt-7 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1D1B67] text-white text-sm font-bold hover:bg-[#121047] transition"
          >
            <FiRefreshCw size={16} />
            Try Again
          </button>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-[#1D1B67] text-sm font-bold hover:bg-gray-50"
          >
            <FiHome size={16} />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
