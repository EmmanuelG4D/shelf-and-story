import { BookOpen, Share2, MessageCircle, Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </span>
            <span className="font-serif text-lg font-bold text-white">Shelf & Story</span>
          </div>
          <p className="text-sm text-slate-400 mb-4">Stories that stay with you.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700"><Share2 size={14} /></a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700"><MessageCircle size={14} /></a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700"><Camera size={14} /></a>
          </div>
        </div>

        <div>
          <div className="text-white font-semibold text-sm mb-3">Explore</div>
          <div className="space-y-2 text-sm">
            <a href="#" className="block hover:text-white">Best Sellers</a>
            <a href="#" className="block hover:text-white">New Releases</a>
            <a href="#" className="block hover:text-white">Top Rated</a>
            <a href="#" className="block hover:text-white">Free Books</a>
          </div>
        </div>

        <div>
          <div className="text-white font-semibold text-sm mb-3">Categories</div>
          <div className="space-y-2 text-sm">
            <a href="/category/horror" className="block hover:text-white">Horror</a>
            <a href="/category/romance" className="block hover:text-white">Romance</a>
            <a href="/category/thriller" className="block hover:text-white">Thriller</a>
          </div>
        </div>

        <div>
          <div className="text-white font-semibold text-sm mb-3">Support</div>
          <div className="space-y-2 text-sm">
            <a href="/contact" className="block hover:text-white">Contact Us</a>
            <a href="/faq" className="block hover:text-white">FAQ</a>
            <a href="/privacy-policy" className="block hover:text-white">Privacy Policy</a>
            <a href="/terms" className="block hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-xs text-slate-500">
          © 2026 Shelf & Story. All rights reserved.
        </div>
      </div>
    </footer>
  );
}