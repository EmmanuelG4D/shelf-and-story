"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "How do I buy a book?",
    a: "Create a free account, browse or search for a title you like, and click Buy Now on the book's page. Once payment is complete, the book is instantly added to your library.",
  },
  {
    q: "Where can I read my purchased books?",
    a: "Go to My Library after signing in — click any book there to read it directly in your browser, no download or app needed.",
  },
  {
    q: "What payment methods are accepted?",
    a: "Payments are processed securely through Paystack, supporting cards and other payment channels.",
  },
  {
    q: "Can I get a refund?",
    a: "Since books are delivered instantly upon purchase, refunds are handled on a case-by-case basis. Contact us if you run into an issue with a purchase.",
  },
  {
    q: "Do I need an account to browse books?",
    a: "No — you can browse and search freely. An account is only needed to buy and read a book.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <main>
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h1>
        <p className="text-slate-500 mb-10">Quick answers to common questions about Shelf & Story.</p>

        <div className="space-y-3">
          {faqs.map((item, index) => (
            <div key={index} className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-slate-800">{item.q}</span>
                <ChevronDown size={16} className={openIndex === index ? "rotate-180 transition text-slate-400" : "transition text-slate-400"} />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}