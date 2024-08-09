import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// 댓글 가져오기
export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  const supabase = createClient();
  try {
    const { data } = await supabase
      .from("must_comments")
      .select("*, must_posts(*), profiles(*)")
      // must_posts(id, user_id), profiles(nickname, profile_img_url)
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    // console.log(postId);

    // console.log("라우트 핸들러 데이터", data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "댓글을 가져오는데 실패했습니다." });
  }
}

// 게시글(must_post)의 id와 댓글(must_comment)의 post_id가 같아야 한다 >> 해당하는 게시물의 댓글 가져오기
// 댓글(must_comment)의 user_id와 같은 유저 정보(profiles)의 user_id가 같아야 한다 >> 해당하는 유저의 프로필 가져오기
// 전체 댓글 가져오기 (쓰여져있는)
