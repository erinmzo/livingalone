import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// 댓글 가져오기
export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  const supabase = createClient();
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const { data, count } = await supabase
      .from("must_comments")
      .select("*, must_posts(*), profiles(*)", { count: "exact" })
      .eq("post_id", postId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    return NextResponse.json({ data, count, page, limit });
  } catch (error) {
    return NextResponse.json({ error: "댓글을 가져오는데 실패했습니다." });
  }
}
