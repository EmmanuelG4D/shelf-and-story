"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_UID = "aabbf47d-e90b-43ba-8861-eb6cca317825";

export default function AdminReviewPage() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
  }, []);

  useEffect(() => {
    async function fetchPending() {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("status", "pending");

      if (!error) setBooks(data);
      setLoading(false);
    }
    if (session && session.user.id === ADMIN_UID) fetchPending();
    else setLoading(false);
  }, [session]);

  async function handleDecision(bookId, decision) {
    const { error } = await supabase
      .from("books")
      .update({ status: decision })
      .eq("id", bookId);

    if (!error) {
      setBooks(books.filter((b) => b.id !== bookId));
    }
  }

  if (checking || loading) {
    return <main className="max-w-3xl mx-auto px-6 py-16 text-slate-400 text-sm">Loading...</main>;
  }

  if (!session || session.user.id !== ADMIN_UID) {
    return (
      <main className="max-w-sm mx-auto px-6 py-24 text-center text-slate-500 text-sm">
        You are not authorized to view this page.
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Pending Book Submissions</h1>

      {books.length === 0 && (
        <p className="text-slate-400 text-sm">No pending submissions right now.</p>
      )}

      <div className="space-y-4">
        {books.map((book) => (
          <div key={book.id} className="border border-slate-200 rounded-xl p-5">
            <div className="text-lg font-bold text-slate-900">{book.title}</div>
            <div className="text-sm text-slate-500 mb-2">by {book.author} — {book.category} — ${book.price}</div>
            <p className="text-sm text-slate-600 mb-4">{book.description}</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDecision(book.id, "approved")}
                className="px-4 h-9 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
              >
                Approve
              </button>
              <button
                onClick={() => handleDecision(book.id, "rejected")}
                className="px-4 h-9 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}