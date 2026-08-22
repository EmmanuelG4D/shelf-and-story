"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .or(`title.ilike.%${query}%,author.ilike.%${query}%`);

      if (error) {
        console.log("Error searching books:", error.message);
      } else {
        setBooks(data);
      }
      setLoading(false);
    }

    if (query) fetchResults();
    else {
      setBooks([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        Search results for "{query}"
      </h1>

      {loading && <p className="text-slate-400 text-sm">Searching...</p>}

      {!loading && books.length === 0 && (
        <p className="text-slate-400 text-sm">No books found matching your search.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {books.map((book) => (
          <a key={book.id} href={`/book/${book.id}`} className="group cursor-pointer block">
            <div className="relative w-full aspect-[3/4] rounded-lg bg-slate-200 mb-3 overflow-hidden">
              {book.cover_image_url ? (
                <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Book cover</div>
              )}
              {book.badge && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-blue-700 text-white text-[10px] font-semibold">
                  {book.badge}
                </span>
              )}
            </div>
            <div className="text-sm font-semibold text-slate-800 leading-snug">{book.title}</div>
            <div className="text-xs text-slate-400 mb-1">{book.author}</div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-slate-600">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                {book.rating}
              </span>
<<<<<<< HEAD
              <span className="text-sm font-bold text-slate-900">₦{book.price}</span>
=======
              <span className="text-sm font-bold text-slate-900">${book.price}</span>
>>>>>>> 6ac56c1c6ecc29e5b339b315916260a52f89a6cf
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <main>
      <Header />
      <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-10 text-slate-400 text-sm">Loading...</div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </main>
  );
}
