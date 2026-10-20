"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  description,
  color = "#1D1B67",
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
      }}
      className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
          style={{ backgroundColor: color }}
        >
          <Icon size={22} />
        </div>

        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#1D1B67]"
        >
          <FiArrowUpRight size={17} />
        </button>
      </div>

      <p className="mt-5 text-sm text-gray-500">{title}</p>

      <h3 className="mt-1 text-2xl font-extrabold text-[#1D1B67]">{value}</h3>

      <p className="mt-2 text-xs text-gray-400">{description}</p>
    </motion.div>
  );
}
