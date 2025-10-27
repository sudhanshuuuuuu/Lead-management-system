"use client";
import { signOut } from "next-auth/react";

export default function SettingsPage() {
  return (
    <div className="text-white bg-white/10 p-8 rounded-2xl max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">⚙️ Settings</h2>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-xl transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
