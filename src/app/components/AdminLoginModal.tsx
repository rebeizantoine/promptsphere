"use client";

import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export function AdminLoginModal({ onClose, onSuccess }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${API_URL}/api/admin/login`,
        { username, password },
        { withCredentials: true },
      );

      onSuccess(); // 🔥 switch to pro mode
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1a1a2e] p-6 rounded-2xl w-full max-w-md border border-white/10 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-white">
          🔐 Admin Login Required
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 rounded bg-white/10 text-white border border-white/20"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-white/10 text-white border border-white/20"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-white/20 hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
