import { Ghost, Heart, Crosshair, Search, Sparkles, MoreHorizontal } from "lucide-react";

const categories = [
  { name: "Horror", count: "1,245 books", icon: Ghost, bg: "bg-slate-100", color: "text-slate-500" },
  { name: "Romance", count: "2,345 books", icon: Heart, bg: "bg-rose-50", color: "text-rose-500" },
  { name: "Thriller", count: "1,987 books", icon: Crosshair, bg: "bg-sky-50", color: "text-sky-600" },
  { name: "Mystery", count: "1,234 books", icon: Search, bg: "bg-emerald-50", color: "text-emerald-600" },
  { name: "Fantasy", count: "1,456 books", icon: Sparkles, bg: "bg-purple-50", color: "text-purple-500" },
];

export default function Categories() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Browse by Categories</h2>
          <a href="#" className="text-sm font-medium text-blue-700 hover:underline">View all categories →</a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <a key={cat.name} href={`/category/${cat.name.toLowerCase()}`} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:shadow-md transition">
              <span className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${cat.bg}`}>
                <cat.icon size={18} className={cat.color} />
              </span>
              <span>
                <div className="text-sm font-semibold text-slate-800">{cat.name}</div>
                <div className="text-xs text-slate-400">{cat.count}</div>
              </span>
            </a>
          ))}

          <a href="#" className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:shadow-md transition">
            <span className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-slate-50">
              <MoreHorizontal size={18} className="text-slate-400" />
            </span>
            <span>
              <div className="text-sm font-semibold text-slate-800">More</div>
              <div className="text-xs text-slate-400">View all</div>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}