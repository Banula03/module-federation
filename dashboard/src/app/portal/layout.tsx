"use client";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { useSidebar } from "@/hooks/useSidebar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, toggle } = useSidebar();

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={toggle} />
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
