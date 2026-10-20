"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiImage,
  FiBookOpen,
  FiUsers,
  FiHelpCircle,
  FiAward,
  FiSettings,
  FiLogOut,
  FiX,
  FiChevronRight,
} from "react-icons/fi";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: FiGrid,
  },
  {
    title: "Hero Section",
    href: "/admin/hero",
    icon: FiImage,
  },
  {
    title: "Popular Courses",
    href: "/admin/courses",
    icon: FiBookOpen,
  },
  {
    title: "Students & Approval",
    href: "/admin/students",
    icon: FiUsers,
  },
  {
    title: "Quiz Management",
    href: "/admin/quiz",
    icon: FiHelpCircle,
  },
  {
    title: "Leaderboard & Results",
    href: "/admin/leaderboard",
    icon: FiAward,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: FiSettings,
  },
];

export default function Sidebar({ open, setOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          w-[255px] h-screen
          bg-[#1D1B67]
          text-white
          flex flex-col
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="h-[65px] px-5 border-b border-white/10 flex items-center justify-between">
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white p-1.5">
              <img
                src="/JBC.png"
                alt="JBC"
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <h1 className="text-sm font-extrabold">JBC Admin</h1>

              <p className="text-[9px] text-white/45 uppercase tracking-wider">
                Management Panel
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <FiX size={21} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
          <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Main Menu
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    group relative flex items-center gap-3
                    px-3 py-3 rounded-xl
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      active
                        ? "bg-white text-[#1D1B67] shadow-lg"
                        : "text-white/60 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <Icon size={19} />

                  <span className="flex-1">{item.title}</span>

                  {active && <FiChevronRight size={15} />}
                </Link>
              );
            })}
          </nav>

          {/* Quick info */}
          <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs font-bold text-white">JBC Admin Panel</p>

            <p className="mt-2 text-[11px] text-white/40 leading-5">
              Manage courses, students, quizzes and leaderboard from one place.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="p-3 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition"
          >
            <FiLogOut size={18} />
            Back to Website
          </Link>
        </div>
      </aside>
    </>
  );
}
