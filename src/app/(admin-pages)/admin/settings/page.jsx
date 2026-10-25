"use client";

import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiShield,
  FiDatabase,
  FiLock,
  FiServer,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import PageTitle from "@/components/admin/PageTitle";
// import { api } from "@/lib/api";

export default function AdminSettingsPage() {
  const [apiStatus, setApiStatus] = useState("Checking...");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((res) => res.json())
      .then((d) =>
        setApiStatus(d.status === "ok" ? "Connected (Healthy)" : "Error"),
      )
      .catch(() => setApiStatus("Disconnected / Backend not reachable"));
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-4 sm:p-7 space-y-7">
      <PageTitle
        title="Admin Settings & System Security"
        description="Review backend API health, environment security, and default credentials."
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FiServer size={20} />
            </div>
            <div>
              <h2 className="text-base font-black text-[#101828]">
                Backend REST API Status
              </h2>
              <p className="text-xs text-gray-500">Node.js Express & MongoDB</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">API Endpoint:</span>
              <span className="font-mono font-bold text-[#1D1B67]">
                {/* http://localhost:5000/api */} ................
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Health Check:</span>
              <span
                className={`font-bold ${
                  apiStatus.includes("Healthy")
                    ? "text-emerald-700"
                    : "text-red-600"
                }`}
              >
                {apiStatus}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Database Engine:</span>
              <span className="font-bold text-gray-700">MongoDB</span>
            </div>
          </div>
        </div>

        {/* Security & Credentials Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#1D1B67] flex items-center justify-center">
              <FiShield size={20} />
            </div>
            <div>
              <h2 className="text-base font-black text-[#101828]">
                Security & Authentication (.env)
              </h2>
              <p className="text-xs text-gray-500">
                JWT Auth & Student Approval Gating
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Default Admin:</span>
              <span className="font-mono font-bold text-[#1D1B67]">
                jbc@gmail.com
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Admin Password:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-gray-600 tracking-wider">
                  {showPassword ? "jbc2186" : "••••••••"}
                </span>
                <button
                  onClick={togglePassword}
                  className="text-gray-500 hover:text-gray-700 transition"
                  type="button"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Approval Guard:</span>
              <span className="font-bold text-emerald-700">
                Active (Quiz gating enforced)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
