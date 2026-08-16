"use client";
import { useState, useEffect } from "react";
import { Search, BookOpen, ChevronDown, Moon } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const [booksOpen, setBooksOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  function handleSearch(e) {
    e.preventDefault();
    const query = e.target.elements.search.value;
    window.location.href = "/search?q=" + encodeURIComponent(query);
  }

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-8">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-9 h-9 rounded-lg bg-[#1d4fd8] flex items-center justify-center">
            <BookOpen size={18} className="text-white" strokeWidth={2.25} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl font-bold text-slate-900 tracking-tight">
              Shelf &amp; Story
            </span>
            <span className="text-[11px] text-slate-400 tracking-wide mt-0.5">
              Stories that stay with you
            </span>
          </span>
        </a>

        <div className="flex-1 max-w-xl">
          <form onSubmit={handleSearch} className="relative">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              name="search"
              type="text"
              placeholder="Search for books, authors, genres…"
              className="w-full h-11 pl-10 pr-4 rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1d4fd8]/30 focus:border-[#1d4fd8] transition"
            />
          </form>
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-slate-600 shrink-0">
          <a href="/" className="text-[#1d4fd8] relative pb-1">
            Home
            <span className="absolute -bottom-[27px] left-0 right-0 h-0.5 bg-[#1d4fd8]" />
          </a>

          <div className="relative" onMouseEnter={() => setBooksOpen(true)} onMouseLeave={() => setBooksOpen(false)}>
            <button className="flex items-center gap-1 hover:text-slate-900 transition">
              Books <ChevronDown size={14} />
            </button>
            {booksOpen && (
              <div className="absolute top-full left-0 pt-3 w-44">
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 py-2 text-sm">
                  {["New Releases", "Best Sellers", "Top Rated", "Free Books"].map((item) => (
                    <a key={item} href="#" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-[#1d4fd8]">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => setCatsOpen(true)} onMouseLeave={() => setCatsOpen(false)}>
            <button className="flex items-center gap-1 hover:text-slate-900 transition">
              Categories <ChevronDown size={14} />
            </button>
            {catsOpen && (
              <div className="absolute top-full left-0 pt-3 w-44">
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 py-2 text-sm">
                  {["Horror", "Romance", "Thriller"].map((item) => (
                    <a key={item} href={"/category/" + item.toLowerCase()} className="block px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-[#1d4fd8]">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {session && (
            <a href="/library" className="hover:text-slate-900 transition">My Library</a>
          )}
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-50 transition" aria-label="Toggle theme">
            <Moon size={18} className="text-slate-600" />
          </button>

          {session ? (
            <button onClick={handleLogout} className="hidden md:block px-4 h-10 rounded-full border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
              Log Out
            </button>
          ) : (
            <>
              <a href="/signin" className="hidden md:flex items-center px-4 h-10 rounded-full border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
                Sign in
              </a>
              <a href="/signup" className="flex items-center px-4 h-10 rounded-full bg-[#1d4fd8] text-white text-sm font-medium hover:bg-[#1a45c2] transition">
                Sign up
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}