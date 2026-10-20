"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
    FiMenu,
    FiX,
    FiHome,
    FiInfo,
    FiBookOpen,
    FiPhone,
    FiLogIn,
    FiUser,
    FiLogOut,
    FiHelpCircle,
    FiShield,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
    {
        name: "Home",
        href: "/",
        icon: FiHome,
    },
    {
        name: "Quiz",
        href: "/quiz",
        icon: FiHelpCircle,
    },
    {
        name: "About",
        href: "/about",
        icon: FiInfo,
    },
    {
        name: "Services",
        href: "/services",
        icon: FiBookOpen,
    },
    {
        name: "Contact",
        href: "/contact",
        icon: FiPhone,
    },
];

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, isAuthenticated, isAdmin, logout } = useAuth();

    const handleLogout = () => {
        logout();
        setMobileOpen(false);
        router.push("/login");
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="bg-[#1D1B67]/95 backdrop-blur-xl border-b border-white/10">
                <div className="container-jbc">
                    <div className="h-[76px] flex items-center justify-between">

                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-3 group"
                            onClick={() => setMobileOpen(false)}
                        >
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white p-1 shadow-lg shadow-black/20">
                                <img
                                    src="/JBC.png"
                                    alt="Jai Bhawani Computer Education Centre"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="hidden sm:block">
                                <h1 className="text-white font-bold text-sm md:text-base leading-tight">
                                    Jai Bhawani
                                </h1>

                                <p className="text-[#FFEB3B] text-[10px] md:text-xs font-medium tracking-wide">
                                    COMPUTER EDUCATION CENTRE
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-2">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`px-4 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm font-medium ${
                                            isActive ? "bg-white/10 text-white" : ""
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}

                            {isAuthenticated ? (
                                <div className="ml-3 flex items-center gap-3">
                                    {isAdmin ? (
                                        <Link
                                            href="/admin"
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition shadow-lg"
                                        >
                                            <FiShield size={16} />
                                            Admin Panel
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/student"
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white font-bold text-sm transition border border-white/20"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[#D91C24] flex items-center justify-center text-xs">
                                                {user?.name?.charAt(0) || "S"}
                                            </div>
                                            <span>Student Portal</span>
                                        </Link>
                                    )}

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        title="Logout"
                                        className="p-2.5 rounded-xl bg-white/10 hover:bg-red-500/20 text-white/80 hover:text-red-400 transition"
                                    >
                                        <FiLogOut size={17} />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="ml-3 flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D91C24] text-white font-semibold text-sm shadow-lg shadow-red-900/30 hover:bg-[#b9161d] hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <FiLogIn size={17} />
                                    Student / Admin Login
                                </Link>
                            )}
                        </nav>

                        {/* Mobile Actions */}
                        <div className="flex gap-2 items-center lg:hidden">
                            {isAuthenticated ? (
                                <Link
                                    href={isAdmin ? "/admin" : "/student"}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 text-white text-xs font-bold"
                                >
                                    <FiUser size={15} />
                                    {isAdmin ? "Admin" : "Portal"}
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D91C24] text-white text-xs font-bold"
                                >
                                    <FiLogIn size={15} />
                                    Login
                                </Link>
                            )}

                            <button
                                type="button"
                                aria-label="Toggle menu"
                                onClick={() => setMobileOpen((prev) => !prev)}
                                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
                            >
                                {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="lg:hidden overflow-hidden bg-[#111044]/98 backdrop-blur-xl border-b border-white/10"
                    >
                        <div className="container-jbc py-4">
                            <nav className="flex flex-col gap-2">
                                {navLinks.map((link) => {
                                    const Icon = link.icon;
                                    const isActive = pathname === link.href;

                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition ${
                                                isActive ? "bg-white/10 text-white" : ""
                                            }`}
                                        >
                                            <Icon size={18} />
                                            <span>{link.name}</span>
                                        </Link>
                                    );
                                })}

                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            href={isAdmin ? "/admin" : "/student"}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-bold"
                                        >
                                            <FiUser size={18} />
                                            <span>{isAdmin ? "Admin Dashboard" : "My Student Portal"}</span>
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 text-left font-bold"
                                        >
                                            <FiLogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#D91C24] text-white font-bold"
                                    >
                                        <FiLogIn size={18} />
                                        <span>Student / Admin Login</span>
                                    </Link>
                                )}
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}