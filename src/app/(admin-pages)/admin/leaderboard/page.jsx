"use client";

import { useEffect, useState } from "react";
import {
  FiAward,
  FiCheckCircle,
  FiEye,
  FiRefreshCw,
  FiStar,
  FiZap,
} from "react-icons/fi";
import { api } from "@/lib/api";
import PageTitle from "@/components/admin/PageTitle";

export default function AdminLeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState({
    top3: [],
    leaderboard: [],
  });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("leaderboard"); // "leaderboard" | "submissions"
  const [viewSubmission, setViewSubmission] = useState(null);

  const loadData = async () => {
    try {
      const [lbRes, subRes] = await Promise.all([
        api.getLeaderboard().catch(() => ({ top3: [], leaderboard: [] })),
        api.getAllResults().catch(() => ({ data: [] })),
      ]);

      if (lbRes.success) setLeaderboardData(lbRes);
      if (subRes.success) setSubmissions(subRes.data || []);
    } catch (err) {
      console.error("Leaderboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-4 sm:p-7 space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageTitle
          title="Top Scorers & Quiz Results"
          description="View Top 3 champions across all chapters, full student rankings, and all submitted quiz papers."
        />
        <button
          type="button"
          onClick={loadData}
          className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1D1B67] flex items-center gap-1.5 shadow-sm"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("leaderboard")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "leaderboard"
              ? "bg-[#1D1B67] text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <FiAward /> Top 3 Champions & Rankings
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("submissions")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "submissions"
              ? "bg-[#1D1B67] text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <FiCheckCircle /> Student Submissions Log ({submissions.length})
        </button>
      </div>

      {activeTab === "leaderboard" && (
        <div className="space-y-7">
          {/* TOP 3 PODIUM */}
          <div className="grid md:grid-cols-3 gap-5">
            {leaderboardData.top3 && leaderboardData.top3.length > 0 ? (
              leaderboardData.top3.map((champ, idx) => {
                const styles = [
                  {
                    rankBadge: "🥇 Rank 1 - Gold Champion",
                    border: "border-amber-400 bg-gradient-to-b from-amber-50 to-white",
                    halo: "ring-4 ring-amber-300",
                    pointsColor: "text-amber-600",
                  },
                  {
                    rankBadge: "🥈 Rank 2 - Silver Star",
                    border: "border-slate-300 bg-gradient-to-b from-slate-50 to-white",
                    halo: "ring-4 ring-slate-200",
                    pointsColor: "text-slate-600",
                  },
                  {
                    rankBadge: "🥉 Rank 3 - Bronze Achiever",
                    border: "border-amber-700 bg-gradient-to-b from-amber-50/40 to-white",
                    halo: "ring-4 ring-amber-600/30",
                    pointsColor: "text-amber-700",
                  },
                ];
                const s = styles[idx] || styles[2];

                return (
                  <div
                    key={champ._id || idx}
                    className={`rounded-3xl border-2 p-6 text-center shadow-lg transition hover:-translate-y-1 ${s.border}`}
                  >
                    <span className="text-xs font-black tracking-wider uppercase inline-block">
                      {s.rankBadge}
                    </span>

                    <div
                      className={`w-20 h-20 rounded-full bg-[#1D1B67] text-white flex items-center justify-center text-2xl font-black mx-auto my-4 shadow-md ${s.halo}`}
                    >
                      {champ.studentName?.charAt(0) || "S"}
                    </div>

                    <h3 className="text-lg font-black text-[#101828]">
                      {champ.studentName}
                    </h3>
                    <p className="text-xs font-mono font-bold text-gray-500 mt-0.5">
                      {champ.studentId}
                    </p>

                    <div className="mt-5 pt-4 border-t border-gray-100 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Total Score:</span>
                        <span className={`font-black text-lg ${s.pointsColor}`}>
                          {champ.totalScore} pts
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Average Accuracy:</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {champ.avgPercentage}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Quizzes Taken:</span>
                        <span className="font-bold text-gray-800">
                          {champ.quizzesPlayed}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-center p-8 bg-white rounded-2xl border border-gray-100 text-xs text-gray-400">
                No leaderboard data recorded yet.
              </div>
            )}
          </div>

          {/* FULL LEADERBOARD TABLE */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-black text-base text-[#101828]">
                Complete Overall Student Rankings
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70 text-gray-500 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Rank</th>
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Student ID</th>
                    <th className="py-3.5 px-4">Quizzes Played</th>
                    <th className="py-3.5 px-4">Accuracy Rate</th>
                    <th className="py-3.5 px-4 text-right">Total Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leaderboardData.leaderboard?.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50/60 transition"
                    >
                      <td className="py-3.5 px-4 font-black text-sm">
                        {item.rank === 1
                          ? "🥇 #1"
                          : item.rank === 2
                          ? "🥈 #2"
                          : item.rank === 3
                          ? "🥉 #3"
                          : `#${item.rank}`}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-sm text-[#101828]">
                        {item.studentName}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-gray-600">
                        {item.studentId}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-700">
                        {item.quizzesPlayed}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {item.avgPercentage}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-sm text-[#D91C24]">
                        {item.totalScore} pts
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: SUBMISSIONS LOG
      ========================================================= */}
      {activeTab === "submissions" && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-black text-base text-[#101828]">
              All Student Quiz Papers Submitted ({submissions.length})
            </h3>
          </div>

          {submissions.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-400">
              No quiz submissions logged yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70 text-gray-500 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Submitted Date</th>
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Chapter / Quiz Title</th>
                    <th className="py-3.5 px-4">Score</th>
                    <th className="py-3.5 px-4">Percentage</th>
                    <th className="py-3.5 px-4">Result</th>
                    <th className="py-3.5 px-4 text-right">Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {submissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-gray-50/60 transition">
                      <td className="py-3.5 px-4 text-gray-500">
                        {new Date(sub.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#101828]">
                          {sub.studentName}
                        </span>
                        <span className="block text-[11px] text-gray-400 font-mono">
                          {sub.studentId}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#1D1B67]">
                          {sub.chapterName}
                        </span>
                        <span className="block text-[11px] text-gray-400">
                          {sub.quizTitle}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-black text-[#101828]">
                        {sub.score} / {sub.totalQuestions}
                      </td>
                      <td className="py-3.5 px-4 font-black text-[#D91C24]">
                        {sub.percentage}%
                      </td>
                      <td className="py-3.5 px-4">
                        {sub.passed ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                            Passed
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 font-bold">
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setViewSubmission(sub)}
                          className="px-3 py-1 rounded-lg border border-gray-200 text-xs font-bold text-[#1D1B67] hover:border-[#1D1B67] transition"
                        >
                          View Answers
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Answer Inspection Modal */}
      {viewSubmission && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-bold text-[#D91C24] uppercase">
                  Submission Paper
                </span>
                <h3 className="text-xl font-black text-[#1D1B67] mt-1">
                  {viewSubmission.studentName} ({viewSubmission.studentId})
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Quiz: {viewSubmission.chapterName} - {viewSubmission.quizTitle} • Score:{" "}
                  {viewSubmission.score}/{viewSubmission.totalQuestions} (
                  {viewSubmission.percentage}%)
                </p>
              </div>

              <button
                type="button"
                onClick={() => setViewSubmission(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {viewSubmission.answers?.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                    ans.isCorrect
                      ? "border-emerald-200 bg-emerald-50/30"
                      : "border-red-200 bg-red-50/30"
                  }`}
                >
                  <p className="font-bold text-[#1D1B67]">
                    {idx + 1}. {ans.questionText}
                  </p>
                  <div className="mt-2 space-y-1 text-xs">
                    <p>
                      <span className="font-semibold text-gray-500">
                        Student Answer:
                      </span>{" "}
                      <span
                        className={`font-black ${
                          ans.isCorrect ? "text-emerald-700" : "text-red-600"
                        }`}
                      >
                        {ans.selectedOption}
                      </span>
                    </p>
                    {!ans.isCorrect && (
                      <p>
                        <span className="font-semibold text-gray-500">
                          Correct Answer:
                        </span>{" "}
                        <span className="font-black text-emerald-700">
                          {ans.correctOption}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-right">
              <button
                type="button"
                onClick={() => setViewSubmission(null)}
                className="px-6 py-2.5 rounded-xl bg-[#1D1B67] text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
