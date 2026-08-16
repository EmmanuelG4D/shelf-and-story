"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    category: "Horror",
    price: "",
    rating: "",
    badge: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Saving...");

    const { error } = await supabase.from("books").insert([
      {
        title: form.title,
        author: form.author,
        description: form.description,
        category: form.category,
        price: parseFloat(form.price),
        rating: parseFloat(form.rating) || 0,
        badge: form.badge || null,
      },
    ]);

    if (error) {
      setStatus("Error: " + error.message);
    } else {
      setStatus("Book added successfully!");
      setForm({
        title: "",
        author: "",
        description: "",
        category: "Horror",
        price: "",
        rating: "",
        badge: "",
      });
    }
  }

  if (checkingSession) {
    return <main className="max-w-sm mx-auto px-6 py-24 text-slate-400 text-sm">Loading...</main>;
  }

  if (!session) {
    return (
      <main className="max-w-sm mx-auto px-6 py-24">
        <h1 className="text-xl font-bold text-slate-900 mb-6">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full h-11 px-3 rounded-lg border border-slate-200"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-11 px-3 rounded-lg border border-slate-200"
          />
          <button type="submit" className="w-full h-11 rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition">
            Log In
          </button>
          {authError && <p className="text-sm text-red-600">{authError}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Add a New Book</h1>
        <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-slate-800">Log Out</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input name="title" value={form.title} onChange={handleChange} required className="w-full h-11 px-3 rounded-lg border border-slate-200" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
          <input name="author" value={form.author} onChange={handleChange} required className="w-full h-11 px-3 rounded-lg border border-slate-200" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full px-3 py-2 rounded-lg border border-slate-200" />
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
          <label className="block text-sm font-medium text-slate-700 mb-1">Rating (optional)</label>
          <input name="rating" value={form.rating} onChange={handleChange} type="number" step="0.1" max="5" className="w-full h-11 px-3 rounded-lg border border-slate-200" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Badge (optional)</label>
          <input name="badge" value={form.badge} onChange={handleChange} placeholder="e.g. Bestseller, New Release" className="w-full h-11 px-3 rounded-lg border border-slate-200" />
        </div>

        <button type="submit" className="w-full h-12 rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition">
          Add Book
        </button>

        {status && <p className="text-sm text-slate-500 mt-2">{status}</p>}
      </form>
    </main>
  );
}