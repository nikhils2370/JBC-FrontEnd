"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiCreditCard, FiRefreshCw } from "react-icons/fi";

export default function LogoFlip() {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="w-full max-w-[430px] mx-auto perspective-[1200px]">

            <motion.button
                type="button"
                aria-label="Flip JBC logo to show payment QR code"
                onClick={() => setFlipped((prev) => !prev)}
                className="relative w-full aspect-square cursor-pointer focus:outline-none"
                style={{
                    perspective: "1200px",
                }}
            >
                <motion.div
                    animate={{
                        rotateY: flipped ? 180 : 0,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.4, 0.2, 0.2, 1],
                    }}
                    className="relative w-full h-full preserve-3d"
                >

                    {/* FRONT */}
                    <div className="absolute inset-0 backface-hidden rounded-[2rem] overflow-hidden">

                        <div className="absolute -inset-1 bg-gradient-to-br from-[#FFEB3B] via-[#D91C24] to-[#1D1B67] rounded-[2rem] blur-sm opacity-70" />

                        <div className="relative h-full rounded-[2rem] border border-white/30 p-5 shadow-2xl flex flex-col items-center justify-center">

                            <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
                                <span className="px-3 py-1.5 rounded-full bg-[#1D1B67] text-white text-[10px] font-bold tracking-wider">
                                    JBC
                                </span>

                                <span className="text-xs font-semibold text-[#1D1B67]/50">
                                    CLICK TO FLIP
                                </span>
                            </div>

                            <div className="w-3/4 aspect-square mt-5 rounded-full bg-gradient-to-br from-[#1D1B67] to-[#D91C24] p-2 shadow-2xl">

                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-6">
                                    <img
                                        src="/JBC.png"
                                        alt="Jai Bhawani Computer Education Centre logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                            </div>

                            <h3 className="mt-5 text-[#1D1B67] text-xl font-extrabold">
                                Jai Bhawani Computer
                            </h3>

                            <p className="text-[#D91C24] text-xs font-bold tracking-widest mt-1">
                                EDUCATION CENTRE
                            </p>

                            <div className="absolute bottom-2 flex items-center gap-2 text-[#1D1B67]/50 text-xs">
                                <FiRefreshCw size={13} />
                                Tap to view payment QR
                            </div>
                        </div>
                    </div>

                    {/* BACK */}
                    <div
                        className="absolute inset-0 backface-hidden rounded-[2rem] overflow-hidden"
                        style={{
                            transform: "rotateY(180deg)",
                        }}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-br from-[#FFEB3B] via-[#D91C24] to-[#1D1B67] rounded-[2rem] blur-sm opacity-70" />

                        <div className="relative h-full rounded-[2rem] bg-[#1D1B67] p-6 shadow-2xl flex flex-col items-center justify-center">

                            <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[#FFEB3B]">
                                    <FiCreditCard size={17} />

                                    <span className="text-xs font-bold tracking-wider">
                                        SECURE PAYMENT
                                    </span>
                                </div>

                                <span className="text-white/50 text-[10px]">
                                    JBC
                                </span>
                            </div>

                            <div className="mt-5 bg-white rounded-2xl p-4 shadow-2xl">

                                <img
                                    src="/QR.png"
                                    alt="JBC Payment QR Code"
                                    className="w-52 sm:w-60 aspect-square object-contain"
                                />

                            </div>

                            <h3 className="mt-5 text-white text-xl font-extrabold">
                                Scan & Pay
                            </h3>

                            <p className="mt-1 text-white/60 text-xs text-center">
                                Scan the QR code to make your course payment.
                            </p>

                            <div className="absolute bottom-2 flex items-center gap-2 text-white/50 text-xs">
                                <FiRefreshCw size={13} />
                                Tap to flip back
                            </div>

                        </div>
                    </div>

                </motion.div>
            </motion.button>
        </div>
    );
}