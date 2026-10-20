"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    FiAward,
    FiArrowRight,
    FiBookOpen,
    FiLogIn,
    FiUsers,
} from "react-icons/fi";

const cards = [
    {
        title: "Quiz Portal",
        description:
            "Test your knowledge with interactive computer quizzes and improve your preparation.",
        icon: FiBookOpen,
        href: "/quiz",
        label: "Play Quiz",
        color: "#D91C24",
        number: "01",
    },
    {
        title: "Student Login",
        description:
            "Access your student dashboard, courses, learning resources and important updates.",
        icon: FiLogIn,
        href: "/login",
        label: "Login Now",
        color: "#1D1B67",
        number: "02",
    },
    {
        title: "Top Scorers",
        description:
            "Check the latest leaderboard and see the students achieving outstanding results.",
        icon: FiAward,
        href: "#leaderboard",
        label: "View Ranking",
        color: "#b89500",
        number: "03",
    },
];

export default function ActionCards() {
    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="container-jbc">

                <div className="grid md:grid-cols-3 gap-6">
                    {cards.map((card, index) => {
                        const Icon = card.icon;

                        return (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.55,
                                    delay: index * 0.1,
                                }}
                            >
                                <Link href={card.href} className="block h-full">
                                    <div className="group relative h-full min-h-[280px] rounded-3xl overflow-hidden bg-[#080817] p-[1px]">

                                        <div className="absolute inset-0 opacity-60">
                                            <div
                                                className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl"
                                                style={{
                                                    backgroundColor: card.color,
                                                }}
                                            />
                                        </div>

                                        <div className="relative h-full rounded-[23px] p-7 sm:p-8 flex flex-col bg-[#111126]">

                                            <div className="flex items-center justify-between">
                                                <div
                                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                                                    style={{
                                                        backgroundColor: card.color,
                                                    }}
                                                >
                                                    <Icon size={26} />
                                                </div>

                                                <span className="text-5xl font-extrabold text-white/5">
                                                    {card.number}
                                                </span>
                                            </div>

                                            <div className="mt-7">
                                                <h3 className="text-2xl font-extrabold text-white">
                                                    {card.title}
                                                </h3>

                                                <p className="mt-3 text-sm text-white/55 leading-7">
                                                    {card.description}
                                                </p>
                                            </div>

                                            <div className="mt-auto pt-7 flex items-center gap-2 text-[#FFEB3B] text-sm font-bold">
                                                {card.label}

                                                <FiArrowRight
                                                    size={17}
                                                    className="group-hover:translate-x-2 transition-transform"
                                                />
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFEB3B] via-[#D91C24] to-[#1D1B67] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Small stats strip */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-8 rounded-2xl bg-[#1D1B67] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-12 text-center"
                >
                    <div className="flex items-center gap-3">
                        <FiUsers className="text-[#FFEB3B]" size={22} />
                        <span className="text-white/80 text-sm">
                            Active Students
                        </span>
                    </div>

                    <div className="hidden sm:block w-px h-6 bg-white/20" />

                    <div className="text-white font-bold">
                        1000+ Learners
                    </div>

                    <div className="hidden sm:block w-px h-6 bg-white/20" />

                    <div className="text-[#FFEB3B] font-bold">
                        Learn • Practice • Succeed
                    </div>
                </motion.div>
            </div>
        </section>
    );
}