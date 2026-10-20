"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiUsers,
  FiHelpCircle,
  FiAward,
  FiClock,
  FiCheckCircle,
  FiPlus,
  FiImage,
  FiBookOpen,
  FiRefreshCw,
  FiChevronRight,
} from "react-icons/fi";
import { api } from "@/lib/api";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState([]);
  const [leaderboard, setLeaderboard] = useState({ top3: [], leaderboard: [] });
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const loadDashboardData = async () => {
    try {
      const [studentsRes, quizzesRes, resultsRes, lbRes] = await Promise.all([
        api.getStudents().catch(() => ({ data: [] })),
        api.getAdminQuizzes().catch(() => ({ data: [] })),
        api.getAllResults().catch(() => ({ data: [] })),
        api.getLeaderboard().catch(() => ({ top3: [] })),
      ]);

      if (studentsRes.success) setStudents(studentsRes.data || []);
      if (quizzesRes.success) setQuizzes(quizzesRes.data || []);
      if (resultsRes.success) setResults(resultsRes.data || []);
      if (lbRes.success) setLeaderboard(lbRes);
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleApprove = async (studentId) => {
    setActionLoadingId(studentId);
    try {
      await api.updateStudentApproval(studentId, true, "approved");
      // Update local state
      setStudents((prev) =>
        prev.map((s) =>
          s._id === studentId
            ? { ...s, quizAccessApproved: true, quizAccessStatus: "approved" }
            : s
        )
      );
    } catch (err) {
      alert(err.message || "Approval failed");
    } finally {
      setActionLoadingId(null);
    }
  };

  const pendingStudents = students.filter(
    (s) => !s.quizAccessApproved && s.quizAccessStatus !== "rejected"
  );
  const totalStudents = students.length;
  const totalQuizzes = quizzes.length;
  const totalSubmissions = results.length;

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f8fafc] px-4 sm:px-7 py-7 space-y-7">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-[#D91C24] uppercase tracking-widest">
            JBC ADMIN CONSOLE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828] mt-1">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#667085]">
            Manage courses, student quiz approvals, chapters, and live leaderboards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadDashboardData}
            className="h-[38px] px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 shadow-sm transition"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh
          </button>

          <Link
            href="/admin/quiz"
            className="h-[38px] px-4 rounded-xl bg-[#1D1B67] hover:bg-[#15144f] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <FiPlus size={16} /> Add Quiz
          </Link>
        </div>
      </div>

      {/* =====================================================
          METRIC CARDS
      ====================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Students */}
        <div className="rounded-2xl border border-[#e7eaee] bg-white p-5 sm:p-6 shadow-[0_1px_3px_rgba(16,24,40,0.05)]">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FiUsers size={20} />
            </div>
            <span className="text-xs font-bold text-gray-400">Total</span>
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-black text-[#101828]">
            {totalStudents}
          </h2>
          <p className="mt-1 text-xs text-[#667085]">Registered Students</p>
        </div>

        {/* Pending Approvals */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5 sm:p-6 shadow-[0_1px_3px_rgba(16,24,40,0.05)]">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
              <FiClock size={20} />
            </div>
            {pendingStudents.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black animate-pulse">
                ACTION NEEDED
              </span>
            )}
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-black text-amber-700">
            {pendingStudents.length}
          </h2>
          <p className="mt-1 text-xs text-amber-800 font-semibold">
            Pending Quiz Approvals
          </p>
        </div>

        {/* Quizzes & Chapters */}
        <div className="rounded-2xl border border-[#e7eaee] bg-white p-5 sm:p-6 shadow-[0_1px_3px_rgba(16,24,40,0.05)]">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FiHelpCircle size={20} />
            </div>
            <span className="text-xs font-bold text-gray-400">Published</span>
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-black text-[#101828]">
            {totalQuizzes}
          </h2>
          <p className="mt-1 text-xs text-[#667085]">Active Quiz Chapters</p>
        </div>

        {/* Submissions */}
        <div className="rounded-2xl border border-[#e7eaee] bg-white p-5 sm:p-6 shadow-[0_1px_3px_rgba(16,24,40,0.05)]">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FiAward size={20} />
            </div>
            <span className="text-xs font-bold text-emerald-600">Results</span>
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-black text-[#101828]">
            {totalSubmissions}
          </h2>
          <p className="mt-1 text-xs text-[#667085]">Total Submissions</p>
        </div>
      </div>

      {/* =====================================================
          URGENT ACTION: PENDING STUDENT APPROVALS
      ====================================================== */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h2 className="text-base font-black text-[#101828]">
              Pending Student Quiz Approvals ({pendingStudents.length})
            </h2>
          </div>
          <Link
            href="/admin/students"
            className="text-xs font-bold text-[#1D1B67] hover:underline flex items-center gap-1"
          >
            Manage All Students <FiChevronRight />
          </Link>
        </div>

        {pendingStudents.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-400">
            <FiCheckCircle className="mx-auto text-emerald-500 mb-2" size={24} />
            All registered students have been processed! No pending approvals.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pendingStudents.map((st) => (
              <div
                key={st._id}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-amber-50/30 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1D1B67] text-white flex items-center justify-center font-bold text-sm">
                    {st.name?.charAt(0) || "S"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#101828]">
                        {st.name}
                      </p>
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-mono font-bold">
                        {st.studentId}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{st.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-full font-bold">
                    Pending Approval
                  </span>

                  <button
                    type="button"
                    onClick={() => handleApprove(st._id)}
                    disabled={actionLoadingId === st._id}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                  >
                    {actionLoadingId === st._id ? "Approving..." : "✓ Approve Quiz Access"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =====================================================
          TOP 3 CHAMPIONS & QUICK ACTIONS
      ====================================================== */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        {/* Top 3 Champions Across All Quizzes */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-xs font-black text-amber-600 uppercase tracking-wider">
                Overall Scorers
              </span>
              <h2 className="text-lg font-black text-[#101828]">
                Top 3 Quiz Champions
              </h2>
            </div>
            <Link
              href="/admin/leaderboard"
              className="text-xs font-bold text-[#1D1B67] hover:underline"
            >
              Full Leaderboard
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {leaderboard.top3 && leaderboard.top3.length > 0 ? (
              leaderboard.top3.map((champ, idx) => {
                const ranks = [
                  { label: "🥇 Rank 1", color: "border-amber-400 bg-amber-50/50" },
                  { label: "🥈 Rank 2", color: "border-slate-300 bg-slate-50/50" },
                  { label: "🥉 Rank 3", color: "border-amber-700 bg-amber-50/30" },
                ];
                const r = ranks[idx] || ranks[2];

                return (
                  <div
                    key={champ._id || idx}
                    className={`rounded-2xl border-2 p-5 text-center ${r.color}`}
                  >
                    <span className="text-xs font-black">{r.label}</span>
                    <div className="w-14 h-14 rounded-full bg-[#1D1B67] text-white flex items-center justify-center font-black text-lg mx-auto my-3 shadow">
                      {champ.studentName?.charAt(0) || "S"}
                    </div>
                    <h3 className="font-extrabold text-sm text-[#101828] truncate">
                      {champ.studentName}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                      {champ.studentId}
                    </p>

                    <div className="mt-3 pt-3 border-t border-gray-200/60 text-xs">
                      <span className="font-black text-[#D91C24] text-base">
                        {champ.totalScore} pts
                      </span>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {champ.avgPercentage}% accuracy • {champ.quizzesPlayed} tests
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-6 text-gray-400 text-xs">
                No leaderboard scores yet.
              </div>
            )}
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="rounded-2xl bg-[#1D1B67] p-6 text-white shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-black">Management Shortcuts</h2>
            <p className="text-xs text-white/70 mt-1">
              Direct access to key website sections.
            </p>

            <div className="mt-4 space-y-2">
              <Link
                href="/admin/hero"
                className="w-full py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold flex items-center gap-2.5 transition"
              >
                <FiImage size={16} /> Edit Hero Images & Text
              </Link>

              <Link
                href="/admin/courses"
                className="w-full py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold flex items-center gap-2.5 transition"
              >
                <FiBookOpen size={16} /> Add / Manage Popular Courses
              </Link>

              <Link
                href="/admin/quiz"
                className="w-full py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold flex items-center gap-2.5 transition"
              >
                <FiHelpCircle size={16} /> Create Quiz / Import JSON
              </Link>

              <Link
                href="/admin/students"
                className="w-full py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold flex items-center gap-2.5 transition"
              >
                <FiUsers size={16} /> Student Quiz Access Approvals
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-white/50 text-center">
            Jai Bhawani Computer Education Centre
          </div>
        </div>
      </div>
    </div>
  );
}
