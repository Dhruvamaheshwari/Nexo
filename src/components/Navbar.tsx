"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const user = session?.user;
  const role = user?.role;

  const getRoleBadge = () => {
    switch (role) {
      case "ADMIN":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "EQUIPMENT_MANAGER":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "TEACHER":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      default:
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    }
  };

  const navLinks = () => {
    if (role === "ADMIN") {
      return [
        { href: "/admin/dashboard", label: "Dashboard" },
        { href: "/admin/facilities", label: "Facilities" },
        { href: "/admin/bookings", label: "Bookings & Attendance" },
        { href: "/admin/events", label: "Events & Tournaments" },
        { href: "/admin/reviews", label: "Reviews" },
        { href: "/admin/maintenance", label: "Maintenance" },
        { href: "/admin/policy", label: "Fairness Policies" },
        { href: "/admin/users", label: "Users" },
        { href: "/admin/reports", label: "Reports & Exports" },
      ];
    }
    if (role === "EQUIPMENT_MANAGER") {
      return [
        { href: "/equipment-manager/dashboard", label: "Dashboard" },
        { href: "/equipment-manager/inventory", label: "Inventory" },
        { href: "/equipment-manager/checkouts", label: "Checkouts" },
      ];
    }
    if (role === "TEACHER") {
      return [
        { href: "/teacher/dashboard", label: "Dashboard" },
        { href: "/teacher/events", label: "Events & Tournaments" },
        { href: "/teacher/dashboard?tab=activities", label: "Sports Activities" },
        { href: "/teacher/dashboard?tab=bookings", label: "Student Bookings" },
        { href: "/teacher/dashboard?tab=attendance", label: "Attendance" },
        { href: "/teacher/dashboard?tab=schedule", label: "Facility Schedule" },
        { href: "/teacher/dashboard?tab=maintenance", label: "Damage Reports" },
      ];
    }
    // Student default
    return [
      { href: "/student/dashboard", label: "Dashboard" },
      { href: "/facilities", label: "Facilities" },
      { href: "/events", label: "Tournaments & Events" },
      { href: "/bookings", label: "My Bookings" },
      { href: "/equipment", label: "Equipment" },
      { href: "/profile", label: "Profile" },
    ];
  };

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <span className="text-zinc-950 font-black text-xl">⚡</span>
              </div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Courts After Dark
              </span>
            </Link>

            {user && (
              <div className="hidden md:flex items-center gap-1">
                {navLinks().map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden sm:flex flex-col items-end mr-2">
                  <span className="text-sm font-medium text-zinc-200">
                    {user.name}
                  </span>
                  <span
                    className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded border ${getRoleBadge()}`}
                  >
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors shadow-sm shadow-emerald-500/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

