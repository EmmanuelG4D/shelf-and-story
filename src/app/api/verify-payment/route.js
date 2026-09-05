import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
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

    const { error: insertError } = await supabaseAdmin.from("purchases").insert([
      {
        user_id: userId,
        book_id: bookId,
      },
    ]);

    if (insertError) {
      return Response.json({ error: insertError.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}