"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MAX_TOTAL_SIZE = 5 * 1024 * 1024; // 5MB combined

export default function SubmitBookPage() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    category: "Horror",
    price: "",
  });
  const [bookFile, setBookFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validateFiles() {
    if (!bookFile) return "Please choose a book file (PDF).";
    if (!coverFile) return "Please choose a cover image (JPG).";
    if (bookFile.type !== "application/pdf") return "Book file must be a PDF.";
    if (coverFile.type !== "image/jpeg") return "Cover must be a JPG image.";

    const totalSize = bookFile.size + coverFile.size;
    if (totalSize > MAX_TOTAL_SIZE) {
      const totalMB = (totalSize / (1024 * 1024)).toFixed(2);
      return `Combined file size is ${totalMB}MB. Book file and cover together must be under 5MB total.`;
    }

    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");

    const fileError = validateFiles();
    if (fileError) {
      setStatus(fileError);
      return;
    }

    setStatus("Submitting...");

    const { data: bookRow, error: insertError } = await supabase
      .from("books")
      .insert([
        {
          title: form.title,
          author: form.author,
          description: form.description,
          category: form.category,
          price: parseFloat(form.price),
          author_id: session.user.id,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (insertError) {
      setStatus("Error: " + insertError.message);
      return;
    }

    const bookFileName = `${bookRow.id}.pdf`;
    const coverFileName = `${bookRow.id}.jpg`;

    const { error: bookUploadError } = await supabase.storage
      .from("book-files")
      .upload(bookFileName, bookFile);

    if (bookUploadError) {
      setStatus("Book details saved, but file upload failed: " + bookUploadError.message);
      return;
    }

    const { error: coverUploadError } = await supabase.storage
      .from("covers")
      .upload(coverFileName, coverFile);

    if (coverUploadError) {
      setStatus("Book details saved, but cover upload failed: " + coverUploadError.message);
      return;
    }

    const { data: coverUrlData } = supabase.storage.from("covers").getPublicUrl(coverFileName);

    await supabase
      .from("books")
      .update({
        file_url: bookFileName,
        cover_image_url: coverUrlData.publicUrl,
        file_uploaded: true,
      })
      .eq("id", bookRow.id);

    setStatus("Submitted! Your book, cover, and file are all uploaded and awaiting review.");
    setForm({ title: "", author: "", description: "", category: "Horror", price: "" });
    setBookFile(null);
    setCoverFile(null);
  }

  if (checkingSession) {
    return (
      <main>
        <Header />
        <div className="max-w-2xl mx-auto px-6 py-16 text-slate-400 text-sm">Loading...</div>
        <Footer />
      </main>
    );
  }

  if (!session) {
    return (
      <main>
        <Header />
        <div className="max-w-sm mx-auto px-6 py-24 text-center">
          <h1 className="text-xl font-bold text-slate-900 mb-3">Sign in to submit a book</h1>
          <p className="text-sm text-slate-500 mb-6">You need an account to submit your book for review.</p>
          <a href="/signin" className="inline-block px-6 h-11 leading-[44px] rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition">
            Sign In
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Submit Your Book</h1>
        <p className="text-sm text-slate-500 mb-6">
          Submit your complete book — details, PDF, and cover — for review. If approved, you'll earn 70% of each sale.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Book Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full h-11 px-3 rounded-lg border border-slate-200" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Author Name</label>
            <input name="author" value={form.author} onChange={handleChange} required className="w-full h-11 px-3 rounded-lg border border-slate-200" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} required className="w-full px-3 py-2 rounded-lg border border-slate-200" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full h-11 px-3 rounded-lg border border-slate-200">
              <option value="Horror">Horror</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
              <option value="Mystery">Mystery</option>
              <option value="Fantasy">Fantasy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Price (USD)</label>
            <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" required className="w-full h-11 px-3 rounded-lg border border-slate-200" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Book File (PDF)</label>
            <input type="file" accept="application/pdf" onChange={(e) => setBookFile(e.target.files[0])} className="w-full text-sm" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image (JPG)</label>
            <input type="file" accept="image/jpeg" onChange={(e) => setCoverFile(e.target.files[0])} className="w-full text-sm" required />
          </div>

          <p className="text-xs text-slate-400">
            Book file and cover image combined must be under 5MB total.
          </p>

          <button type="submit" className="w-full h-12 rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition">
            Submit for Review
          </button>

          {status && <p className="text-sm text-slate-500 mt-2">{status}</p>}
        </form>
      </div>
      <Footer />
    </main>
  );
}