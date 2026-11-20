"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Menu,
  Bell,
  User,
  LogOut,
  CalendarDays,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface StudentHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function StudentHeader({ onMenuClick, title = "Dashboard" }: StudentHeaderProps) {
  const { data: session } = useSession();
  const user = session?.user;

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800/80 bg-[#080c14]/85 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
      {/* Left: Mobile trigger & Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden border border-slate-800"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {title}
          </h1>
          <p className="hidden sm:block text-xs text-slate-400">
            Courts After Dark • Student Facility Reservation Desk
          </p>
        </div>
      </div>

      {/* Right: Operational Status, Notifications & Profile Menu */}
      <div className="flex items-center gap-3">
        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400"></span>
          </span>
          <span className="font-semibold text-lime-400">Night Access Open</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Slots till 23:00</span>
        </div>

        {/* Notifications Icon & Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            className="relative rounded-xl p-2.5 text-slate-400 hover:bg-slate-900 hover:text-white border border-slate-800/80 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_8px_#a3e635]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-800 bg-[#0d1322] p-4 shadow-2xl z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-bold text-sm text-white flex items-center gap-2">
                  <Bell className="h-4 w-4 text-lime-400" /> Notifications
                </span>
                <span className="text-[10px] font-semibold text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-full border border-lime-400/20">
                  1 New
                </span>
              </div>
              <div className="mt-3 space-y-2">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-lime-400 font-bold mb-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Welcome to Courts After Dark!
                  </div>
                  <p className="text-slate-300">
                    Your student account is active. Browse courts and reserve slots during operating hours.
                  </p>
                  <span className="text-[10px] text-slate-500 mt-2 block flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Just now
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 p-1.5 sm:px-3 sm:py-2 hover:border-slate-700 transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime-400 text-slate-950 font-black text-xs">
              {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-slate-200 max-w-[100px] truncate">
              {user?.name || "Student"}
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-800 bg-[#0d1322] p-2 shadow-2xl z-50">
              <div className="p-3 border-b border-slate-800 mb-1">
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-lime-400">
                  <ShieldCheck className="h-3 w-3" /> Student Verified
                </div>
              </div>
              <Link
                href="/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <User className="h-4 w-4 text-slate-400" /> My Profile
              </Link>
              <Link
                href="/bookings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <CalendarDays className="h-4 w-4 text-slate-400" /> My Bookings
              </Link>
              <div className="my-1 border-t border-slate-800" />
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

