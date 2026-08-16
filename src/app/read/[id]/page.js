"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";

export default function ReadPage() {
  const params = useParams();
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [fileUrl, setFileUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });
  }, []);

  useEffect(() => {
    async function loadBook() {
      if (!session) return;

      const { data: book, error: bookError } = await supabase
        .from("books")
        .select("*")
        .eq("id", params.id)
        .single();

      if (bookError || !book) {
        setError("Book not found.");
        setLoading(false);
        return;
      }

      const { data: purchase } = await supabase
        .from("purchases")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("book_id", book.id)
        .maybeSingle();

      if (!purchase) {
        setError("You don't own this book yet.");
        setLoading(false);
        return;
      }

      if (!book.file_url) {
        setError("No file has been uploaded for this book yet.");
        setLoading(false);
        return;
      }

      const { data: signed, error: signedError } = await supabase.storage
        .from("book-files")
        .createSignedUrl(book.file_url, 3600);

      if (signedError) {
        setError("Could not open this book: " + signedError.message);
        setLoading(false);
        return;
      }

      setFileUrl(signed.signedUrl);
      setLoading(false);
    }

    if (session) loadBook();
  }, [session, params.id]);

  if (checkingSession || loading) {
    return (
      <main>
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-16 text-slate-400 text-sm">Loading...</div>
      </main>
    );
  }

  if (!session) {
    return (
      <main>
        <Header />
        <div className="max-w-sm mx-auto px-6 py-24 text-center">
          <h1 className="text-xl font-bold text-slate-900 mb-3">Sign in to read this book</h1>
          <a href="/signin" className="inline-block px-6 h-11 leading-[44px] rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition">
            Sign In
          </a>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <Header />
        <div className="max-w-sm mx-auto px-6 py-24 text-center">
          <p className="text-slate-500">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <iframe
          src={fileUrl}
          title="Book Reader"
          className="w-full h-full border-0"
        />
      </div>
    </main>
  );
}