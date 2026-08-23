"use client";
import { Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main>
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Contact Us</h1>
        <p className="text-slate-500 mb-10">
          Have a question about a book, your account, or a payment? Reach out and we'll get back to you as soon as we can.
        </p>

        <div className="flex items-center gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50">
          <span className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Mail size={18} className="text-blue-700" />
          </span>
          <div>
            <div className="text-sm font-semibold text-slate-800">Email us</div>
            <a href="mailto:okaforemmanuel0159@gmail.com" className="text-sm text-blue-700 hover:underline">
              okaforemmanuel0159@gmail.com
            </a>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-8">
          We typically respond within 24–48 hours.
        </p>
      </div>
      <Footer />
    </main>
  );
}