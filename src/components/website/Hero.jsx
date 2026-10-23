"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
    FiArrowRight,
    FiChevronLeft,
    FiChevronRight,
    FiPlay,
} from "react-icons/fi";
import { api } from "@/lib/api";

const defaultSlides = [
    {
        image: "/hero-1.jpg",
        small: "WELCOME TO JBC",
        title: "Learn Today.",
        highlight: "Lead Tomorrow.",
        description:
            "Build practical computer skills with industry-focused courses and expert guidance.",
    },
    {
        image: "/hero-2.jpg",
        small: "SMART COMPUTER EDUCATION",
        title: "Upgrade Your",
        highlight: "Digital Skills.",
        description:
            "From basic computing to advanced technology, learn skills that matter.",
    },
    {
        image: "/hero-3.jpg",
        small: "CAREER FOCUSED LEARNING",
        title: "Your Success",
        highlight: "Starts Here.",
        description:
            "Join JBC and take your first step toward a brighter digital career.",
    },
];

export default function Hero() {
  const [slides, setSlides] = useState(defaultSlides);
  const [current, setCurrent] = useState(0);

  // Fetch dynamic slides from backend
  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await api.getHeroSlides();

        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const filteredSlides = res.data.filter(
            (slide) => !slide?.title?.toLowerCase().includes("qr"),
          );

          setSlides(filteredSlides.length > 0 ? filteredSlides : defaultSlides);
          setCurrent(0);
        }
      } catch (err) {
        console.log("Using default hero slides");
      }
    }

    fetchSlides();
  }, []);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const slide = slides[current] || defaultSlides[0];

  return (
    <section className="relative mt-5 min-h-[620px] lg:min-h-[600px] flex items-center overflow-hidden bg-[#080817]">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.image}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 5 },
          }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Decorative glow */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#D91C24]/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#1D1B67]/50 blur-[120px] rounded-full" />

      {/* Content */}
      <div className="container-jbc relative z-10 pt-24">
        <div className="max-w-3xl">
          <motion.div
            key={`small-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <span className="w-10 h-[2px] bg-[#FFEB3B]" />

            <span className="text-[#FFEB3B] font-bold text-xs sm:text-sm tracking-[0.25em]">
              {slide.small}
            </span>
          </motion.div>

          <motion.h2
            key={`title-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08]"
          >
            {slide.title}
            <br />

            <span className="text-[#FFEB3B]">{slide.highlight}</span>
          </motion.h2>

          <motion.p
            key={`description-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 max-w-2xl text-white/75 text-sm sm:text-base md:text-lg leading-8"
          >
            {slide.description}
          </motion.p>

          {/* CTA */}
          <motion.div
            key={`buttons-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 mt-9"
          >
            <Link
              href="/quiz"
              className="group inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 rounded-xl bg-[#D91C24] text-white font-bold shadow-xl shadow-red-950/30 hover:bg-[#b9161d] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <FiPlay size={15} fill="currentColor" />
              </span>
              Play Quiz Now
              <FiArrowRight
                className="group-hover:translate-x-1 transition"
                size={18}
              />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl border border-white/25 bg-white/5 backdrop-blur-md text-white font-semibold hover:bg-white/10 transition"
            >
              Explore JBC
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="absolute bottom-8 right-4 sm:right-8 lg:right-12 z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="w-11 h-11 rounded-xl border border-white/20 bg-black/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#D91C24] transition"
        >
          <FiChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current ? "w-8 bg-[#FFEB3B]" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-11 h-11 rounded-xl border border-white/20 bg-black/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#D91C24] transition"
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f8f9ff] to-transparent" />
    </section>
  );
}