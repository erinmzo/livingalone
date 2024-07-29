import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const supabase = createClient();
  try {
    const { data } = await supabase
      .from("group_posts")
      .select(`*, group_applications(*)`)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "포스트를 가져오는 데 실패했습니다." });
  }
  // 유저가 쓴 글 가져오기
}
