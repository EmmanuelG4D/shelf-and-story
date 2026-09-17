"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AuthorDashboardPage() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [books, setBooks] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!session) return;

      const { data: booksData } = await supabase
        .from("books")
        .select("*")
        .eq("author_id", session.user.id);

      const { data: earningsData } = await supabase
        .from("author_earnings")
        .select("*, books(title)")
        .eq("author_id", session.user.id);

      setBooks(booksData || []);
      setEarnings(earningsData || []);
      setLoading(false);
    }
    fetchData();
  }, [session]);

  if (checking || loading) {
    return (
      <main>
        <Header />
        <div className="max-w-3xl mx-auto px-6 py-16 text-slate-400 text-sm">Loading...</div>
        <Footer />
      </main>
    );
  }

  if (!session) {
    return (
      <main>
        <Header />
        <div className="max-w-sm mx-auto px-6 py-24 text-center">
          <h1 className="text-xl font-bold text-slate-900 mb-3">Sign in to view your dashboard</h1>
          <a href="/signin" className="inline-block px-6 h-11 leading-[44px] rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition">
            Sign In
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  const totalOwed = earnings.filter((e) => !e.paid).reduce((sum, e) => sum + Number(e.amount_owed), 0);
  const totalPaid = earnings.filter((e) => e.paid).reduce((sum, e) => sum + Number(e.amount_owed), 0);

  const statusLabel = {
    pending: { text: "Under Review", color: "bg-amber-50 text-amber-700" },
    approved: { text: "Live", color: "bg-emerald-50 text-emerald-700" },
    rejected: { text: "Not Approved", color: "bg-red-50 text-red-700" },
  };

  return (
    <main>
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Your Author Dashboard</h1>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
            <div className="text-xs text-slate-400 mb-1">Owed to you</div>
            <div className="text-2xl font-bold text-slate-900">${totalOwed.toFixed(2)}</div>
          </div>
          <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
            <div className="text-xs text-slate-400 mb-1">Already paid</div>
            <div className="text-2xl font-bold text-slate-900">${totalPaid.toFixed(2)}</div>
          </div>
        </div>

        <h2 className="text-lg font-bold text-slate-900 mb-4">Your Submissions</h2>

        {books.length === 0 && (
          <p className="text-slate-400 text-sm mb-8">You haven't submitted any books yet.</p>
        )}

        <div className="space-y-3 mb-10">
          {books.map((book) => (
            <div key={book.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100">
              <div>
                <div className="text-sm font-semibold text-slate-800">{book.title}</div>
                <div className="text-xs text-slate-400">{book.category} — ${book.price}</div>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusLabel[book.status]?.color || "bg-slate-100 text-slate-500"}`}>
                {statusLabel[book.status]?.text || book.status}
              </span>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-bold text-slate-900 mb-4">Earnings History</h2>

        {earnings.length === 0 && (
          <p className="text-slate-400 text-sm">No sales yet.</p>
        )}

        <div className="space-y-2">
          {earnings.map((e) => (
            <div key={e.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 text-sm">
              <span className="text-slate-700">{e.books?.title || "Unknown book"}</span>
              <span className="flex items-center gap-3">
                <span className="font-semibold text-slate-900">${Number(e.amount_owed).toFixed(2)}</span>
                <span className={e.paid ? "text-xs text-emerald-600" : "text-xs text-amber-600"}>
                  {e.paid ? "Paid" : "Pending"}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}