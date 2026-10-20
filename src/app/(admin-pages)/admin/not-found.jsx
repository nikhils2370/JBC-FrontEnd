"use client";

import Link from "next/link";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AdminNotFound() {
  return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center p-5">
      <div className="text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 mx-auto rounded-2xl bg-white p-3 shadow-sm border border-gray-100"
        >
          <img
            src="/JBC.png"
            alt="JBC"
            className="w-full h-full object-contain"
          />
        </motion.div>

        <p className="mt-8 text-8xl font-black text-[#1D1B67]/10">404</p>

        <h1 className="-mt-8 text-3xl font-extrabold text-[#1D1B67]">
          Admin Page Not Found
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          The admin page you`re looking for doesn`t exist.
        </p>

        <div className="mt-7 flex justify-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1D1B67] text-white text-sm font-bold"
          >
            <FiHome />
            Dashboard
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-[#1D1B67] text-sm font-bold"
          >
            <FiArrowLeft />
            Website
          </Link>
        </div>
      </div>
    </div>
  );
}
