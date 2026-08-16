import { Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-serif text-5xl font-bold text-slate-900 leading-tight">
            Stories You Love,
            <br />
            <span className="text-[#1d4fd8]">Anytime, Anywhere.</span>
          </h1>

          <p className="mt-6 text-slate-500 text-lg max-w-md">
            Explore thousands of ebooks across horror, romance, thriller and more.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button className="px-6 h-12 rounded-full bg-[#1d4fd8] text-white font-medium hover:bg-[#1a45c2] transition">
              Explore Books
            </button>
            <button className="flex items-center gap-2 px-6 h-12 rounded-full border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition">
              <Play size={16} />
              How It Works
            </button>
          </div>

          <div className="mt-12 grid grid-cols-4 gap-6">
            {[
              ["10,000+", "Ebooks"],
              ["50+", "Genres"],
              ["5,000+", "Happy Readers"],
              ["24/7", "Support"],
            ].map(([stat, label]) => (
              <div key={label}>
                <div className="text-xl font-bold text-slate-900">{stat}</div>
                <div className="text-xs text-slate-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[420px] flex items-center justify-center">
          <img
            src="/covers/the-night-whispers.png"
            alt="The Night Whispers"
            className="absolute w-64 h-96 object-cover rounded-lg shadow-xl -rotate-6"
          />
          <img
            src="/covers/bound-by-fate.png"
            alt="Bound by Fate"
            className="absolute w-64 h-96 object-cover rounded-lg shadow-2xl z-10"
          />
          <img
            src="/covers/the-final-hour.png"
            alt="The Final Hour"
            className="absolute w-64 h-96 object-cover rounded-lg shadow-xl rotate-6 translate-x-16"
          />
        </div>
      </div>
    </section>
  );
}