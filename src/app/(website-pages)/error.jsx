"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    FiAlertTriangle,
    FiHome,
    FiRefreshCw,
} from "react-icons/fi";

export default function Error({
    error,
    reset,
}) {
    useEffect(() => {
        // Log error for debugging.
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen pt-[76px] bg-[#f8f9ff] flex items-center justify-center px-4 py-16">

            <div className="w-full max-w-2xl">

                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-[2rem] border border-gray-100 shadow-xl p-7 sm:p-10 lg:p-12 text-center"
                >

                    {/* Error icon */}
                    <motion.div
                        animate={{
                            y: [0, -6, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="mx-auto w-20 h-20 rounded-2xl bg-[#D91C24]/10 flex items-center justify-center"
                    >
                        <FiAlertTriangle
                            size={38}
                            className="text-[#D91C24]"
                        />
                    </motion.div>

                    <p className="mt-7 text-xs font-bold tracking-[0.2em] text-[#D91C24]">
                        SOMETHING WENT WRONG
                    </p>

                    <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1D1B67]">
                        Oops! Something went wrong.
                    </h1>

                    <p className="max-w-md mx-auto mt-4 text-sm text-gray-500 leading-7">
                        We couldn`t load this page correctly. Please try again
                        or return to the JBC homepage.
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap justify-center gap-3">

                        <button
                            type="button"
                            onClick={() => reset()}
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#D91C24] text-white text-sm font-bold hover:bg-[#b9161d] transition"
                        >
                            <FiRefreshCw size={17} />
                            Try Again
                        </button>

                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1D1B67] text-white text-sm font-bold hover:bg-[#121047] transition"
                        >
                            <FiHome size={17} />
                            Go Home
                        </Link>

                    </div>

                    {/* Logo */}
                    <div className="mt-10 pt-7 border-t border-gray-100">

                        <div className="w-12 h-12 mx-auto rounded-full bg-white border border-gray-100 p-1">
                            <img
                                src="/JBC.png"
                                alt="JBC"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <p className="mt-3 text-[10px] text-gray-400 font-semibold tracking-wider uppercase">
                            Jai Bhawani Computer Education Centre
                        </p>

                    </div>

                </motion.div>

            </div>
        </main>
    );
}