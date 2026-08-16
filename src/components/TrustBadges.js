import { ShieldCheck, DownloadCloud, Award, RotateCcw } from "lucide-react";

const badges = [
  { icon: ShieldCheck, title: "Secure & Safe", desc: "Your data is protected" },
  { icon: DownloadCloud, title: "Instant Access", desc: "Download instantly" },
  { icon: Award, title: "Quality Guaranteed", desc: "Handpicked content" },
  { icon: RotateCcw, title: "Money Back", desc: "7-day guarantee" },
];

export default function TrustBadges() {
  return (
    <section className="w-full bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <div key={badge.title} className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
              <badge.icon size={18} className="text-blue-700" />
            </span>
            <span>
              <div className="text-sm font-semibold text-slate-800">{badge.title}</div>
              <div className="text-xs text-slate-400">{badge.desc}</div>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}