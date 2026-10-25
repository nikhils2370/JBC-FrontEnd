"use client";

import { useState } from "react";
import {
    FiCheckCircle,
    FiMail,
    FiMapPin,
    FiPhone,
    FiSend,
} from "react-icons/fi";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);

        setTimeout(() => {
            setSubmitted(false);
        }, 4000);
    }

    return (
        <div className="pt-[76px]">

            {/* Hero */}
            <section className="py-24 lg:py-32 bg-[#1D1B67]">
                <div className="container-jbc text-center">

                    <span className="text-[#FFEB3B] text-xs font-bold tracking-[0.25em]">
                        GET IN TOUCH
                    </span>

                    <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                        Contact{" "}
                        <span className="text-[#FFEB3B]">
                            JBC.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto mt-6 text-white/60 leading-8">
                        Have a question about a course, admission or student
                        services? Send us a message.
                    </p>

                </div>
            </section>

            {/* Contact */}
            <section className="py-20 lg:py-28 bg-[#f8f9ff]">
                <div className="container-jbc">

                    <div className="grid lg:grid-cols-5 gap-8">

                        {/* Details */}
                        <div className="lg:col-span-2">

                            <h2 className="text-3xl font-extrabold text-[#1D1B67]">
                                Let`s Talk
                            </h2>

                            <p className="mt-4 text-sm text-gray-600 leading-7">
                                Our team is here to help you choose the right course
                                and answer your questions.
                            </p>

                            <div className="mt-8 space-y-4">

                                <div className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                                    <div className="w-11 h-11 rounded-xl bg-[#1D1B67] text-[#FFEB3B] flex items-center justify-center shrink-0">
                                        <FiMapPin size={20} />
                                    </div>

                                    <div>
                                        <p className="font-bold text-[#1D1B67] text-sm">
                                            Address
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500 leading-6">
                                            Jai Bhawani Computer Education Centre,
                                            Rajasthan, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                                    <div className="w-11 h-11 rounded-xl bg-[#D91C24] text-white flex items-center justify-center shrink-0">
                                        <FiPhone size={20} />
                                    </div>

                                    <div>
                                        <p className="font-bold text-[#1D1B67] text-sm">
                                            Phone
                                        </p>

                                        <a
                                            href="tel:+919999999999"
                                            className="mt-1 block text-xs text-gray-500 hover:text-[#D91C24]"
                                        >
                                            +91 99999 99999
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                                    <div className="w-11 h-11 rounded-xl bg-[#1D1B67] text-[#FFEB3B] flex items-center justify-center shrink-0">
                                        <FiMail size={20} />
                                    </div>

                                    <div>
                                        <p className="font-bold text-[#1D1B67] text-sm">
                                            Email
                                        </p>

                                        <a
                                            href="mailto:info@jbccomputer.com"
                                            className="mt-1 block text-xs text-gray-500 hover:text-[#D91C24]"
                                        >
                                            info@jbccomputer.com
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-3">

                            <form
                                onSubmit={handleSubmit}
                                className="bg-white rounded-[2rem] p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm"
                            >

                                {submitted && (
                                    <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm">
                                        <FiCheckCircle size={19} />
                                        Your message has been submitted successfully.
                                    </div>
                                )}

                                <div className="grid sm:grid-cols-2 gap-5">

                                    <div>
                                        <label className="block text-xs font-bold text-[#1D1B67] mb-2">
                                            Your Name
                                        </label>

                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter your name"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#1D1B67] focus:ring-2 focus:ring-[#1D1B67]/10 transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[#1D1B67] mb-2">
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            required
                                            placeholder="Enter phone number"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#1D1B67] focus:ring-2 focus:ring-[#1D1B67]/10 transition"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold text-[#1D1B67] mb-2">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            placeholder="Enter email address"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#1D1B67] focus:ring-2 focus:ring-[#1D1B67]/10 transition"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold text-[#1D1B67] mb-2">
                                            Course Interested In
                                        </label>

                                        <select
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#1D1B67] focus:ring-2 focus:ring-[#1D1B67]/10 transition bg-white"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Select a course
                                            </option>
                                            <option>RKCL</option>
                                            <option>RS-CIT</option>
                                            <option>Tally Prime</option>
                                        </select>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold text-[#1D1B67] mb-2">
                                            Message
                                        </label>

                                        <textarea
                                            required
                                            rows={5}
                                            placeholder="Write your message..."
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none resize-none focus:border-[#1D1B67] focus:ring-2 focus:ring-[#1D1B67]/10 transition"
                                        />
                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    className="mt-6 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#D91C24] text-white font-bold hover:bg-[#b9161d] transition"
                                >
                                    Send Message
                                    <FiSend size={17} />
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}