"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
    eyebrow,
    title,
    description,
    dark = false,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12"
        >
            {eyebrow && (
                <div className="inline-flex items-center gap-2 mb-4">
                    <span className="w-8 h-[2px] bg-[#D91C24]" />

                    <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#D91C24]">
                        {eyebrow}
                    </span>

                    <span className="w-8 h-[2px] bg-[#D91C24]" />
                </div>
            )}

            <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight ${dark ? "text-white" : "text-[#1D1B67]"
                    }`}
            >
                {title}
            </h2>

            {description && (
                <p
                    className={`mt-5 text-sm sm:text-base leading-7 ${dark ? "text-white/60" : "text-gray-600"
                        }`}
                >
                    {description}
                </p>
            )}
        </motion.div>
    );
}