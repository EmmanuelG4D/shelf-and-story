"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_UID = "aabbf47d-e90b-43ba-8861-eb6cca317825";

export default function AdminPayoutsPage() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
  }, []);

  useEffect(() => {
    async function fetchUnpaid() {
      const { data, error } = await supabase
        .from("author_earnings")
        .select("*, books(title)")
        .eq("paid", false)
        .order("created_at", { ascending: true });

      if (!error) setEarnings(data);
      setLoading(false);
    }
    if (session && session.user.id === ADMIN_UID) fetchUnpaid();
    else setLoading(false);
  }, [session]);

  async function markPaid(id) {
    const { error } = await supabase
      .from("author_earnings")
      .update({ paid: true })
      .eq("id", id);

    if (!error) {
      setEarnings(earnings.filter((e) => e.id !== id));
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

  const totalOwed = earnings.reduce((sum, e) => sum + Number(e.amount_owed), 0);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Author Payouts</h1>
      <p className="text-sm text-slate-500 mb-6">
        Total currently owed: <span className="font-semibold text-slate-900">${totalOwed.toFixed(2)}</span>
      </p>

      {earnings.length === 0 && (
        <p className="text-slate-400 text-sm">No unpaid earnings right now.</p>
      )}

      <div className="space-y-3">
        {earnings.map((e) => (
          <div key={e.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
            <div>
              <div className="text-sm font-semibold text-slate-800">{e.books?.title || "Unknown book"}</div>
              <div className="text-xs text-slate-400">
                Author ID: {e.author_id.slice(0, 8)}... — {new Date(e.created_at).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-900">${Number(e.amount_owed).toFixed(2)}</span>
              <button
                onClick={() => markPaid(e.id)}
                className="px-4 h-9 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
              >
                Mark as Paid
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}