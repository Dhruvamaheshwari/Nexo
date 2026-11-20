"use client";

import { useSession } from "next-auth/react";
import { Menu, Bell, Sparkles } from "lucide-react";
import Link from "next/link";

interface TeacherHeaderProps {
  onMenuClick?: () => void;
  title?: string;
  activeTab?: string;
}

export default function TeacherHeader({
  onMenuClick,
  title = "Faculty Dashboard",
  activeTab,
}: TeacherHeaderProps) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-purple-950/60 bg-[#0f0e17]/80 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuClick}
          className="rounded-xl border border-purple-900/50 p-2 text-slate-300 hover:bg-purple-950/50 hover:text-white lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{title}</span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-purple-500/10 border border-purple-500/30 px-2.5 py-0.5 text-[10px] font-bold text-purple-300">
              <Sparkles className="h-3 w-3 text-purple-400" /> Faculty
            </span>
          </h1>
          <p className="text-xs text-purple-300/60 font-medium">
            Campus sports activity coordination, attendance tracking & facility management
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/notifications"
          className="relative rounded-xl border border-purple-900/50 bg-[#161426] p-2.5 text-slate-300 hover:bg-purple-950/60 hover:text-purple-300 transition-colors"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Link>

        <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-purple-900/50">
          <div className="text-right">
            <p className="text-xs font-bold text-white leading-tight">
              {user?.name || "Faculty"}
            </p>
            <p className="text-[10px] text-purple-400 font-semibold tracking-wide uppercase">
              Teacher
            </p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-purple-500/20">
            {user?.name ? user.name.charAt(0).toUpperCase() : "T"}
          </div>
        </div>
      </div>
    </header>
  );
}

