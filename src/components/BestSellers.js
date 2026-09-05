"use client";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function BestSellers() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase.from("books").select("*");
      if (error) {
        console.log("Error fetching books:", error.message);
      } else {
        setBooks(data);
      }
    }
    fetchBooks();
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Best Sellers</h2>
          <a href="#" className="text-sm font-medium text-blue-700 hover:underline">View all →</a>
        </div>

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
                <span className="text-sm font-bold text-slate-900">${book.price}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}