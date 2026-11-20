"use client";

import { useState } from "react";
import TeacherSidebar from "./TeacherSidebar";
import TeacherHeader from "./TeacherHeader";

interface TeacherDashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function TeacherDashboardLayout({
  children,
  title = "Faculty Dashboard",
  activeTab = "overview",
  onTabChange,
}: TeacherDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#08070d] text-slate-100 flex">
      {/* Sidebar */}
      <TeacherSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TeacherHeader
          onMenuClick={() => setSidebarOpen(true)}
          title={title}
          activeTab={activeTab}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

