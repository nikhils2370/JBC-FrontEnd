"use client";

import { motion } from "framer-motion";
import {
    FiAward,
    FiClock,
    FiMonitor,
    FiBriefcase,
} from "react-icons/fi";
import SectionHeading from "./SectionHeading";

const features = [
    {
        icon: FiAward,
        title: "Certified Trainers",
        description:
            "Learn from experienced trainers who focus on practical and easy-to-understand education.",
    },
    {
        icon: FiMonitor,
        title: "Modern Lab",
        description:
            "Practice your skills in a dedicated computer lab with hands-on learning.",
    },
    {
        icon: FiBriefcase,
        title: "Job Assistance",
        description:
            "Get guidance to improve your skills, confidence and career opportunities.",
    },
    {
        icon: FiClock,
        title: "Flexible Timings",
        description:
            "Choose suitable learning schedules designed around students and working learners.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="section-dark py-20 lg:py-28 overflow-hidden">
            <div className="container-jbc">

                <SectionHeading
                    eyebrow="Why JBC"
                    title="Why Choose Jai Bhawani?"
                    description="We combine practical training, supportive teaching and career-focused learning to create a better student experience."
                    dark
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="group"
                            >
                                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 hover:bg-white/[0.08] hover:border-[#FFEB3B]/30 transition-all duration-500">

                                    <div className="w-14 h-14 rounded-2xl bg-[#FFEB3B] text-[#1D1B67] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        <Icon size={26} />
                                    </div>

                                    <h3 className="mt-6 text-xl font-bold text-white">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm text-white/55 leading-7">
                                        {feature.description}
                                    </p>

                                    <div className="mt-6 w-10 h-1 rounded-full bg-[#D91C24] group-hover:w-20 transition-all duration-500" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}