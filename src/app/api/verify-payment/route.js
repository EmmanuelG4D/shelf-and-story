import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const MAX_REQUESTS = 5;
const WINDOW_SECONDS = 60;

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    const windowStart = new Date(Date.now() - WINDOW_SECONDS * 1000).toISOString();

    const { count } = await supabaseAdmin
      .from("rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("ip", ip)
      .eq("endpoint", "verify-payment")
      .gte("created_at", windowStart);

    if (count !== null && count >= MAX_REQUESTS) {
      return Response.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    await supabaseAdmin.from("rate_limits").insert([
      { ip, endpoint: "verify-payment" },
    ]);

    const { reference, userId, bookId } = await request.json();

    if (!reference || !userId || !bookId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      return Response.json({ error: "Payment could not be verified" }, { status: 400 });
    }

    const { data: existing } = await supabaseAdmin
      .from("purchases")
      .select("id")
      .eq("user_id", userId)
      .eq("book_id", bookId)
      .maybeSingle();

    if (existing) {
      return Response.json({ success: true, message: "Purchase already recorded" });
    }

    const { data: purchaseRow, error: insertError } = await supabaseAdmin
      .from("purchases")
      .insert([
        {
          user_id: userId,
          book_id: bookId,
        },
      ])
      .select()
      .single();

    if (insertError) {
      return Response.json({ error: insertError.message }, { status: 500 });
    }

    const { data: book } = await supabaseAdmin
      .from("books")
      .select("author_id, price, revenue_share")
      .eq("id", bookId)
      .single();

    if (book && book.author_id) {
      const authorShare = book.revenue_share ?? 0.70;
      const amountOwed = Math.round(book.price * authorShare * 100) / 100;

      await supabaseAdmin.from("author_earnings").insert([
        {
          author_id: book.author_id,
          book_id: bookId,
          purchase_id: purchaseRow.id,
          amount_owed: amountOwed,
        },
      ]);
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}