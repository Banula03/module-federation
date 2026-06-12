"use client";

import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { init, loadRemote } from "@module-federation/runtime";

// Initialize Module Federation Runtime
init({
  name: "host",
  remotes: [
    {
      name: "admin",
      entry: "http://localhost:5002/assets/remoteEntry.js",
      type: "module",
    },
  ],
  shared: {
    react: {
      version: "19.2.4",
      // @ts-ignore
      lib: () => React,
      // @ts-ignore
      singleton: true,
    },
    "react-dom": {
      version: "19.2.4",
      // @ts-ignore
      lib: () => ReactDOM,
      // @ts-ignore
      singleton: true,
    },
  },
});

export default function RemoteAdminApp() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      console.log("[RemoteAdminApp] Starting load for admin/AdminApp...");
      try {
        // Load the AdminApp component from the admin remote
        const module = await loadRemote("admin/AdminApp");
        console.log("[RemoteAdminApp] Module resolved:", module);
        
        if (!module) {
          throw new Error("Remote module resolved to null/undefined");
        }

        // Handle different export patterns (default, or the module itself)
        // @ts-ignore
        const ResolvedComponent = module.default || module;
        
        if (!ResolvedComponent) {
          throw new Error("No component found in remote module exports");
        }

        console.log("[RemoteAdminApp] Setting component...");
        setComponent(() => ResolvedComponent);
      } catch (err) {
        console.error("[RemoteAdminApp] Error loading remote:", err);
        setError(`Failed to load the Admin Panel: ${err instanceof Error ? err.message : String(err)}`);
      }
    };
    load();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-rose-500/10 border border-rose-500/20 rounded-3xl text-center">
        <p className="text-rose-400 font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-black rounded-lg transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-slate-400 animate-pulse font-medium">Connecting to Admin Service...</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading Component...</div>}>
      <Component />
    </Suspense>
  );
}
