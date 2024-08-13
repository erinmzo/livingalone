import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// 댓글 가져오기
export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
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

// 게시글(must_post)의 id와 댓글(must_comment)의 post_id가 같아야 한다 >> 해당하는 게시물의 댓글 가져오기
// 댓글(must_comment)의 user_id와 같은 유저 정보(profiles)의 user_id가 같아야 한다 >> 해당하는 유저의 프로필 가져오기
// 전체 댓글 가져오기 (쓰여져있는)
