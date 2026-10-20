"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    FiChevronLeft,
    FiChevronRight,
    FiStar,
    FiUser,
} from "react-icons/fi";
import SectionHeading from "./SectionHeading";

const testimonials = [
    {
        name: "Rahul Sharma",
        course: "Tally Prime Student",
        review:
            "The practical classes helped me understand accounting much better. The trainers explain every topic clearly.",
    },
    {
        name: "Priya Kumari",
        course: "RS-CIT Student",
        review:
            "JBC has a friendly learning environment. I improved my computer skills and became much more confident.",
    },
    {
        name: "Amit Singh",
        course: "Web Development Student",
        review:
            "The practical web development sessions were very useful. I learned how to build responsive websites from scratch.",
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 4500);

        return () => clearInterval(interval);
    }, []);

    const next = () => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const previous = () => {
        setCurrent((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    const item = testimonials[current];

    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="container-jbc">

                <SectionHeading
                    eyebrow="Student Reviews"
                    title="What Our Students Say"
                    description="A few words from students who have experienced learning at JBC."
                />

                <div className="max-w-4xl mx-auto">

                    <div className="relative rounded-[2rem] bg-[#1D1B67] overflow-hidden p-8 sm:p-12">

                        {/* Background decorations */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D91C24]/20 rounded-full blur-3xl" />

                        <div className="absolute bottom-0 left-0 w-52 h-52 bg-[#FFEB3B]/10 rounded-full blur-3xl" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.5 }}
                                className="relative"
                            >
                                <div className="flex gap-1 text-[#FFEB3B]">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FiStar
                                            key={star}
                                            size={17}
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>

                                <blockquote className="mt-7 text-xl sm:text-2xl md:text-3xl font-semibold leading-relaxed text-white">
                                    “{item.review}”
                                </blockquote>

                                <div className="mt-8 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                                        <FiUser className="text-[#FFEB3B]" size={20} />
                                    </div>

                                    <div>
                                        <p className="text-white font-bold">
                                            {item.name}
                                        </p>

                                        <p className="text-white/50 text-xs mt-1">
                                            {item.course}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls */}
                        <div className="relative mt-8 flex items-center justify-between">

                            <div className="flex gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        aria-label={`Review ${index + 1}`}
                                        onClick={() => setCurrent(index)}
                                        className={`h-2 rounded-full transition-all ${current === index
                                                ? "w-8 bg-[#FFEB3B]"
                                                : "w-2 bg-white/30"
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={previous}
                                    className="w-10 h-10 rounded-xl border border-white/15 text-white flex items-center justify-center hover:bg-white/10 transition"
                                    aria-label="Previous review"
                                >
                                    <FiChevronLeft size={18} />
                                </button>

                                <button
                                    type="button"
                                    onClick={next}
                                    className="w-10 h-10 rounded-xl bg-[#D91C24] text-white flex items-center justify-center hover:bg-[#b9161d] transition"
                                    aria-label="Next review"
                                >
                                    <FiChevronRight size={18} />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}