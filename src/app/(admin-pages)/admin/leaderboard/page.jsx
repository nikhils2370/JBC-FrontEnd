"use client";

import { useEffect, useState } from "react";
import {
  FiAward,
  FiCheckCircle,
  FiDownload,
  FiEye,
  FiRefreshCw,
  FiStar,
  FiTrash2,
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
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("submissions"); // "leaderboard" | "submissions"
  const [viewSubmission, setViewSubmission] = useState(null);
  const [selectedSubmissions, setSelectedSubmissions] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);

  const loadData = async () => {
    try {
      const [lbRes, subRes] = await Promise.all([
        api.getLeaderboard().catch(() => ({ top3: [], leaderboard: [] })),
        api.getAllResults().catch(() => ({ data: [] })),
      ]);

      if (lbRes.success) setLeaderboardData(lbRes);
      if (subRes.success) {
        setSubmissions(subRes.data || []);
        setSelectedSubmissions([]);
      }
    } catch (err) {
      console.error("Leaderboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSubmissions(submissions.map((s) => s._id));
    } else {
      setSelectedSubmissions([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedSubmissions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSingle = async (id, studentName) => {
    if (
      !confirm(
        `Kya aap sure hain ki "${studentName || "student"}" ka ye quiz result delete karna chahte hain? DB se space free ho jayegi.`
      )
    ) {
      return;
    }
    setActionLoading(true);
    try {
      const res = await api.deleteQuizResult(id);
      if (res.success) {
        setStatusMessage({ type: "success", text: "Result delete ho gaya aur DB space free ho gayi!" });
        loadData();
      } else {
        alert(res.message || "Delete fail ho gaya");
      }
    } catch (err) {
      alert("Delete karne me error: " + err.message);
    } finally {
      setActionLoading(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedSubmissions.length === 0) return;
    if (
      !confirm(
        `Kya aap selected ${selectedSubmissions.length} quiz results ko delete karna chahte hain? Isse DB me space khali hogi.`
      )
    ) {
      return;
    }
    setActionLoading(true);
    try {
      const res = await api.bulkDeleteQuizResults(selectedSubmissions);
      if (res.success) {
        setStatusMessage({
          type: "success",
          text: `${res.deletedCount || selectedSubmissions.length} quiz results successfully delete ho gaye!`,
        });
        loadData();
      } else {
        alert(res.message || "Bulk delete fail ho gaya");
      }
    } catch (err) {
      alert("Bulk delete me error: " + err.message);
    } finally {
      setActionLoading(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleClearAll = async () => {
    if (submissions.length === 0) return;
    if (
      !confirm(
        "⚠️ WARNING: Kya aap SARE student quiz results delete karna chahte hain? Ye action undo nahi ho sakti. Database ka space completely free ho jayega."
      )
    ) {
      return;
    }
    setActionLoading(true);
    try {
      const res = await api.clearAllQuizResults();
      if (res.success) {
        setStatusMessage({
          type: "success",
          text: `All ${res.deletedCount || 0} quiz results database se delete ho gaye!`,
        });
        loadData();
      } else {
        alert(res.message || "Clear all fail ho gaya");
      }
    } catch (err) {
      alert("Clear all me error: " + err.message);
    } finally {
      setActionLoading(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleDownload = async (format) => {
    try {
      await api.downloadResultsExport(format);
      setStatusMessage({
        type: "success",
        text: `Quiz results ${format.toUpperCase()} file download ho rahi hai!`,
      });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      alert(`Export error: ${err.message}`);
      // console.log(err);
      
    }
  };

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

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold border flex items-center justify-between shadow-sm animate-fade-in ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <span>{statusMessage.text}</span>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-xs font-bold px-2 py-0.5 rounded hover:bg-black/5"
          >
            ✕
          </button>
        </div>
      )}

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
          {/* Action Toolbar */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-gray-50/50 to-white">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base text-[#101828]">
                  Student Quiz Papers Submitted ({submissions.length})
                </h3>
                {selectedSubmissions.length > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1D1B67] text-white">
                    {selectedSubmissions.length} Selected
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage, export for backup, or delete quiz results to keep database storage free.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleDownload("csv")}
                disabled={submissions.length === 0}
                className="px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition flex items-center gap-1.5 disabled:opacity-50"
                title="Download all quiz results as CSV spreadsheet"
              >
                <FiDownload /> Download CSV
              </button>

              <button
                type="button"
                onClick={() => handleDownload("json")}
                disabled={submissions.length === 0}
                className="px-3 py-1.5 rounded-xl border border-blue-300 bg-blue-50 text-blue-800 text-xs font-bold hover:bg-blue-100 transition flex items-center gap-1.5 disabled:opacity-50"
                title="Download all quiz results as JSON backup"
              >
                <FiDownload /> Download JSON
              </button>

              {selectedSubmissions.length > 0 && (
                <button
                  type="button"
                  onClick={handleBulkDelete}
                  disabled={actionLoading}
                  className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition flex items-center gap-1.5 shadow-sm"
                >
                  <FiTrash2 /> Delete Selected ({selectedSubmissions.length})
                </button>
              )}

              <button
                type="button"
                onClick={handleClearAll}
                disabled={submissions.length === 0 || actionLoading}
                className="px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition flex items-center gap-1.5 disabled:opacity-50"
                title="Permanently remove all submissions to free maximum DB space"
              >
                <FiTrash2 /> Clear All
              </button>
            </div>
          </div>

          {submissions.length === 0 ? (
            <div className="p-12 text-center text-xs text-gray-400">
              No quiz submissions logged in the database yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70 text-gray-500 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4 w-10">
                      <input
                        type="checkbox"
                        checked={
                          submissions.length > 0 &&
                          selectedSubmissions.length === submissions.length
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#1D1B67] focus:ring-[#1D1B67] cursor-pointer"
                        title="Select All"
                      />
                    </th>
                    <th className="py-3.5 px-4">Submitted Date</th>
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Chapter / Quiz Title</th>
                    <th className="py-3.5 px-4">Score</th>
                    <th className="py-3.5 px-4">Percentage</th>
                    <th className="py-3.5 px-4">Result</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {submissions.map((sub) => {
                    const isSelected = selectedSubmissions.includes(sub._id);
                    return (
                      <tr
                        key={sub._id}
                        className={`transition ${
                          isSelected ? "bg-indigo-50/40" : "hover:bg-gray-50/60"
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(sub._id)}
                            className="rounded border-gray-300 text-[#1D1B67] focus:ring-[#1D1B67] cursor-pointer"
                          />
                        </td>
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
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => setViewSubmission(sub)}
                            className="px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-bold text-[#1D1B67] hover:border-[#1D1B67] transition"
                            title="View student answer sheet"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteSingle(sub._id, sub.studentName)
                            }
                            className="px-2 py-1 rounded-lg border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 transition"
                            title="Delete result to save DB space"
                          >
                            <FiTrash2 className="inline text-xs" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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
