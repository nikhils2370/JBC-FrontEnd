"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiClock } from "react-icons/fi";

export default function CourseCard({
    title,
    shortName,
    description,
    duration,
    features = [],
    index = 0,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: 0.55,
                delay: index * 0.08,
            }}
            className="h-full"
        >
            <div className="group h-full rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#1D1B67]/10 transition-all duration-500 overflow-hidden">

                {/* Header */}
                <div className="relative p-6 bg-gradient-to-br from-[#1D1B67] to-[#121047] overflow-hidden">

                    <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#D91C24]/30 rounded-full blur-3xl" />

                    <div className="relative">
                        <span className="inline-flex px-3 py-1 rounded-full bg-[#FFEB3B] text-[#1D1B67] text-[10px] font-extrabold tracking-wider">
                            {shortName}
                        </span>

                        <h3 className="mt-5 text-2xl font-extrabold text-white">
                            {title}
                        </h3>

                        <div className="mt-4 flex items-center gap-2 text-white/60 text-xs">
                            <FiClock size={14} />
                            {duration}
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col h-[calc(100%-170px)]">

                    <p className="text-sm text-gray-600 leading-7">
                        {description}
                    </p>

                    <div className="mt-5 space-y-2">
                        {features.map((feature) => (
                            <div
                                key={feature}
                                className="flex items-start gap-2 text-xs text-gray-600"
                            >
                                <FiCheckCircle
                                    className="text-[#D91C24] mt-0.5 shrink-0"
                                    size={15}
                                />

                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-7">
                        <Link
                            href="/services"
                            className="group/btn flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#1D1B67] text-white font-semibold text-sm hover:bg-[#D91C24] transition-colors duration-300"
                        >
                            Learn More

                            <FiArrowRight
                                size={16}
                                className="group-hover/btn:translate-x-1 transition-transform"
                            />
                        </Link>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}