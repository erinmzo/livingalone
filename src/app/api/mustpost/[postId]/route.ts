import { createClient } from "@/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  //상세 가져오기
  const { postId } = params;
  const supabase = createClient();
  try {
    const { data } = await supabase
      .from("must_posts")
      .select(`*, must_categories(id, name)`)
      .eq("id", postId)
      .single();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "포스트를 가져오는 데 실패했습니다." });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //수정
  return NextResponse.json("");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //삭제
  return NextResponse.json("");
}
