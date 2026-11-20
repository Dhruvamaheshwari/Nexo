import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: "lime" | "cyan" | "amber" | "slate";
}

export default function DashboardStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeColor = "lime",
}: DashboardStatCardProps) {
  const getBadgeStyle = () => {
    switch (badgeColor) {
      case "lime":
        return "bg-lime-400/10 text-lime-400 border-lime-400/20";
      case "cyan":
        return "bg-cyan-400/10 text-cyan-400 border-cyan-400/20";
      case "amber":
        return "bg-amber-400/10 text-amber-400 border-amber-400/20";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0d1322]/80 p-5 shadow-lg backdrop-blur-sm transition-all hover:border-slate-700">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
          <Icon className="h-5 w-5 text-lime-400" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-black tracking-tight text-white">{value}</span>
        {badge && (
          <span
            className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide",
              getBadgeStyle()
            )}
          >
            {badge}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-2 text-xs text-slate-400">{subtitle}</p>}
    </div>
  );
}

