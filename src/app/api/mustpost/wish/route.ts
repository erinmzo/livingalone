import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const wishData = await request.json();
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("must_wishes").insert(wishData);
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 등록하는 데 실패했습니다." });
  }
}

export async function DELETE(request: NextRequest) {
  const wishData = await request.json();
  const { post_id, user_id } = await wishData;
  try {
    const supabase = createClient();
    const { error } = await supabase.from("must_wishes").delete().eq("post_id", post_id).eq("user_id", user_id);

    if (error) throw error;
  } catch (error) {
    return NextResponse.json({ error: "데이터를 등록하는 데 실패했습니다." });
  }
}
