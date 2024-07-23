import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { categoryId: string } }) {
  const { categoryId } = params;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("must_posts")
      .select("id, title, item, img_url")
      .order("created_at", { ascending: false })
      .eq("category_id", categoryId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
}
