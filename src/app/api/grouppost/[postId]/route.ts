import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // 게시글 상세 가져오기
  return NextResponse.json("");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // 게시글 수정
  return NextResponse.json("");
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  //삭제
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("group_posts")
      .delete()
      .eq("id", postId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "포스트를 삭제하는 데 실패했습니다." });
  }
}
