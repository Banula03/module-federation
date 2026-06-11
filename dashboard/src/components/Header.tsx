"use client";
import { Bell, Search, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/portal/dashboard": "Overview",
  "/portal/dashboard/admin": "Admin Panel",
  "/portal/dashboard/branch": "Branch Management",
};

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const pageTitle = titles[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-neutral-400 hover:text-black hover:bg-neutral-100 transition-all duration-200 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <p className="text-xs text-neutral-500 font-medium tracking-wider uppercase">Portal</p>
          <h1 className="text-lg font-bold text-black leading-tight uppercase tracking-tight">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right: search + bell + avatar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-neutral-100 px-3 py-2 rounded-xl border border-neutral-200 focus-within:border-black transition-colors">
          <Search className="w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-black placeholder-neutral-400 outline-none w-40"
          />
        </div>

        {/* Bell */}
        <button className="relative p-2 rounded-xl text-neutral-400 hover:text-black hover:bg-neutral-100 transition-all duration-200">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-black ring-2 ring-white" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-black/10 group-hover:scale-105 transition-transform duration-200">
            AD
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-black leading-none uppercase">
              Admin
            </p>
            <p className="text-[10px] text-neutral-500 mt-0.5 font-bold uppercase tracking-wider">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
