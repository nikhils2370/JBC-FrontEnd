"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCreditCard, FiRefreshCw } from "react-icons/fi";
import { api } from "@/lib/api";

const defaultQR = "/QR.png";

export default function LogoFlip() {
  const [flipped, setFlipped] = useState(false);
  const [slides, setSlides] = useState([]);
  const [qrImage, setQrImage] = useState(defaultQR);
  const [loading, setLoading] = useState(true);

  // Fetch slides from backend
  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await api.getHeroSlides();

        if (res?.success && Array.isArray(res.data)) {
          setSlides(res.data);

          // Find slide whose title contains "QR"
          const qrSlide = res.data.find((item) =>
            item?.title?.toLowerCase().includes("qr")
          );

          // Replace default QR with backend image URL
          if (qrSlide) {
            const imageUrl =
              qrSlide.imageUrl ||
              qrSlide.image ||
              qrSlide.thumbnail ||
              qrSlide.image_url;

            if (imageUrl) {
              setQrImage(imageUrl);
            }
          }
        }
      } catch (err) {
        console.error("Using default QR image:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSlides();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[430px] [perspective:1200px]">
      <motion.button
        type="button"
        aria-label={
          flipped
            ? "Flip back to JBC logo"
            : "Flip JBC logo to show QR"
        }
        aria-pressed={flipped}
        onClick={() => setFlipped((prev) => !prev)}
        className="relative aspect-square w-full cursor-pointer rounded-[2rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFEB3B]"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0.2, 0.2, 1],
          }}
          className="relative h-full w-full [transform-style:preserve-3d]"
        >
          {/* FRONT FACE: JBC LOGO */}
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] [backface-visibility:hidden]">
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-[#FFEB3B] via-[#D91C24] to-[#1D1B67] opacity-70 blur-sm" />

            <div className="relative flex h-full flex-col items-center justify-center rounded-[2rem] border border-white/30 p-5 shadow-2xl">
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                <span className="rounded-full bg-[#1D1B67] px-3 py-1.5 text-[10px] font-bold tracking-wider text-white">
                  JBC
                </span>

                <span className="text-xs font-semibold text-[#1D1B67]/50">
                  CLICK TO FLIP
                </span>
              </div>

              <div className="mt-5 aspect-square w-3/4 rounded-full bg-gradient-to-br from-[#1D1B67] to-[#D91C24] p-2 shadow-2xl">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white p-6">
                  <img
                    src="/JBC.png"
                    alt="Jai Bhawani Computer Education Centre logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              <h3 className="mt-5 text-center text-xl font-extrabold text-[#1D1B67]">
                Jai Bhawani Computer
              </h3>

              <p className="mt-1 text-xs font-bold tracking-widest text-[#D91C24]">
                EDUCATION CENTRE
              </p>

              <div className="absolute bottom-3 flex items-center gap-2 text-xs text-[#1D1B67]/60">
                <FiRefreshCw size={13} />
                Tap to view QR
              </div>
            </div>
          </div>

          {/* BACK FACE: DYNAMIC QR IMAGE */}
          <div
            className="absolute inset-0 overflow-hidden rounded-[2rem] [backface-visibility:hidden]"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-[#FFEB3B] via-[#D91C24] to-[#1D1B67] opacity-70 blur-sm" />

            <div className="relative flex h-full flex-col items-center justify-center rounded-[2rem] bg-[#1D1B67] p-5 shadow-2xl sm:p-6">
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#FFEB3B]">
                  <FiCreditCard size={17} />

                  <span className="text-xs font-bold tracking-wider">
                    Open QR 
                  </span>
                </div>

                <span className="text-[10px] text-white/50">JBC</span>
              </div>

              {/* QR IMAGE */}
              <div className="mt-5 flex aspect-square w-[68%] max-w-[260px] items-center justify-center overflow-hidden rounded-2xl bg-white p-3 shadow-2xl sm:p-4">
                {loading ? (
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1D1B67]" />
                ) : (
                  <img
                    key={qrImage}
                    src={qrImage}
                    alt="JBC QR Code"
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = defaultQR;
                    }}
                  />
                )}
              </div>

              <h3 className="mt-4 text-xl font-extrabold text-white">
                Scan
              </h3>

              <p className="mt-1 max-w-[250px] text-center text-xs leading-5 text-white/60">
                Scan the QR code to open website.
              </p>

              <div className="absolute bottom-3 flex items-center gap-2 text-xs text-white/50">
                <FiRefreshCw size={13} />
                Tap to flip back
              </div>
            </div>
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}