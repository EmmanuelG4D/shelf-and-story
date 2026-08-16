"use client";
import { useState } from "react";
import { Home, Grid3x3, TrendingUp, Star, Sparkles, Crown, Shield, Download, BookMarked, Headphones, ChevronDown } from "lucide-react";

const otherLinks = [
  { label: "Home", icon: Home, href: "/", active: true },
  { label: "Best Sellers", icon: TrendingUp, href: "/" },
  { label: "New Releases", icon: Sparkles, href: "/" },
  { label: "Top Rated", icon: Star, href: "/" },
];

const categoryLinks = ["Horror", "Romance", "Thriller"];

const reasons = [
  { icon: Shield, title: "Secure Payments", desc: "100% secure checkout" },
  { icon: Download, title: "Instant Downloads", desc: "Get your books instantly" },
  { icon: BookMarked, title: "Read Anywhere", desc: "On any device, anytime" },
  { icon: Headphones, title: "24/7 Support", desc: "We're here to help" },
];

export default function Sidebar() {
  const [catOpen, setCatOpen] = useState(false);

  return (
    <aside className="hidden lg:block w-64 shrink-0 px-4 py-6">
      <nav className="space-y-1 mb-6">
        <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700">
          <Home size={17} />
          Home
        </a>

        <button onClick={() => setCatOpen(!catOpen)} className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
          <span className="flex items-center gap-3">
            <Grid3x3 size={17} />
            Categories
          </span>
          <ChevronDown size={15} className={catOpen ? "rotate-180 transition" : "transition"} />
        </button>

        {catOpen && (
          <div className="pl-11 space-y-1">
            {categoryLinks.map((cat) => (
              <a key={cat} href={`/category/${cat.toLowerCase()}`} className="block px-2 py-1.5 rounded-md text-sm text-slate-500 hover:text-blue-700 hover:bg-blue-50">
                {cat}
              </a>
            ))}
          </div>
        )}

        {otherLinks.slice(1).map((link) => (
          <a key={link.label} href={link.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <link.icon size={17} />
            {link.label}
          </a>
        ))}
      </nav>

      <div className="rounded-xl bg-blue-50 p-5 mb-6">
        <Crown size={20} className="text-blue-700 mb-2" />
        <div className="font-bold text-slate-900 text-sm mb-1">Unlimited Reading</div>
        <p className="text-xs text-slate-500 mb-4">Read all premium books with our membership</p>
        <button className="w-full h-9 rounded-full bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition">Join Premium</button>
      </div>

      <div>
        <div className="font-bold text-slate-900 text-sm mb-3">Why Choose Us?</div>
        <div className="space-y-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                <reason.icon size={15} className="text-blue-700" />
              </span>
              <span>
                <div className="text-sm font-semibold text-slate-800">{reason.title}</div>
                <div className="text-xs text-slate-400">{reason.desc}</div>
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}