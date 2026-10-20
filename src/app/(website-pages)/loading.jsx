"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1D1B67]">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#FFEB3B] blur-[100px]"
                />

                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#D91C24] blur-[100px]"
                />
            </div>

            <div className="relative flex flex-col items-center">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.6, rotateY: -90 }}
                    animate={{
                        opacity: 1,
                        scale: [1, 1.05, 1],
                        rotateY: 0,
                    }}
                    transition={{
                        opacity: { duration: 0.5 },
                        rotateY: { duration: 0.8 },
                        scale: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                    className="relative w-32 h-32 sm:w-40 sm:h-40"
                >
                    {/* Animated ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -inset-3 rounded-full border-2 border-dashed border-[#FFEB3B]/70"
                    />

                    {/* Logo container */}
                    <div className="relative w-full h-full rounded-full bg-white p-4 shadow-2xl shadow-black/30">
                        <img
                            src="/JBC.png"
                            alt="Jai Bhawani Computer Education Centre"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </motion.div>

                {/* Brand */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.5,
                        duration: 0.6,
                    }}
                    className="mt-8 text-center"
                >
                    <h1 className="text-lg sm:text-xl font-extrabold text-white">
                        Jai Bhawani Computer
                    </h1>

                    <p className="mt-1 text-[#FFEB3B] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                        Education Centre
                    </p>
                </motion.div>

                {/* Loading dots */}
                <div className="flex items-center gap-2 mt-7">
                    {[0, 1, 2].map((item) => (
                        <motion.span
                            key={item}
                            animate={{
                                y: [0, -7, 0],
                                opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: item * 0.15,
                                ease: "easeInOut",
                            }}
                            className="w-2.5 h-2.5 rounded-full bg-[#FFEB3B]"
                        />
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-4 text-white/40 text-[11px] tracking-wider"
                >
                    Loading...
                </motion.p>
            </div>
        </div>
    );
}