"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiAward,
  FiCheckCircle,
  FiClock,
  FiLock,
  FiPlay,
  FiRefreshCw,
  FiShield,
  FiUser,
  FiXCircle,
  FiZap,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

export default function StudentDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, refreshUser } = useAuth();

  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [resultsData, setResultsData] = useState({ stats: null, results: [] });
  const [top3, setTop3] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const loadData = async () => {
    try {
      const [quizRes, resultRes, lbRes] = await Promise.all([
        api.getQuizzes(),
        api.getMyResults().catch(() => ({ stats: null, results: [] })),
        api.getLeaderboard().catch(() => ({ top3: [] })),
      ]);

      if (quizRes.success) setQuizzes(quizRes.data || []);
      if (resultRes.success) setResultsData(resultRes);
      if (lbRes.success) setTop3(lbRes.top3 || []);
    } catch (err) {
      console.error("Student dashboard load error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await refreshUser();
    await loadData();
  };

  if (authLoading || (loading && !user)) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-[#f8f9ff] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1D1B67] mx-auto" />
          <p className="mt-4 text-sm font-semibold text-gray-500">
            Loading student portal...
          </p>
        </div>
      </div>
    );
  }

  const isApproved = user?.quizAccessApproved === true;
  const status = user?.quizAccessStatus || (isApproved ? "approved" : "pending");
  const stats = resultsData.stats || {
    totalQuizzesPlayed: 0,
    totalScore: 0,
    highestScore: 0,
    overallPercentage: 0,
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#f8f9ff] px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* =========================================================
            STUDENT PROFILE & APPROVAL STATUS BANNER
        ========================================================= */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1D1B67]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* User Info */}
            <div className="flex items-start sm:items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1D1B67] text-white flex items-center justify-center text-2xl sm:text-3xl font-black shadow-lg shadow-indigo-950/20 shrink-0">
                {user?.name?.charAt(0).toUpperCase() || "S"}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#1D1B67]">
                    {user?.name}
                  </h1>
                  <span className="px-3 py-1 rounded-full bg-[#1D1B67]/10 text-[#1D1B67] text-xs font-black tracking-wide border border-[#1D1B67]/15">
                    {user?.studentId || "Student ID Pending"}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">{user?.email}</p>

                {/* Status Indicator */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-400">
                    Quiz Permission:
                  </span>
                  {isApproved ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200">
                      <FiCheckCircle /> Approved by Admin
                    </span>
                  ) : status === "rejected" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-black border border-red-200">
                      <FiXCircle /> Access Revoked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-black border border-amber-200 animate-pulse">
                      <FiClock /> Waiting for Admin Approval
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions & Refresh */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleManualRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-[#1D1B67] transition shadow-sm"
              >
                <FiRefreshCw className={refreshing ? "animate-spin" : ""} />
                {refreshing ? "Checking..." : "Refresh Approval Status"}
              </button>

              {isApproved ? (
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D91C24] hover:bg-[#b9161d] text-white text-xs font-bold transition shadow-lg shadow-red-900/20"
                >
                  <FiPlay /> Play Available Quizzes
                </Link>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-400 text-xs font-bold cursor-not-allowed">
                  <FiLock /> Quizzes Locked (Pending Approval)
                </div>
              )}
            </div>
          </div>

          {/* Alert Notice for Non-Approved Students */}
          {!isApproved && (
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-800 flex items-start gap-3">
              <FiShield className="shrink-0 text-amber-600 mt-0.5 text-lg" />
              <div>
                <strong className="font-bold">
                  Admin Approval Required for Quiz Access:
                </strong>{" "}
                Your account is registered with Student ID{" "}
                <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-300">
                  {user?.studentId}
                </span>
                . In order to play quizzes and record your scores on the leaderboard,
                the Admin must approve your access from the Admin Panel. Once approved,
                the quiz chapters will automatically unlock!
              </div>
            </div>
          )}
        </div>

        {/* =========================================================
            METRICS & PERFORMANCE CARDS
        ========================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-2xl bg-white p-5 sm:p-6 border border-gray-100 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Quizzes Played
            </span>
            <p className="mt-3 text-3xl sm:text-4xl font-black text-[#1D1B67]">
              {stats.totalQuizzesPlayed}
            </p>
            <p className="text-xs text-gray-500 mt-1">Total chapter attempts</p>
          </div>

          <div className="rounded-2xl bg-white p-5 sm:p-6 border border-gray-100 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Score
            </span>
            <p className="mt-3 text-3xl sm:text-4xl font-black text-[#D91C24]">
              {stats.totalScore}
            </p>
            <p className="text-xs text-gray-500 mt-1">Accumulated points</p>
          </div>

          <div className="rounded-2xl bg-white p-5 sm:p-6 border border-gray-100 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Highest Score
            </span>
            <p className="mt-3 text-3xl sm:text-4xl font-black text-amber-500">
              {stats.highestScore}
            </p>
            <p className="text-xs text-gray-500 mt-1">Best single quiz result</p>
          </div>

          <div className="rounded-2xl bg-white p-5 sm:p-6 border border-gray-100 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Average Accuracy
            </span>
            <p className="mt-3 text-3xl sm:text-4xl font-black text-emerald-600">
              {stats.overallPercentage}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Overall correctness</p>
          </div>
        </div>

        {/* =========================================================
            AVAILABLE CHAPTERS & QUIZZES
        ========================================================= */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#D91C24] uppercase tracking-wider">
                Chapters & Assignments
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1D1B67]">
                Available Quizzes & Tests
              </h2>
            </div>
            
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCategory === "All"
                    ? "bg-white text-[#1D1B67] shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                All ({quizzes.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("Chapters")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCategory === "Chapters"
                    ? "bg-[#D91C24] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Chapters
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("Assignments")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCategory === "Assignments"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Assignments
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {quizzes
              .filter((q) => {
                if (selectedCategory === "Chapters") {
                  return (
                    (q.category || "").toLowerCase().includes("chapter") ||
                    (q.chapterName || "").toLowerCase().includes("chapter")
                  );
                }
                if (selectedCategory === "Assignments") {
                  return (
                    (q.category || "").toLowerCase().includes("assign") ||
                    (q.chapterName || "").toLowerCase().includes("assign")
                  );
                }
                return true;
              })
              .map((quiz) => {
                const isAssignment =
                  (quiz.category || "").toLowerCase().includes("assign") ||
                  (quiz.chapterName || "").toLowerCase().includes("assign");

                return (
                  <div
                    key={quiz._id}
                    className={`rounded-2xl border p-5 hover:border-[#1D1B67]/30 transition-all flex flex-col justify-between bg-gradient-to-b from-gray-50/50 to-white ${
                      isAssignment ? "border-emerald-100" : "border-gray-100"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            isAssignment
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-[#1D1B67]/10 text-[#1D1B67]"
                          }`}
                        >
                          {quiz.chapterName || (isAssignment ? "Assignment" : "Chapter")}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-400">
                          {quiz.totalQuestions} Questions
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base text-[#1D1B67]">
                        {quiz.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                        {quiz.description || "Test your practical computer concepts."}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-medium">
                        ⏱️ {quiz.durationMinutes || 15} mins
                      </span>

                      {isApproved ? (
                        <Link
                          href={`/quiz?id=${quiz._id}`}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold transition shadow-sm ${
                            isAssignment
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : "bg-[#D91C24] hover:bg-[#b9161d]"
                          }`}
                        >
                          <FiPlay size={13} /> Attempt {isAssignment ? "Assignment" : "Quiz"}
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gray-100 text-gray-400 text-xs font-bold">
                          <FiLock size={12} /> Locked
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* =========================================================
            STUDENT QUIZ HISTORY & SCORES
        ========================================================= */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-[#D91C24] uppercase tracking-wider">
                Progress Record
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1D1B67]">
                My Quiz History & Results
              </h2>
            </div>
          </div>

          {resultsData.results.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
              <FiAward size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-base font-bold text-gray-700">
                No Quiz History Yet
              </p>
              <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                {isApproved
                  ? "Choose an available quiz above and attempt it to record your scores here!"
                  : "Once the Admin approves your quiz access, play any quiz to see your scores here."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400 font-bold">
                    <th className="pb-3 px-3">Date</th>
                    <th className="pb-3 px-3">Chapter / Title</th>
                    <th className="pb-3 px-3">Score</th>
                    <th className="pb-3 px-3">Percentage</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {resultsData.results.map((r) => (
                    <tr key={r._id} className="hover:bg-gray-50/70 transition">
                      <td className="py-4 px-3 text-xs text-gray-500 font-medium">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-3">
                        <span className="block text-xs font-bold text-[#1D1B67]">
                          {r.chapterName}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {r.quizTitle}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <span className="font-extrabold text-[#1D1B67]">
                          {r.score}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          {" "}
                          / {r.totalQuestions}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <span className="font-extrabold text-sm text-[#D91C24]">
                          {r.percentage}%
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        {r.passed ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                            Passed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-bold">
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedResult(r)}
                          className="px-3 py-1 rounded-lg border border-gray-200 hover:border-[#1D1B67] text-xs font-bold text-[#1D1B67] transition"
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

        {/* =========================================================
            ANSWER REVIEW MODAL
        ========================================================= */}
        {selectedResult && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
              <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#D91C24] uppercase">
                    Quiz Review
                  </span>
                  <h3 className="text-xl font-black text-[#1D1B67] mt-1">
                    {selectedResult.chapterName}: {selectedResult.quizTitle}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Score: {selectedResult.score} / {selectedResult.totalQuestions} (
                    {selectedResult.percentage}%)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedResult(null)}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {selectedResult.answers?.map((ans, idx) => (
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
                    <div className="mt-2.5 space-y-1">
                      <p>
                        <span className="font-semibold text-gray-500">
                          Your Answer:
                        </span>{" "}
                        <span
                          className={`font-bold ${
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
                          <span className="font-bold text-emerald-700">
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
                  onClick={() => setSelectedResult(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#1D1B67] text-white text-xs font-bold hover:bg-[#D91C24] transition"
                >
                  Close Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
