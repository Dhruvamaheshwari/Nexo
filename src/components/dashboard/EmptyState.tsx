import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-[#0d1322]/40 p-8 sm:p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-lime-400 mb-4 shadow-lg shadow-lime-400/5">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="max-w-md text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
        {description}
      </p>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition-all hover:bg-lime-300 shadow-lg shadow-lime-400/20"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

