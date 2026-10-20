"use client";

import { useEffect, useState } from "react";
import {
  FiHelpCircle,
  FiPlus,
  FiFileText,
  FiTrash2,
  FiSave,
  FiCheck,
  FiRefreshCw,
  FiUploadCloud,
  FiEye,
  FiFolder,
} from "react-icons/fi";
import { api } from "@/lib/api";
import PageTitle from "@/components/admin/PageTitle";

const sampleJsonTemplate = JSON.stringify(
  {
    title: "Operating Systems & Windows 11 Basics",
    chapterName: "Chapter 4: Operating Systems",
    category: "RS-CIT",
    description: "Learn about files, folders, shortcuts, and task manager.",
    durationMinutes: 10,
    passingPercentage: 40,
    questions: [
      {
        question: "What is the primary function of an operating system?",
        options: [
          "Manage computer hardware and software resources",
          "Design graphics",
          "Play audio files only",
          "Create excel sheets only",
        ],
        answer: "Manage computer hardware and software resources",
        explanation: "An OS acts as an intermediary between user and computer hardware.",
      },
      {
        question: "Which shortcut key is used to open Task Manager directly?",
        options: ["Ctrl + Shift + Esc", "Alt + F4", "Ctrl + P", "Win + L"],
        answer: "Ctrl + Shift + Esc",
        explanation: "Ctrl + Shift + Esc directly opens the Windows Task Manager.",
      },
    ],
  },
  null,
  2
);

export default function AdminQuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("form"); // "form" | "json" | "list"
  const [notification, setNotification] = useState("");
  const [previewQuiz, setPreviewQuiz] = useState(null);

  // Form State
  const [quizForm, setQuizForm] = useState({
    title: "",
    chapterName: "Chapter 1: Basics",
    category: "Computer Basics",
    description: "",
    durationMinutes: 15,
    passingPercentage: 40,
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
        explanation: "",
      },
    ],
  });

  // JSON Import State
  const [jsonInput, setJsonInput] = useState(sampleJsonTemplate);
  const [jsonImporting, setJsonImporting] = useState(false);

  const loadQuizzes = async () => {
    try {
      const res = await api.getAdminQuizzes();
      if (res.success && res.data) {
        setQuizzes(res.data);
      }
    } catch (err) {
      console.error("Failed to load quizzes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  // Form question helpers
  const handleAddQuestion = () => {
    setQuizForm((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { question: "", options: ["", "", "", ""], answer: "", explanation: "" },
      ],
    }));
  };

  const handleRemoveQuestion = (idx) => {
    if (quizForm.questions.length <= 1) {
      alert("At least one question is required!");
      return;
    }
    setQuizForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== idx),
    }));
  };

  const handleQuestionChange = (idx, field, value) => {
    setQuizForm((prev) => {
      const updated = [...prev.questions];
      updated[idx][field] = value;
      return { ...prev, questions: updated };
    });
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    setQuizForm((prev) => {
      const updated = [...prev.questions];
      const newOpts = [...updated[qIdx].options];
      newOpts[optIdx] = value;
      updated[qIdx].options = newOpts;
      return { ...prev, questions: updated };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setNotification("");

    // Validate that each question has an answer
    for (let i = 0; i < quizForm.questions.length; i++) {
      const q = quizForm.questions[i];
      if (!q.answer) {
        alert(`Please select the correct answer for Question #${i + 1}`);
        return;
      }
    }

    try {
      const res = await api.createQuiz(quizForm);
      if (res.success) {
        setNotification(res.message || "Quiz created successfully!");
        setQuizForm({
          title: "",
          chapterName: "Chapter 1: Basics",
          category: "Computer Basics",
          description: "",
          durationMinutes: 15,
          passingPercentage: 40,
          questions: [
            {
              question: "",
              options: ["", "", "", ""],
              answer: "",
              explanation: "",
            },
          ],
        });
        loadQuizzes();
        setActiveTab("list");
      }
    } catch (err) {
      alert(err.message || "Failed to create quiz");
    }
  };

  // JSON Import Helper
  const handleJsonImport = async () => {
    setJsonImporting(true);
    setNotification("");

    try {
      const res = await api.importQuizJson(null, jsonInput);
      if (res.success) {
        setNotification(res.message);
        loadQuizzes();
        setActiveTab("list");
      }
    } catch (err) {
      alert(err.message || "Failed to import from JSON");
    } finally {
      setJsonImporting(false);
    }
  };

  // File Upload Helper
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        // Verify valid JSON
        JSON.parse(text);
        setJsonInput(text);
      } catch (err) {
        alert("Invalid JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteQuiz = async (id) => {
    if (!confirm("Are you sure you want to delete this quiz chapter?")) return;
    try {
      await api.deleteQuiz(id);
      loadQuizzes();
      setNotification("Quiz deleted successfully.");
    } catch (err) {
      alert(err.message || "Failed to delete quiz");
    }
  };

  return (
    <div className="p-4 sm:p-7 space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageTitle
          title="Quiz Management & Question Creator"
          description="Create chapter-wise quizzes through the form builder or upload/import questions directly via JSON."
        />
        <button
          type="button"
          onClick={loadQuizzes}
          className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1D1B67] flex items-center gap-1.5 shadow-sm"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh Quizzes
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
          <FiCheck className="text-emerald-600" />
          {notification}
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("form")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "form"
              ? "bg-[#1D1B67] text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <FiPlus /> Add Quiz via Form
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("json")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "json"
              ? "bg-[#1D1B67] text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <FiUploadCloud /> Import via JSON File
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === "list"
              ? "bg-[#1D1B67] text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <FiFolder /> Existing Quizzes ({quizzes.length})
        </button>
      </div>

      {/* =========================================================
          TAB 1: FORM BUILDER
      ========================================================= */}
      {activeTab === "form" && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h2 className="text-base font-black text-[#1D1B67]">
            📝 Create Chapter Quiz
          </h2>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Chapter Name / Number *
                </label>
                <input
                  type="text"
                  required
                  value={quizForm.chapterName}
                  onChange={(e) =>
                    setQuizForm({ ...quizForm, chapterName: e.target.value })
                  }
                  placeholder="e.g. Chapter 1: Computer Basics"
                  className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  required
                  value={quizForm.title}
                  onChange={(e) =>
                    setQuizForm({ ...quizForm, title: e.target.value })
                  }
                  placeholder="e.g. Computer Fundamentals & Architecture"
                  className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Course Category
                </label>
                <input
                  type="text"
                  value={quizForm.category}
                  onChange={(e) =>
                    setQuizForm({ ...quizForm, category: e.target.value })
                  }
                  placeholder="e.g. RS-CIT, Tally Prime, Web Dev"
                  className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Quiz Description
                </label>
                <input
                  type="text"
                  value={quizForm.description}
                  onChange={(e) =>
                    setQuizForm({ ...quizForm, description: e.target.value })
                  }
                  placeholder="Short description of what this chapter quiz covers"
                  className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Time Limit (Minutes)
                </label>
                <input
                  type="number"
                  value={quizForm.durationMinutes}
                  onChange={(e) =>
                    setQuizForm({
                      ...quizForm,
                      durationMinutes: parseInt(e.target.value) || 15,
                    })
                  }
                  className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
                />
              </div>
            </div>

            {/* Questions List Builder */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#1D1B67]">
                  Questions ({quizForm.questions.length})
                </h3>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 text-[#1D1B67] hover:bg-indigo-100 text-xs font-bold transition flex items-center gap-1"
                >
                  <FiPlus /> Add Another Question
                </button>
              </div>

              {quizForm.questions.map((q, qIdx) => (
                <div
                  key={qIdx}
                  className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#D91C24] uppercase">
                      Question #{qIdx + 1}
                    </span>
                    {quizForm.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(qIdx)}
                        className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1"
                      >
                        <FiTrash2 size={13} /> Remove
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Question Prompt *
                    </label>
                    <input
                      type="text"
                      required
                      value={q.question}
                      onChange={(e) =>
                        handleQuestionChange(qIdx, "question", e.target.value)
                      }
                      placeholder="e.g. Which of the following is volatile memory?"
                      className="w-full text-xs rounded-xl border border-gray-200 p-2.5 bg-white outline-none focus:border-[#1D1B67]"
                    />
                  </div>

                  {/* 4 Options */}
                  <div className="grid sm:grid-cols-2 gap-3 pt-1">
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx}>
                        <label className="block text-[10px] font-bold text-gray-500 mb-1">
                          Option {String.fromCharCode(65 + optIdx)} *
                        </label>
                        <input
                          type="text"
                          required
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(qIdx, optIdx, e.target.value)
                          }
                          placeholder={`Option ${String.fromCharCode(65 + optIdx)} text`}
                          className="w-full text-xs rounded-xl border border-gray-200 p-2.5 bg-white outline-none focus:border-[#1D1B67]"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Select Correct Answer */}
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-700 mb-1">
                        Select Correct Answer *
                      </label>
                      <select
                        required
                        value={q.answer}
                        onChange={(e) =>
                          handleQuestionChange(qIdx, "answer", e.target.value)
                        }
                        className="w-full text-xs rounded-xl border border-emerald-300 p-2.5 bg-white outline-none focus:border-emerald-500 font-bold text-emerald-800"
                      >
                        <option value="">-- Choose which option is correct --</option>
                        {q.options.map((opt, optIdx) => (
                          <option key={optIdx} value={opt} disabled={!opt}>
                            {opt
                              ? `Option ${String.fromCharCode(65 + optIdx)}: ${opt}`
                              : `Option ${String.fromCharCode(65 + optIdx)} (Fill text above first)`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Explanation (Optional)
                      </label>
                      <input
                        type="text"
                        value={q.explanation}
                        onChange={(e) =>
                          handleQuestionChange(qIdx, "explanation", e.target.value)
                        }
                        placeholder="Why this answer is correct"
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 bg-white outline-none focus:border-[#1D1B67]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
              >
                + Add Another Question
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-[#D91C24] hover:bg-[#b9161d] text-white text-xs font-black shadow-lg shadow-red-900/20 transition flex items-center gap-2"
              >
                <FiSave /> Publish Chapter Quiz
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================================================
          TAB 2: JSON IMPORT
      ========================================================= */}
      {activeTab === "json" && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-black text-[#1D1B67]">
                📁 Import Questions via JSON
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                You can upload a <code>.json</code> file or paste JSON code directly.
              </p>
            </div>

            {/* File Upload Button */}
            <label className="px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-700 cursor-pointer flex items-center gap-2 transition">
              <FiUploadCloud size={16} /> Choose .JSON File
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-700">
                JSON Content
              </label>
              <button
                type="button"
                onClick={() => setJsonInput(sampleJsonTemplate)}
                className="text-[11px] font-bold text-[#1D1B67] hover:underline"
              >
                Reset to Sample Template
              </button>
            </div>

            <textarea
              rows={15}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full font-mono text-xs p-4 rounded-xl border border-gray-200 bg-gray-900 text-emerald-400 outline-none focus:border-[#1D1B67]"
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handleJsonImport}
              disabled={jsonImporting}
              className="px-8 py-3 rounded-xl bg-[#1D1B67] hover:bg-[#15144f] text-white text-xs font-black shadow-lg transition flex items-center gap-2"
            >
              <FiCheck />{" "}
              {jsonImporting ? "Importing..." : "Import Quiz from JSON"}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: EXISTING QUIZZES LIST
      ========================================================= */}
      {activeTab === "list" && (
        <div className="space-y-4">
          <h2 className="text-base font-black text-[#1D1B67]">
            Published Chapter Quizzes ({quizzes.length})
          </h2>

          {quizzes.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-100 text-xs text-gray-400">
              No quizzes added yet. Use the Form or JSON import above to create quizzes!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1D1B67]/10 text-[#1D1B67] text-[10px] font-black uppercase">
                        {quiz.chapterName}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-400">
                        {quiz.category}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-[#101828]">
                      {quiz.title}
                    </h3>

                    <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                      {quiz.description || "No description provided."}
                    </p>

                    <div className="mt-3 flex items-center gap-3 text-xs text-gray-400 font-semibold">
                      <span>📝 {quiz.questions?.length || 0} Questions</span>
                      <span>⏱️ {quiz.durationMinutes || 15} Mins</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setPreviewQuiz(quiz)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1D1B67] hover:underline"
                    >
                      <FiEye size={13} /> View Questions
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteQuiz(quiz._id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Delete Quiz"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Question Preview Modal */}
      {previewQuiz && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-bold text-[#D91C24] uppercase">
                  {previewQuiz.chapterName}
                </span>
                <h3 className="text-xl font-black text-[#1D1B67] mt-1">
                  {previewQuiz.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {previewQuiz.questions?.length || 0} Questions Total
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewQuiz(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {previewQuiz.questions?.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-xs sm:text-sm space-y-2"
                >
                  <p className="font-bold text-[#1D1B67]">
                    {idx + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    {q.options?.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-2 rounded-lg ${
                          opt === q.answer
                            ? "bg-emerald-100 text-emerald-800 font-bold border border-emerald-300"
                            : "bg-white border border-gray-100"
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}{" "}
                        {opt === q.answer && "✓ (Correct)"}
                      </div>
                    ))}
                  </div>
                  {q.explanation && (
                    <p className="text-[11px] text-gray-500 italic mt-1">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 text-right">
              <button
                type="button"
                onClick={() => setPreviewQuiz(null)}
                className="px-6 py-2.5 rounded-xl bg-[#1D1B67] text-white text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
