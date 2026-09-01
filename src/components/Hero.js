import { Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-sky-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Stories You Love,
            <br />
            <span className="text-[#1d4fd8]">Anytime, Anywhere.</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-slate-500 text-base sm:text-lg max-w-md">
            Original ebooks across horror, romance, thriller and more — read instantly after purchase.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button className="px-5 sm:px-6 h-11 sm:h-12 rounded-full bg-[#1d4fd8] text-white text-sm sm:text-base font-medium hover:bg-[#1a45c2] transition">
              Explore Books
            </button>
            <button className="flex items-center gap-2 px-5 sm:px-6 h-11 sm:h-12 rounded-full border border-slate-200 text-slate-700 text-sm sm:text-base font-medium hover:bg-slate-50 transition">
              <Play size={16} />
              How It Works
            </button>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              ["Instant Access", "Read right after purchase"],
              ["Secure Checkout", "Powered by Paystack"],
              ["Read Anywhere", "No app needed"],
              ["Original Stories", "Written for this platform"],
            ].map(([title, label]) => (
              <div key={title}>
                <div className="text-sm sm:text-base font-bold text-slate-900">{title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-64 sm:h-80 lg:h-[420px] flex items-center justify-center mt-4 lg:mt-0">
          <img
            src="/covers/the-night-whispers.png"
            alt="The Night Whispers"
            className="absolute w-36 h-52 sm:w-48 sm:h-72 lg:w-64 lg:h-96 object-cover rounded-lg shadow-xl -rotate-6"
          />
          <img
            src="/covers/bound-by-fate.png"
            alt="Bound by Fate"
            className="absolute w-36 h-52 sm:w-48 sm:h-72 lg:w-64 lg:h-96 object-cover rounded-lg shadow-2xl z-10"
          />
          <img
            src="/covers/the-final-hour.png"
            alt="The Final Hour"
            className="absolute w-36 h-52 sm:w-48 sm:h-72 lg:w-64 lg:h-96 object-cover rounded-lg shadow-xl rotate-6 translate-x-8 sm:translate-x-12 lg:translate-x-16"
          />
        </div>
      </div>
    </section>
  );
}