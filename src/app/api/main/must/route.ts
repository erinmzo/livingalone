import { createClient } from "@/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("must_posts")
      .select("id, title, item, img_url")
      .order("created_at", { ascending: false })
      .range(0, 2);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
}
