"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiLock,
  FiLogIn,
  FiPlay,
  FiRefreshCw,
  FiShield,
  FiUser,
  FiXCircle,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

export default function QuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryQuizId = searchParams.get("id");

  const { user, isAuthenticated, loading: authLoading, refreshUser } = useAuth();

  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(queryQuizId || "");
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  // Play state
  const [started, setStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [approvalError, setApprovalError] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(600);

  // Load available quiz list
  useEffect(() => {
    async function loadQuizList() {
      try {
        const res = await api.getQuizzes();
        if (res.success && res.data) {
          setQuizzes(res.data);
          if (!selectedQuizId && res.data.length > 0) {
            setSelectedQuizId(res.data[0]._id);
          }
        }
      } catch (err) {
        console.error("Failed to load quizzes:", err);
      }
    }
    loadQuizList();
  }, [selectedQuizId]);

  // Load quiz details when selected & approved
  const startQuiz = async (quizIdToStart) => {
    const qid = quizIdToStart || selectedQuizId;
    if (!qid) return;

    setLoadingQuiz(true);
    setApprovalError("");

    try {
      const res = await api.getQuiz(qid);
      if (res.success && res.data) {
        setActiveQuiz(res.data);
        setAnswers({});
        setCurrentQuestionIdx(0);
        setSubmissionResult(null);
        setTimerSeconds((res.data.durationMinutes || 10) * 60);
        setStarted(true);
      }
    } catch (err) {
      if (err.status === 403) {
        setApprovalError(
          err.message ||
            "Aapka quiz access abhi admin dwara approve nahi hua hai. Admin page se approval lene ke baad hi quiz shuru kar sakte hain."
        );
      } else {
        alert(err.message || "Failed to load quiz");
      }
    } finally {
      setLoadingQuiz(false);
    }
  };

  // Timer countdown while playing
  useEffect(() => {
    if (!started || submissionResult) return;

    const timer = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, submissionResult]);

  const selectOption = (optionText) => {
    if (!activeQuiz) return;
    const currentQ = activeQuiz.questions[currentQuestionIdx];
    setAnswers((prev) => ({
      ...prev,
      [currentQ._id]: optionText,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!activeQuiz || submitting) return;
    setSubmitting(true);

    try {
      const totalTimeSpent =
        (activeQuiz.durationMinutes || 10) * 60 - timerSeconds;
      const res = await api.submitQuiz(
        activeQuiz._id,
        answers,
        Math.max(0, totalTimeSpent)
      );

      if (res.success) {
        setSubmissionResult(res.result);
      }
    } catch (err) {
      alert(err.message || "Failed to submit quiz answers");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remSecs).padStart(2, "0")}`;
  };

  // 1. Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen pt-28 bg-[#f8f9ff] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1D1B67]" />
      </div>
    );
  }

  // 2. Unauthenticated State
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-[#f8f9ff] flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 text-center shadow-xl border border-gray-100">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-[#1D1B67] text-white flex items-center justify-center text-3xl shadow-lg">
            <FiLogIn />
          </div>
          <span className="inline-block mt-6 px-3 py-1 rounded-full bg-[#D91C24]/10 text-[#D91C24] text-xs font-black uppercase">
            Authentication Required
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#1D1B67]">
            Please Sign In to Access Quizzes
          </h1>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            JBC quizzes are tied to student profiles and chapter records.
            Sign in with your Student ID or create a free account to get started.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/login"
              className="px-6 py-3.5 rounded-xl bg-[#D91C24] text-white font-bold text-sm hover:bg-[#b9161d] transition shadow-md shadow-red-900/20"
            >
              Sign In with Student ID
            </Link>
            <Link
              href="/"
              className="px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. User logged in but NOT approved by Admin
  // "user login karna ka bad sida quiz ko acsase nahi kar skata jab tak admin usa quiz accsase ka liya admin page sa apruval nahi da data"
  const isApproved = user?.quizAccessApproved === true || user?.role === "admin";

  if (!isApproved || approvalError) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-[#f8f9ff] flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl border border-amber-200 relative overflow-hidden">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-500/10 border-2 border-amber-400 text-amber-500 flex items-center justify-center text-4xl shadow-inner">
            <FiLock />
          </div>

          <span className="inline-flex items-center gap-1.5 mt-6 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider animate-pulse">
            <FiClock /> Admin Approval Pending
          </span>

          <h1 className="mt-4 text-2xl sm:text-3xl font-black text-[#1D1B67]">
            Quiz Access Restricted
          </h1>

          <div className="mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left text-xs sm:text-sm space-y-2">
            <p className="text-gray-600">
              <strong>Student:</strong> {user?.name}
            </p>
            <p className="text-gray-600">
              <strong>Student ID:</strong>{" "}
              <span className="font-mono font-bold text-[#1D1B67]">
                {user?.studentId}
              </span>
            </p>
            <p className="text-gray-600">
              <strong>Approval Status:</strong>{" "}
              <span className="text-amber-700 font-bold capitalize">
                {user?.quizAccessStatus || "Pending"}
              </span>
            </p>
          </div>

          <p className="mt-5 text-gray-500 text-xs sm:text-sm leading-relaxed">
            Aapka quiz access abhi Admin dwara approve nahi hua hai. Admin ke
            approval ke bina koi bhi student quiz attempt nahi kar sakta. Kripya
            apne centre admin se approval dene ko kahein.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={async () => {
                await refreshUser();
                setApprovalError("");
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1D1B67] text-white font-bold text-xs hover:bg-[#D91C24] transition shadow-lg"
            >
              <FiRefreshCw /> Refresh Approval Status
            </button>

            <Link
              href="/student"
              className="px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition"
            >
              Go to Student Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Submission Result Screen
  if (submissionResult) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-[#f8f9ff] flex items-center justify-center px-4">
        <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-gray-100">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#1D1B67] text-[#FFEB3B] flex items-center justify-center text-5xl shadow-xl">
              <FiCheckCircle />
            </div>

            <p className="mt-6 text-xs font-black tracking-widest text-[#D91C24] uppercase">
              QUIZ COMPLETED
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl font-black text-[#1D1B67]">
              {submissionResult.passed
                ? "Congratulations! Great Performance 🎉"
                : "Quiz Attempt Finished"}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {submissionResult.chapterName}: {submissionResult.quizTitle}
            </p>

            <div className="my-8 py-6 rounded-2xl bg-gray-50 border border-gray-100 max-w-sm mx-auto">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Final Score
              </span>
              <p className="text-5xl sm:text-6xl font-black text-[#D91C24] mt-2">
                {submissionResult.score} / {submissionResult.totalQuestions}
              </p>
              <span
                className={`inline-block mt-3 px-3.5 py-1 rounded-full text-xs font-black ${
                  submissionResult.passed
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {submissionResult.percentage}% Correct •{" "}
                {submissionResult.passed ? "PASSED" : "NEEDS PRACTICE"}
              </span>
            </div>
          </div>

          {/* Solutions Breakdown */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h2 className="text-base font-extrabold text-[#1D1B67] mb-4">
              Detailed Question Review:
            </h2>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {submissionResult.answers?.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                    ans.isCorrect
                      ? "border-emerald-200 bg-emerald-50/40"
                      : "border-red-200 bg-red-50/40"
                  }`}
                >
                  <p className="font-bold text-[#1D1B67]">
                    {idx + 1}. {ans.questionText}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs">
                    <p>
                      <span className="font-semibold text-gray-500">
                        Selected:
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
                          Correct:
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
          </div>

          {/* Result Actions */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setStarted(false);
                setSubmissionResult(null);
                startQuiz(activeQuiz._id);
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1D1B67] text-white font-bold text-xs hover:bg-[#D91C24] transition"
            >
              <FiRefreshCw /> Retake This Quiz
            </button>

            <Link
              href="/student"
              className="px-6 py-3.5 rounded-xl border border-gray-200 text-[#1D1B67] font-bold text-xs hover:bg-gray-50 transition"
            >
              View My Dashboard & Stats
            </Link>

            <Link
              href="/"
              className="px-6 py-3.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200 transition"
            >
              Home & Top 3 Leaderboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 5. Active Playing State
  if (started && activeQuiz && activeQuiz.questions?.length > 0) {
    const totalQ = activeQuiz.questions.length;
    const currentQ = activeQuiz.questions[currentQuestionIdx];
    const selectedAns = answers[currentQ._id] || "";
    const isLastQuestion = currentQuestionIdx === totalQ - 1;

    return (
      <div className="min-h-screen pt-28 pb-16 bg-[#f8f9ff] px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header Bar */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to exit the quiz? Unsaved answers will be lost."
                  )
                ) {
                  setStarted(false);
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-800"
            >
              <FiArrowLeft /> Exit Quiz
            </button>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-black">
                <FiClock /> {formatTime(timerSeconds)}
              </span>

              <span className="text-xs font-bold text-[#1D1B67]">
                Q {currentQuestionIdx + 1} of {totalQ}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-[#D91C24] transition-all duration-300"
              style={{
                width: `${((currentQuestionIdx + 1) / totalQ) * 100}%`,
              }}
            />
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-[#FFEB3B]/60 text-[#1D1B67] text-[10px] font-black uppercase tracking-wider">
                {activeQuiz.chapterName}
              </span>

              <span className="text-[11px] font-semibold text-gray-400">
                {activeQuiz.category}
              </span>
            </div>

            <h2 className="mt-4 text-xl sm:text-2xl font-black text-[#1D1B67] leading-tight">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="mt-8 space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAns === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectOption(option)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                      isSelected
                        ? "border-[#D91C24] bg-red-50/40 text-[#1D1B67] shadow-sm"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 text-gray-700"
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        isSelected
                          ? "bg-[#D91C24] text-white"
                          : "bg-gray-100 text-[#1D1B67]"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm font-semibold">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))
                }
                disabled={currentQuestionIdx === 0}
                className="px-5 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition"
              >
                Previous
              </button>

              {isLastQuestion ? (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#D91C24] hover:bg-[#b9161d] text-white text-xs font-black shadow-lg shadow-red-900/20 disabled:opacity-50 transition"
                >
                  {submitting ? "Submitting..." : "Submit All Answers"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentQuestionIdx((prev) =>
                      Math.min(totalQ - 1, prev + 1)
                    )
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1D1B67] hover:bg-[#D91C24] text-white text-xs font-bold transition"
                >
                  Next Question <FiArrowRight />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 6. Chapter & Quiz Selection Screen
  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#f8f9ff] px-4">
      <div className="max-w-4xl mx-auto">
        {/* Top Info Banner */}
        <div className="rounded-3xl bg-[#1D1B67] p-8 text-white relative overflow-hidden shadow-xl mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D91C24]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-[#FFEB3B] text-xs font-black tracking-widest uppercase">
                JBC EXAMINATION PORTAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-2">
                Choose a Chapter Quiz
              </h1>
              <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-lg">
                Hello {user?.name} ({user?.studentId}). Your quiz access is{" "}
                <span className="text-emerald-400 font-bold">Approved</span>!
                Select any chapter below to start your test.
              </p>
            </div>

            <Link
              href="/student"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition self-start"
            >
              <FiUser /> My Scores & Dashboard
            </Link>
          </div>
        </div>

        {/* Quiz Chapters List */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-[#1D1B67] mb-4">
            Available Chapters & Tests
          </h2>

          {quizzes.length === 0 ? (
            <div className="p-10 rounded-2xl bg-white border border-gray-100 text-center">
              <p className="text-gray-500 font-semibold text-sm">
                No quizzes published yet. Admin will add new chapter quizzes soon!
              </p>
            </div>
          ) : (
            quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1D1B67]/10 text-[#1D1B67] text-[10px] font-black uppercase">
                      {quiz.chapterName}
                    </span>
                    <span className="text-xs text-gray-400">
                      • {quiz.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#1D1B67]">
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1 max-w-xl">
                    {quiz.description || "Computer practical concepts."}
                  </p>

                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <span>📝 {quiz.totalQuestions} Questions</span>
                    <span>⏱️ {quiz.durationMinutes || 10} Minutes</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => startQuiz(quiz._id)}
                  disabled={loadingQuiz}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D91C24] hover:bg-[#b9161d] text-white text-xs font-black shadow-md shadow-red-900/20 transition shrink-0"
                >
                  <FiPlay size={14} /> Start Chapter Quiz
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}