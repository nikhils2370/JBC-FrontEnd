"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiAward, FiCheckCircle, FiChevronRight, FiStar, FiZap } from "react-icons/fi";
import { api } from "@/lib/api";
import SectionHeading from "./SectionHeading";

export default function TopScorers() {
  const [top3, setTop3] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await api.getLeaderboard();
        if (res.success && res.top3) {
          setTop3(res.top3);
        }
      } catch (err) {
        console.error("Top Scorers fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  const medals = [
    {
      rank: 1,
      badge: "🥇 Rank 1",
      badgeBg: "bg-gradient-to-r from-amber-400 to-yellow-500",
      ringColor: "border-amber-400",
      accentBg: "bg-amber-500/10",
      textColor: "text-amber-500",
      shadow: "shadow-amber-500/20",
      title: "Gold Champion",
    },
    {
      rank: 2,
      badge: "🥈 Rank 2",
      badgeBg: "bg-gradient-to-r from-slate-300 to-slate-400",
      ringColor: "border-slate-300",
      accentBg: "bg-slate-400/10",
      textColor: "text-slate-600",
      shadow: "shadow-slate-400/20",
      title: "Silver Star",
    },
    {
      rank: 3,
      badge: "🥉 Rank 3",
      badgeBg: "bg-gradient-to-r from-amber-600 to-amber-700",
      ringColor: "border-amber-600",
      accentBg: "bg-amber-700/10",
      textColor: "text-amber-700",
      shadow: "shadow-amber-700/20",
      title: "Bronze Achiever",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#f0f3ff] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1D1B67]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D91C24]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-jbc relative z-10">
        <SectionHeading
          eyebrow="Hall of Fame"
          title="Top 3 Quiz Champions"
          description="Celebrating our top-performing students across all chapters and quizzes. Score high and earn your spot here!"
        />

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1D1B67]" />
          </div>
        ) : top3.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center max-w-xl mx-auto shadow-sm border border-gray-100">
            <FiAward size={48} className="mx-auto text-amber-500 mb-4" />
            <h3 className="text-xl font-bold text-[#1D1B67]">Be the First Champion!</h3>
            <p className="text-gray-500 text-sm mt-2">
              No quiz scores recorded yet. Take your first quiz today and claim the #1 rank!
            </p>
            <Link
              href="/quiz"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D91C24] text-white font-bold text-sm hover:bg-[#b9161d] transition"
            >
              Start Quiz Now <FiChevronRight />
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
            {top3.map((student, index) => {
              const medal = medals[index] || medals[2];
              const isFirst = index === 0;

              return (
                <motion.div
                  key={student._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`relative rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between border-2 transition-all duration-300 hover:-translate-y-2 shadow-xl ${
                    isFirst
                      ? "border-amber-400 shadow-amber-400/20 md:-mt-4 md:mb-4 bg-gradient-to-b from-amber-50/50 to-white"
                      : "border-gray-100 shadow-gray-200/50"
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black text-white shadow-sm ${medal.badgeBg}`}
                    >
                      {medal.badge}
                    </span>

                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      {medal.title}
                    </span>
                  </div>

                  {/* Avatar & Info */}
                  <div className="text-center my-6">
                    <div className="relative inline-block">
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-lg mx-auto ${
                          isFirst ? "bg-[#1D1B67] ring-4 ring-amber-400" : "bg-[#1D1B67]/90 ring-4 ring-gray-100"
                        }`}
                      >
                        {student.studentName?.charAt(0).toUpperCase() || "S"}
                      </div>
                      {isFirst && (
                        <span className="absolute -top-3 -right-1 text-2xl animate-bounce">
                          👑
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-xl font-black text-[#1D1B67] truncate">
                      {student.studentName}
                    </h3>

                    <p className="text-xs font-semibold text-[#D91C24] mt-0.5">
                      {student.studentId || "JBC Student"}
                    </p>
                  </div>

                  {/* Score Highlights */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <FiStar className="text-amber-500" size={16} /> Total Score:
                      </span>
                      <span className="font-extrabold text-[#1D1B67] text-base">
                        {student.totalScore} pts
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <FiZap className="text-indigo-500" size={16} /> Quizzes Played:
                      </span>
                      <span className="font-bold text-[#1D1B67]">
                        {student.quizzesPlayed}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <FiCheckCircle className="text-emerald-500" size={16} /> Accuracy:
                      </span>
                      <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs">
                        {student.avgPercentage}%
                      </span>
                    </div>
                  </div>

                  {/* Footer ribbon */}
                  <div className="mt-6 text-center">
                    <span className="text-[11px] font-semibold text-gray-400">
                      Top Performer across all chapters
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Action Link */}
        <div className="mt-12 text-center">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1D1B67] text-white font-bold text-sm hover:bg-[#D91C24] transition-colors shadow-lg shadow-indigo-950/20"
          >
            Play Quiz & Join the Leaderboard <FiChevronRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
