"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    FiArrowRight,
    FiAward,
    FiBookOpen,
    FiMonitor,
    FiUsers,
} from "react-icons/fi";

const stats = [
    {
        number: "1000+",
        label: "Students Trained",
    },
    {
        number: "10+",
        label: "Courses",
    },
    {
        number: "5+",
        label: "Years of Learning",
    },
    {
        number: "100%",
        label: "Practical Focus",
    },
];

const values = [
    {
        icon: FiAward,
        title: "Quality Education",
        description:
            "We focus on clear explanations, practical learning and student-friendly teaching.",
    },
    {
        icon: FiMonitor,
        title: "Practical Training",
        description:
            "Students get opportunities to practice concepts rather than only learning theory.",
    },
    {
        icon: FiUsers,
        title: "Student Support",
        description:
            "Our learning environment encourages students to ask questions and improve continuously.",
    },
    {
        icon: FiBookOpen,
        title: "Career Focus",
        description:
            "Courses are designed to develop useful digital and professional skills.",
    },
];

export default function AboutPage() {
    return (
        <div className="pt-19">

            {/* Hero */}
            <section className="relative py-24 lg:py-32 bg-[#1D1B67] overflow-hidden">

                <div className="absolute top-0 right-0 w-80 h-80 bg-[#D91C24]/20 rounded-full blur-3xl" />

                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFEB3B]/10 rounded-full blur-3xl" />

                <div className="container-jbc relative flex">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl"
                    >
                        <span className="text-[#FFEB3B] text-xs font-bold tracking-[0.25em]">
                            ABOUT JBC
                        </span>

                        <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                            Empowering Students Through{" "}
                            <span className="text-[#FFEB3B]">
                                Digital Education.
                            </span>
                        </h1>

                        <p className="mt-6 text-white/65 leading-8 text-sm sm:text-base">
                            Jai Bhawani Computer Education Centre is committed to
                            providing practical computer education and helping students
                            develop the digital skills needed for today`s world.
                        </p>
                    </motion.div>
                    <img
                        src="/JBC.png"
                        alt="JBC Logo"
                        className="w-75 h-97 mx-auto object-contain bg-white rounded-t-full p-3 hover:bg-[#69cbe998] transition-all hidden lg:block"
                    />
                </div>
            </section>

            {/* Stats */}
            <section className="py-8 bg-white border-b border-gray-100">
                <div className="container-jbc">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.08,
                                }}
                                className="text-center py-5"
                            >
                                <p className="text-3xl font-extrabold text-[#1D1B67]">
                                    {stat.number}
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 lg:py-28 bg-[#f8f9ff]">
                <div className="container-jbc">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        <div>
                            <span className="text-[#D91C24] text-xs font-bold tracking-[0.2em]">
                                OUR STORY
                            </span>

                            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#1D1B67]">
                                Learning That Goes Beyond the Classroom.
                            </h2>

                            <div className="mt-6 space-y-4 text-sm sm:text-base text-gray-600 leading-8">
                                <p>
                                    JBC was created with a simple goal: make computer
                                    education accessible, practical and useful for students.
                                </p>

                                <p>
                                    From computer fundamentals and digital literacy to
                                    accounting, design and web development, our courses
                                    help students build confidence through hands-on
                                    practice.
                                </p>

                                <p>
                                    We believe that every student can learn technology
                                    when concepts are explained clearly and supported with
                                    practical exercises.
                                </p>
                            </div>

                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-xl bg-[#D91C24] text-white font-bold hover:bg-[#b9161d] transition"
                            >
                                Explore Our Courses
                                <FiArrowRight size={17} />
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-3 bg-gradient-to-br from-[#FFEB3B] via-[#D91C24] to-[#1D1B67] rounded-[2rem] blur-lg opacity-20" />

                            <div className="relative bg-[#1D1B67] rounded-[2rem] p-8 sm:p-10">
                                <img
                                    src="/JBC.png"
                                    alt="JBC Logo"
                                    className="w-52 h-52 mx-auto object-contain bg-white rounded-full p-5"
                                />

                                <h3 className="mt-8 text-center text-2xl font-extrabold text-white">
                                    Jai Bhawani Computer
                                </h3>

                                <p className="text-center text-[#FFEB3B] text-xs font-bold tracking-widest mt-2">
                                    EDUCATION CENTRE
                                </p>

                                <div className="mt-8 h-px bg-white/10" />

                                <p className="mt-6 text-center text-white/55 text-sm leading-7">
                                    Learn • Practice • Grow • Succeed
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container-jbc">

                    <div className="max-w-2xl mx-auto text-center mb-12">
                        <span className="text-[#D91C24] text-xs font-bold tracking-[0.2em]">
                            OUR VALUES
                        </span>

                        <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#1D1B67]">
                            What Makes JBC Different?
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {values.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.08,
                                    }}
                                    className="p-6 rounded-3xl bg-[#f8f9ff] border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-[#1D1B67] text-[#FFEB3B] flex items-center justify-center">
                                        <Icon size={24} />
                                    </div>

                                    <h3 className="mt-6 text-lg font-bold text-[#1D1B67]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm text-gray-500 leading-7">
                                        {item.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </section>
        </div>
    );
}