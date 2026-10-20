import Link from "next/link";
import {
    FiFacebook,
    FiInstagram,
    FiYoutube,
    FiMapPin,
    FiPhone,
    FiMail,
    FiArrowUpRight,
} from "react-icons/fi";

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Student Login", href: "/login" },
    { name: "Online Quiz", href: "/quiz" },
];

export default function Footer() {
    return (
        <footer className="bg-[#080817] text-white">

            {/* Main Footer */}
            <div className="container-jbc py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-full bg-white p-1.5">
                                <img
                                    src="/JBC.png"
                                    alt="JBC Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div>
                                <h3 className="font-bold text-lg">
                                    Jai Bhawani
                                </h3>

                                <p className="text-[#FFEB3B] text-xs">
                                    COMPUTER EDUCATION CENTRE
                                </p>
                            </div>
                        </Link>

                        <p className="mt-5 text-white/60 text-sm leading-7">
                            Empowering students with quality computer education,
                            practical skills and career-focused training.
                        </p>

                        {/* Social */}
                        <div className="flex items-center gap-3 mt-6">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D91C24] transition"
                            >
                                <FiFacebook size={18} />
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D91C24] transition"
                            >
                                <FiInstagram size={18} />
                            </a>

                            <a
                                href="#"
                                aria-label="YouTube"
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D91C24] transition"
                            >
                                <FiYoutube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-2 text-white/60 hover:text-[#FFEB3B] transition text-sm"
                                    >
                                        <FiArrowUpRight
                                            size={14}
                                            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
                                        />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Courses */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">
                            Popular Courses
                        </h3>

                        <ul className="space-y-3 text-sm text-white/60">
                            <li>RKCL / RS-CIT</li>
                            <li>Tally Prime</li>
                            <li>Graphic Design</li>
                            <li>Web Development</li>
                            <li>Advanced Computer Courses</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">
                            Contact Us
                        </h3>

                        <div className="space-y-5">

                            <div className="flex gap-3">
                                <FiMapPin
                                    className="text-[#FFEB3B] shrink-0 mt-1"
                                    size={19}
                                />

                                <p className="text-sm text-white/60 leading-6">
                                    Jai Bhawani Computer Education Centre,
                                    Rajasthan, India
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <FiPhone
                                    className="text-[#FFEB3B] shrink-0"
                                    size={19}
                                />

                                <a
                                    href="tel:+919999999999"
                                    className="text-sm text-white/60 hover:text-white transition"
                                >
                                    +91 99999 99999
                                </a>
                            </div>

                            <div className="flex gap-3">
                                <FiMail
                                    className="text-[#FFEB3B] shrink-0"
                                    size={19}
                                />

                                <a
                                    href="mailto:info@jbccomputer.com"
                                    className="text-sm text-white/60 hover:text-white transition break-all"
                                >
                                    info@jbccomputer.com
                                </a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/10">
                <div className="container-jbc py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-white/50 text-center md:text-left">
                        © {new Date().getFullYear()} Jai Bhawani Computer Education
                        Centre. All Rights Reserved.
                    </p>

                    <p className="text-xs text-white/40">
                        Designed with ❤️ for JBC Students
                    </p>
                </div>
            </div>
        </footer>
    );
}