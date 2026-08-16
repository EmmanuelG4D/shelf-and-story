"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LibraryPage() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(function (result) {
      setSession(result.data.session);
      setCheckingSession(false);
    });

    const listener = supabase.auth.onAuthStateChange(function (event, newSession) {
      setSession(newSession);
    });

    return function () {
      listener.data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function fetchPurchases() {
      if (!session) return;

      const result = await supabase
        .from("purchases")
        .select("book_id, books(*)")
        .eq("user_id", session.user.id);

      if (result.error) {
        console.log("Error fetching purchases:", result.error.message);
      } else {
        setBooks(result.data.map(function (row) {
          return row.books;
        }));
      }
      setLoadingBooks(false);
    }

    if (session) fetchPurchases();
  }, [session]);

  if (checkingSession) {
    return (
      <main>
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-16 text-slate-400 text-sm">Loading...</div>
        <Footer />
      </main>
    );
  }

  if (!session) {
    return (
      <main>
        <Header />
        <div className="max-w-sm mx-auto px-6 py-24 text-center">
          <h1 className="text-xl font-bold text-slate-900 mb-3">Sign in to see your library</h1>
          <p className="text-sm text-slate-500 mb-6">You need an account to view your purchased books.</p>
          <a href="/signin" className="inline-block px-6 h-11 leading-[44px] rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition">
            Sign In
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">My Library</h1>

        {loadingBooks && <p className="text-slate-400 text-sm">Loading your books...</p>}

        {!loadingBooks && books.length === 0 && (
          <p className="text-slate-400 text-sm">You haven't bought any books yet.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {books.map(function (book) {
            return (
              <div key={book.id}>
                <a href={"/book/" + book.id} className="group cursor-pointer block">
                  <div className="relative w-full aspect-[3/4] rounded-lg bg-slate-200 mb-3 overflow-hidden">
                    {book.cover_image_url ? (
                      <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Book cover</div>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-slate-800 leading-snug">{book.title}</div>
                  <div className="text-xs text-slate-400 mb-2">{book.author}</div>
                </a>

                <a href={"/read/" + book.id} className="block w-full h-9 leading-9 text-center rounded-full bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition">
                  Read Now
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </main>
  );
}