"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiHome,
    FiSearch,
} from "react-icons/fi";

export default function NotFound() {
    return (
        <main className="min-h-screen pt-[76px] bg-[#f8f9ff] flex items-center justify-center px-4 py-16">

            <div className="w-full max-w-3xl text-center">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-3 shadow-xl border border-gray-100"
                >
                    <img
                        src="/JBC.png"
                        alt="JBC Logo"
                        className="w-full h-full object-contain"
                    />
                </motion.div>

                {/* 404 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    <p className="mt-8 text-7xl sm:text-8xl lg:text-9xl font-black text-[#1D1B67]/10">
                        404
                    </p>

                    <h1 className="-mt-7 sm:-mt-10 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1B67]">
                        Page Not Found
                    </h1>

                    <p className="max-w-lg mx-auto mt-5 text-sm sm:text-base text-gray-500 leading-7">
                        Sorry, the page you`re looking for doesn`t exist or may
                        have been moved to another location.
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8 flex flex-wrap justify-center gap-3"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#D91C24] text-white text-sm font-bold hover:bg-[#b9161d] transition"
                    >
                        <FiHome size={17} />
                        Go Home
                    </Link>

                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1D1B67] text-white text-sm font-bold hover:bg-[#121047] transition"
                    >
                        <FiSearch size={17} />
                        Explore Courses
                    </Link>
                </motion.div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mt-7 text-xs font-semibold text-gray-400 hover:text-[#D91C24] transition"
                >
                    <FiArrowLeft size={14} />
                    Back to JBC
                </Link>

            </div>
        </main>
    );
}