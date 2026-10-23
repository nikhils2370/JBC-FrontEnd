"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiEye,
    FiEyeOff,
    FiLock,
    FiMail,
    FiUser,
    FiPhone,
    FiShield,
    FiCheckCircle,
    FiAlertCircle,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { login, register } = useAuth();

    // Mode: "login" | "register" | "admin"
    const [mode, setMode] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Form inputs
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        identifier: "",
        phone: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");
        setLoading(true);

        try {
            const identifier = mode === "admin" ? formData.email || "admin@jbc.com" : formData.identifier;
            const res = await login(identifier, formData.password);

            setSuccessMsg("Login successful! Redirecting...");
            setTimeout(() => {
                if (res.user.role === "admin") {
                    router.push("/admin");
                } else {
                    router.push("/student");
                }
            }, 800);
        } catch (err) {
            setError(err.message || "Failed to sign in. Please verify your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");
        setLoading(true);

        try {
            const res = await register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            });

            setSuccessMsg(
                `Registered successfully! Your Student ID is ${res.user.studentId}. Your Quiz Access request has been submitted for Admin approval.`
            );
            setTimeout(() => {
                router.push("/student");
            }, 1500);
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className="min-h-screen pt-[86px] pb-16 bg-[#f8f9ff] flex items-center justify-center px-4">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-white">
          {/* Left Showcase Banner */}
          <div className="hidden lg:flex relative bg-[#1D1B67] p-12 flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D91C24]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFEB3B]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold transition"
              >
                <FiArrowLeft /> Back to Home
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 text-center"
            >
              <div className="w-36 h-36 mx-auto rounded-full bg-white p-4 shadow-2xl flex items-center justify-center">
                <img
                  src="/JBC.png"
                  alt="JBC Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <h2 className="mt-8 text-3xl font-black text-white tracking-tight">
                Jai Bhawani Computer
              </h2>
              <p className="text-[#FFEB3B] text-xs font-bold tracking-[0.25em] uppercase mt-1">
                Education Centre
              </p>

              <div className="mt-6 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left text-xs text-white/80 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <FiCheckCircle className="text-emerald-400" />
                  <span>Chapter-wise Interactive Quizzes</span>
                </div>
                <div className="flex items-center gap-2 text-white font-semibold">
                  <FiCheckCircle className="text-emerald-400" />
                  <span>Verified Admin Approval System</span>
                </div>
                <div className="flex items-center gap-2 text-white font-semibold">
                  <FiCheckCircle className="text-emerald-400" />
                  <span>Real-time Top 3 Scorers Leaderboard</span>
                </div>
              </div>
            </motion.div>

            <div className="relative z-10 flex items-center justify-between text-xs text-white/40 border-t border-white/10 pt-4">
              <span>ISO Certified Centre</span>
              <span>v2.0 Full Stack</span>
            </div>
          </div>

          {/* Right Form Area */}
          <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Top Mode Selector Tabs */}
              <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-gray-100 mb-8 gap-1 hover:bg-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                  className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer duration-200 ${
                    mode === "login"
                      ? "bg-white text-[#1D1B67] shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Student Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setError("");
                  }}
                  className={`py-2.5 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                    mode === "register"
                      ? "bg-white text-[#1D1B67] shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  New Register
                </button>
              </div>

              {/* Heading */}
              <div>
                <span className="text-[#D91C24] text-xs font-black tracking-[0.2em] uppercase">
                  {mode === "login"
                    ? "Welcome Back Student"
                    : mode === "register"
                      ? "Student Registration"
                      : "Management Console"}
                </span>
                <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#1D1B67]">
                  {mode === "login"
                    ? "Sign In to Portal"
                    : mode === "register"
                      ? "Create Student Account"
                      : "Admin Login"}
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-gray-500">
                  {mode === "login"
                    ? "Enter your Student ID or Email to access quizzes and reports."
                    : mode === "register"
                      ? "Register to receive your Student ID and request quiz access approval."
                      : "Sign in with Admin credentials to manage courses, students & quizzes."}
                </p>
              </div>

              {/* Error / Success Notifications */}
              {error && (
                <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-600 font-medium">
                  <FiAlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-700 font-medium">
                  <FiCheckCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* FORMS */}
              {mode === "register" ? (
                /* REGISTRATION FORM */
                <form
                  onSubmit={handleRegisterSubmit}
                  className="mt-6 space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-[#1D1B67] mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none focus:border-[#1D1B67] focus:ring-2 focus:ring-[#1D1B67]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D1B67] mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ramesh@gmail.com"
                        className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none focus:border-[#1D1B67] focus:ring-2 focus:ring-[#1D1B67]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D1B67] mb-1.5">
                      Mobile Phone (Optional)
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none focus:border-[#1D1B67] focus:ring-2 focus:ring-[#1D1B67]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D1B67] mb-1.5">
                      Password *
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        minLength={6}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="At least 6 characters"
                        className="w-full rounded-xl border border-gray-200 pl-10 pr-11 py-3 text-sm outline-none focus:border-[#1D1B67] focus:ring-2 focus:ring-[#1D1B67]/10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <FiEyeOff size={16} />
                        ) : (
                          <FiEye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 leading-relaxed">
                    <strong>Admin Approval Notice:</strong> After account
                    creation, your quiz access will be reviewed by the admin
                    panel before quizzes can be played.
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[#D91C24] hover:bg-[#b9161d] text-white font-bold text-sm shadow-lg shadow-red-900/20 disabled:opacity-60 transition"
                  >
                    {loading
                      ? "Creating Account..."
                      : "Register & Get Student ID"}
                  </button>
                </form>
              ) : (
                /* LOGIN FORM (Student or Admin) */
                <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1D1B67] mb-1.5">
                      {mode === "admin" ? "Admin Email" : "Student ID or Email"}{" "}
                      *
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name={mode === "admin" ? "email" : "identifier"}
                        required
                        value={
                          mode === "admin"
                            ? formData.email
                            : formData.identifier
                        }
                        onChange={handleChange}
                        placeholder={
                          mode === "admin"
                            ? "admin@jbc.com"
                            : "Enter JBC-2026-001 or email"
                        }
                        className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none focus:border-[#1D1B67] focus:ring-2 focus:ring-[#1D1B67]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D1B67] mb-1.5">
                      Password *
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="w-full rounded-xl border border-gray-200 pl-10 pr-11 py-3 text-sm outline-none focus:border-[#1D1B67] focus:ring-2 focus:ring-[#1D1B67]/10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <FiEyeOff size={16} />
                        ) : (
                          <FiEye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg disabled:opacity-60 transition ${
                      mode === "admin"
                        ? "bg-[#1D1B67] hover:bg-[#15144f] text-white shadow-indigo-950/20"
                        : "bg-[#D91C24] hover:bg-[#b9161d] text-white shadow-red-900/20"
                    }`}
                  >
                    {loading
                      ? "Authenticating..."
                      : mode === "admin"
                        ? "Sign In to Admin Panel"
                        : "Sign In as Student"}
                  </button>
                </form>
              )}

              {/* Bottom Helpers */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                {mode === "login" ? (
                  <p className="text-xs text-gray-500">
                    Don`t have a Student ID yet?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("register")}
                      className="font-bold text-[#D91C24] hover:underline"
                    >
                      Register Now
                    </button>
                  </p>
                ) : mode === "register" ? (
                  <p className="text-xs text-gray-500">
                    Already have a Student ID?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="font-bold text-[#1D1B67] hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Are you a student?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="font-bold text-[#D91C24] hover:underline"
                    >
                      Switch to Student Login
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}