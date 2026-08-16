"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setStatus("Error: " + error.message);
    } else {
      setStatus("Password updated! Redirecting to sign in...");
      setTimeout(() => router.push("/signin"), 1500);
    }
  }

  return (
    <main>
      <Header />
      <div className="max-w-sm mx-auto px-6 py-24">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Set a new password</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              required
              className="w-full h-11 px-3 pr-10 rounded-lg border border-slate-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
          {status && <p className="text-sm text-slate-500">{status}</p>}
        </form>
      </div>
      <Footer />
    </main>
  );
}