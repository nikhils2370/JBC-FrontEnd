"use client";

import { useEffect, useState } from "react";
import {
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiSearch,
  FiTrash2,
  FiRefreshCw,
  FiShield,
  FiAward,
} from "react-icons/fi";
import { api } from "@/lib/api";
import PageTitle from "@/components/admin/PageTitle";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [filter, setFilter] = useState("all"); // "all" | "pending" | "approved"
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);

  const loadStudents = async () => {
    try {
      const res = await api.getStudents();
      if (res.success && res.data) {
        setStudents(res.data);
        setSelectedStudents([]);
      }
    } catch (err) {
      console.error("Failed to load students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSelectAll = (e, currentList) => {
    if (e.target.checked) {
      setSelectedStudents(currentList.map((s) => s._id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleApproval = async (studentId, approve) => {
    setActionLoadingId(studentId);
    setNotification("");

    try {
      const status = approve ? "approved" : "rejected";
      const res = await api.updateStudentApproval(studentId, approve, status);

      if (res.success) {
        setNotification(res.message);
        setStudents((prev) =>
          prev.map((s) =>
            s._id === studentId
              ? { ...s, quizAccessApproved: approve, quizAccessStatus: status }
              : s
          )
        );
      }
    } catch (err) {
      alert(err.message || "Failed to update student approval status");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (studentId, studentName) => {
    if (
      !confirm(
        `🎓 Course Complete: Kya aap sure hain ki "${studentName || "student"}" ka course complete ho chuka hai aur aap inka sara data (User account + quiz results) database se permanently delete karna chahte hain?`
      )
    )
      return;

    try {
      await api.deleteStudent(studentId);
      setStudents((prev) => prev.filter((s) => s._id !== studentId));
      setSelectedStudents((prev) => prev.filter((id) => id !== studentId));
      setNotification(`Student "${studentName}" ka course complete hone par sara data database se delete kar diya gaya.`);
    } catch (err) {
      alert(err.message || "Failed to delete student data");
    }
  };

  const handleBulkCourseCompletedPurge = async () => {
    if (selectedStudents.length === 0) return;

    if (
      !confirm(
        `🎓 Course Complete Purge: Kya aap selected ${selectedStudents.length} students ka course complete hone par unka aur unke sare quiz results ka data database se permanently delete karna chahte hain?`
      )
    ) {
      return;
    }

    setBulkLoading(true);
    try {
      const res = await api.bulkDeleteStudents(selectedStudents);
      if (res.success) {
        setNotification(
          `Successfully ${res.deletedCount || selectedStudents.length} completed students aur unke quiz results delete kar diye gaye!`
        );
        loadStudents();
      } else {
        alert(res.message || "Bulk purge failed");
      }
    } catch (err) {
      alert(err.message || "Error during course completed purge");
    } finally {
      setBulkLoading(false);
    }
  };

  const filteredStudents = students
    .filter((s) => {
      if (filter === "pending")
        return !s.quizAccessApproved && s.quizAccessStatus !== "rejected";
      if (filter === "approved") return s.quizAccessApproved;
      return true;
    })
    .filter((s) => {
      const q = search.toLowerCase();
      return (
        s.name?.toLowerCase().includes(q) ||
        s.studentId?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q)
      );
    });

  const pendingCount = students.filter(
    (s) => !s.quizAccessApproved && s.quizAccessStatus !== "rejected"
  ).length;

  return (
    <div className="p-4 sm:p-7 space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageTitle
          title="Student Quiz Access & Approvals"
          description="Grant or revoke quiz access permissions for students. Students cannot attempt quizzes until approved."
        />
        <button
          type="button"
          onClick={loadStudents}
          className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1D1B67] flex items-center gap-1.5 shadow-sm"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh List
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
          <FiCheckCircle className="text-emerald-600" />
          {notification}
        </div>
      )}

      {/* Control Bar: Filters & Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === "all"
                ? "bg-white text-[#1D1B67] shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            All Students ({students.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter("pending")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              filter === "pending"
                ? "bg-amber-500 text-white shadow-sm"
                : "text-amber-700 hover:text-amber-900"
            }`}
          >
            Pending Approvals ({pendingCount})
          </button>

          <button
            type="button"
            onClick={() => setFilter("approved")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === "approved"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Approved Only
          </button>
        </div>

        {/* Search & Bulk Action */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {selectedStudents.length > 0 && (
            <button
              type="button"
              onClick={handleBulkCourseCompletedPurge}
              disabled={bulkLoading}
              className="px-3.5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition flex items-center gap-1.5 shadow-sm"
              title="Delete all selected students and purge their quiz records upon course completion"
            >
              <FiAward /> Course Completed - Purge ({selectedStudents.length})
            </button>
          )}

          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID or email..."
              className="w-full text-xs rounded-xl border border-gray-200 pl-9 pr-4 py-2 outline-none focus:border-[#1D1B67]"
            />
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {filteredStudents.length === 0 ? (
          <div className="p-10 text-center text-xs text-gray-400">
            No students found matching your criteria.
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
                        filteredStudents.length > 0 &&
                        selectedStudents.length === filteredStudents.length
                      }
                      onChange={(e) => handleSelectAll(e, filteredStudents)}
                      className="rounded border-gray-300 text-[#1D1B67] focus:ring-[#1D1B67] cursor-pointer"
                      title="Select All"
                    />
                  </th>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Student ID</th>
                  <th className="py-3.5 px-4">Quizzes Played</th>
                  <th className="py-3.5 px-4">Total Score</th>
                  <th className="py-3.5 px-4">Quiz Permission</th>
                  <th className="py-3.5 px-4 text-right">Approval & Course Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((st) => {
                  const isApp = st.quizAccessApproved;
                  const isPending =
                    !isApp && st.quizAccessStatus !== "rejected";
                  const isSelected = selectedStudents.includes(st._id);

                  return (
                    <tr
                      key={st._id}
                      className={`transition ${
                        isSelected ? "bg-indigo-50/40" : "hover:bg-gray-50/60"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(st._id)}
                          className="rounded border-gray-300 text-[#1D1B67] focus:ring-[#1D1B67] cursor-pointer"
                        />
                      </td>

                      {/* Name & Contact */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#1D1B67] text-white flex items-center justify-center font-bold text-xs">
                            {st.name?.charAt(0) || "S"}
                          </div>
                          <div>
                            <p className="font-extrabold text-sm text-[#101828]">
                              {st.name}
                            </p>
                            <p className="text-[11px] text-gray-400">
                              {st.email} {st.phone ? `• ${st.phone}` : ""}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Student ID */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">
                          {st.studentId || "PENDING"}
                        </span>
                      </td>

                      {/* Quizzes played */}
                      <td className="py-3.5 px-4 font-bold text-gray-700">
                        {st.quizzesPlayed || 0}
                      </td>

                      {/* Total Score */}
                      <td className="py-3.5 px-4">
                        <span className="font-black text-sm text-[#D91C24]">
                          {st.totalScore || 0} pts
                        </span>
                      </td>

                      {/* Permission Badge */}
                      <td className="py-3.5 px-4">
                        {isApp ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                            <FiCheckCircle size={12} /> Approved
                          </span>
                        ) : isPending ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200 animate-pulse">
                            <FiClock size={12} /> Pending Approval
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-600 font-bold border border-red-200">
                            <FiXCircle size={12} /> Revoked
                          </span>
                        )}
                      </td>

                      {/* Action Button */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isApp ? (
                            <button
                              type="button"
                              onClick={() => handleToggleApproval(st._id, false)}
                              disabled={actionLoadingId === st._id}
                              className="px-2.5 py-1 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-bold transition text-xs"
                            >
                              Revoke
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleToggleApproval(st._id, true)}
                              disabled={actionLoadingId === st._id}
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-sm text-xs"
                            >
                              {actionLoadingId === st._id
                                ? "Processing..."
                                : "✓ Approve"}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDelete(st._id, st.name)}
                            className="px-2.5 py-1 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-bold transition text-xs flex items-center gap-1"
                            title="Course Completed: Delete student and clear all DB data"
                          >
                            <FiTrash2 size={12} /> Course Done (Del)
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
