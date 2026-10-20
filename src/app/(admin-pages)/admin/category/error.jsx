"use client";

import { useEffect } from "react";
import { FiAlertTriangle, FiRefreshCw, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function CategoryError({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error("Category page error:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f8fafc] flex items-center justify-center px-6">
      <div className="w-full max-w-[480px] rounded-[18px] border border-[#e7eaee] bg-white p-8 text-center shadow-[0_4px_15px_rgba(16,24,40,0.06)]">
        {/* Icon */}
        <div className="mx-auto w-[64px] h-[64px] rounded-full bg-[#fff4e5] flex items-center justify-center">
          <FiAlertTriangle size={28} className="text-[#f79009]" />
        </div>

        {/* Title */}
        <h1 className="mt-5 text-[22px] font-semibold text-[#101828]">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="mt-2 text-[13px] leading-5 text-[#667085]">
          We couldn`t load the category management page. Please try again or go
          back to the categories.
        </p>

        {/* Buttons */}
        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/category")}
            className="h-[40px] px-5 rounded-[10px] border border-[#dfe3e8] bg-white text-[13px] font-semibold text-[#344054] hover:bg-[#f8fafc] flex items-center gap-2 transition-colors"
          >
            <FiArrowLeft size={16} />
            Categories
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="h-[40px] px-5 rounded-[10px] bg-[#009f98] hover:bg-[#008f89] text-white text-[13px] font-semibold flex items-center gap-2 transition-colors"
          >
            <FiRefreshCw size={15} />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
