"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BookPage() {
  const params = useParams();
  const [book, setBook] = useState(null);
  const [session, setSession] = useState(null);
  const [buyStatus, setBuyStatus] = useState("");
  const [hasPurchased, setHasPurchased] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    async function fetchBook() {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.log("Error fetching book:", error.message);
      } else {
        setBook(data);
      }
    }
    fetchBook();
  }, [params.id]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function checkPurchase() {
      if (!session || !book) {
        setCheckingPurchase(false);
        return;
      }

      const { data, error } = await supabase
        .from("purchases")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("book_id", book.id)
        .maybeSingle();

      if (!error && data) {
        setHasPurchased(true);
      }
      setCheckingPurchase(false);
    }
    checkPurchase();
  }, [session, book]);

  async function handleBuy() {
    if (!session) {
      setBuyStatus("Please sign in first to buy this book.");
      return;
    }

    const PaystackPop = (await import("@paystack/inline-js")).default;
    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: session.user.email,
      amount: Math.round(book.price * 100),
      currency: "NGN",
      onSuccess: async function (transaction) {
        const { error } = await supabase.from("purchases").insert([
          {
            user_id: session.user.id,
            book_id: book.id,
          },
        ]);

        if (error) {
          setBuyStatus("Payment succeeded, but saving your purchase failed: " + error.message);
        } else {
          setBuyStatus("Payment successful! This book is now in your library.");
          setHasPurchased(true);
        }
      },
      onCancel: function () {
        setBuyStatus("Payment cancelled.");
      },
    });
  }

  async function handleDownload() {
    if (!book.file_url) {
      setBuyStatus("No file has been uploaded for this book yet.");
      return;
    }

    const { data, error } = await supabase.storage
      .from("book-files")
      .createSignedUrl(book.file_url, 600);

    if (error) {
      setBuyStatus("Could not generate download link: " + error.message);
      return;
    }

    setDownloadUrl(data.signedUrl);
    window.open(data.signedUrl, "_blank");
  }

  if (!book) {
    return (
      <main>
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-16 text-slate-400 text-sm">
          Loading...
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />

      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10">

        <div className="w-full aspect-[3/4] rounded-lg bg-slate-200 overflow-hidden">
          {book.cover_image_url ? (
            <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">Book cover</div>
          )}
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 capitalize">
            {book.category}
          </span>

          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            {book.title}
          </h1>

          <p className="text-slate-500 mb-4">
            by {book.author}
          </p>

          <div className="flex items-center gap-1 mb-6">
            <Star size={16} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-slate-700">
              {book.rating}
            </span>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8">
            {book.description}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-slate-900">
              ₦{book.price}
            </span>

            {checkingPurchase ? (
              <span className="text-sm text-slate-400">Checking...</span>
            ) : hasPurchased ? (
              <button
                onClick={handleDownload}
                className="px-6 h-12 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
              >
                Download Book
              </button>
            ) : (
              <button
                onClick={handleBuy}
                className="px-6 h-12 rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition"
              >
                Buy Now
              </button>
            )}
          </div>

          {buyStatus && (
            <p className="text-sm text-slate-500 mt-4">{buyStatus}</p>
          )}
        </div>

      </div>

      <Footer />
    </main>
  );
}