"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldCheck,
  GitBranch,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  {
    label: "Dashboard",
    href: "/portal/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Admin",
    href: "/portal/dashboard/admin",
    icon: ShieldCheck,
  },
  {
    label: "Branch",
    href: "/portal/dashboard/branch",
    icon: GitBranch,
  },
];

const bottomItems = [
  { label: "Settings", href: "#", icon: Settings },
  { label: "Notifications", href: "#", icon: Bell },
  { label: "Logout", href: "#", icon: LogOut },
];

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        "relative flex flex-col bg-black border-r border-neutral-800 transition-all duration-300 ease-in-out h-screen sticky top-0 text-white",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
            <LayoutDashboard className="w-5 h-5 text-black" />
          </div>
          {isOpen && (
            <span className="font-bold text-white text-lg tracking-tight">
              Dashboard
            </span>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggle}
        className="absolute -right-3.5 top-20 z-10 w-7 h-7 bg-neutral-800 border border-neutral-700 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-all duration-200 shadow-md"
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {isOpen && (
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest px-3 mb-3">
            Main Menu
          </p>
        )}
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                active
                  ? "bg-white text-black shadow-lg"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
              {active && isOpen && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-black" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Items */}
      <div className="px-3 py-4 border-t border-neutral-800 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-500 hover:bg-neutral-900 hover:text-white transition-all duration-200"
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
