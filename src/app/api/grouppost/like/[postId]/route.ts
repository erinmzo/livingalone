import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = params;
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("group_likes").select("*").eq("post_id", postId);
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 불러오는 데 실패했습니다." });
  }
}
