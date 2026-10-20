"use client"

import { motion } from "framer-motion";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-20 h-20 mx-auto"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-2 rounded-2xl border-2 border-dashed border-[#D91C24]"
          />

          <div className="relative w-full h-full rounded-2xl bg-white p-2 shadow-lg">
            <img
              src="/JBC.png"
              alt="JBC"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        <motion.p
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.3,
            repeat: Infinity,
          }}
          className="mt-6 text-xs font-bold text-[#1D1B67]"
        >
          Loading Admin Panel...
        </motion.p>

        <div className="flex justify-center gap-1.5 mt-3">
          {[0, 1, 2].map((item) => (
            <motion.span
              key={item}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: item * 0.12,
              }}
              className="w-1.5 h-1.5 rounded-full bg-[#D91C24]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}