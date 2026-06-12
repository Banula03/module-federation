"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const tabs = [
  { label: "Overview", href: "/portal/dashboard" },
  { label: "Admin", href: "/portal/dashboard/admin" },
  { label: "Branch", href: "/portal/dashboard/branch" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 px-6 py-3 border-b border-neutral-200 bg-white">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={clsx(
              "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-200",
              active
                ? "bg-white text-black shadow-md shadow-black/5"
                : "text-neutral-500 hover:text-white hover:bg-neutral-900"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
