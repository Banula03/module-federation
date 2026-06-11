"use client";
import Link from "next/link";
import { GitBranch, ArrowLeft } from "lucide-react";

export default function BranchPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      {/* Icon badge */}
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
        <GitBranch className="w-10 h-10 text-white" />
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Branch Management</h1>
        <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
          This page is under construction. Branch monitoring and control
          features will be available here soon.
        </p>
      </div>

      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        Coming Soon
      </span>

      {/* Back link */}
      <Link
        href="/portal/dashboard"
        className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 text-sm font-medium transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
    </div>
  );
}
