"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    setLoading(false);

    if (error) {
      setStatus("Error: " + error.message);
    } else {
      setStatus("Check your email for a password reset link.");
    }
  }

  return (
    <main>
      <Header />
      <div className="max-w-sm mx-auto px-6 py-24">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Reset your password</h1>
        <p className="text-sm text-slate-500 mb-6">Enter your email and we'll send you a reset link.</p>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full h-11 px-3 rounded-lg border border-slate-200"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          {status && <p className="text-sm text-slate-500">{status}</p>}
        </form>
      </div>
      <Footer />
    </main>
  );
}