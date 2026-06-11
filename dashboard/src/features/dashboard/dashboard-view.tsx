"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  GitBranch,
  ArrowRight,
  TrendingUp,
  Activity,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import clsx from "clsx";

// --- Sub-components for Dashboard ---

const AdminWidget = () => (
  <div className="bg-black border border-neutral-800 rounded-3xl p-6 hover:border-white transition-all duration-300 group shadow-2xl relative overflow-hidden">
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-black shadow-lg">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-black bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-white"
            >
              U{i}
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Admin Control</h3>
      <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
        Manage system permissions, security protocols, and administrator
        activity.
      </p>
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
          <span className="text-neutral-500">Security Status</span>
          <span className="text-white px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700">Protected</span>
        </div>
        <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden border border-neutral-800">
          <div className="bg-white h-full w-[85%] rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
        </div>
      </div>
      <Link
        href="/portal/dashboard/admin"
        className="flex items-center justify-center w-full py-3 px-4 bg-white hover:bg-neutral-200 text-black rounded-xl font-bold text-xs uppercase tracking-widest transition-all group/btn"
      >
        Access Panel
        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
  </div>
);

const BranchWidget = () => (
  <div className="bg-white border border-neutral-200 rounded-3xl p-6 hover:border-black transition-all duration-300 group shadow-2xl relative overflow-hidden">
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg">
          <GitBranch className="w-6 h-6" />
        </div>
        <div className="px-3 py-1 rounded-full bg-neutral-100 text-black text-[10px] font-bold border border-neutral-200 uppercase tracking-wider">
          12 Active
        </div>
      </div>
      <h3 className="text-xl font-bold text-black mb-2 uppercase tracking-tight">Branch Network</h3>
      <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
        Monitor performance across regional hubs and logistics centers.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-neutral-50 p-3 rounded-2xl border border-neutral-100">
          <p className="text-[10px] text-neutral-400 font-bold uppercase mb-1">Efficiency</p>
          <p className="text-lg font-black text-black">94.2%</p>
        </div>
        <div className="bg-neutral-50 p-3 rounded-2xl border border-neutral-100">
          <p className="text-[10px] text-neutral-400 font-bold uppercase mb-1">Active</p>
          <p className="text-lg font-black text-black">24/7</p>
        </div>
      </div>
      <Link
        href="/portal/dashboard/branch"
        className="flex items-center justify-center w-full py-3 px-4 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all group/btn"
      >
        Manage Hubs
        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
  </div>
);

const ActivityFeed = () => (
  <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
    <div className="flex items-center justify-between mb-8">
      <h3 className="text-xl font-bold text-black uppercase tracking-tight">Recent Activity</h3>
      <button className="text-neutral-500 hover:text-black text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
        See All <TrendingUp className="w-4 h-4" />
      </button>
    </div>
    <div className="space-y-6">
      {[
        {
          user: "Sarah Admin",
          action: "updated security firewall",
          time: "12m ago",
          icon: CheckCircle2,
          type: "success",
        },
        {
          user: "System Bot",
          action: "detected new branch connection",
          time: "45m ago",
          icon: Activity,
          type: "info",
        },
        {
          user: "Alex Manager",
          action: "requested access to Finance",
          time: "2h ago",
          icon: Clock,
          type: "pending",
        },
        {
          user: "Auth Guard",
          action: "rejected suspicious login",
          time: "5h ago",
          icon: AlertCircle,
          type: "warning",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-4 p-4 rounded-2xl hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-100 group"
        >
          <div
            className={clsx(
              "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border transition-colors",
              "bg-neutral-100 border-neutral-200 text-neutral-500 group-hover:bg-black group-hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-black tracking-tight uppercase">
                {item.user}
              </p>
              <span className="text-[10px] text-neutral-500 font-bold uppercase">
                {item.time}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1 capitalize leading-relaxed">
              {item.action}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Main Dashboard View ---

export default function DashboardView() {
  return (
    <div className="min-h-screen text-black">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">System Online</span>
            </div>
            <h2 className="text-4xl font-black text-black tracking-tighter uppercase leading-none italic">
              Live Control <br /> Network
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Active nodes</p>
              <p className="text-2xl font-black text-black">1,248</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center">
              <Users className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AdminWidget />
          <BranchWidget />
        </div>

        {/* Full-width Activity Feed */}
        <ActivityFeed />
      </div>
    </div>
  );
}
