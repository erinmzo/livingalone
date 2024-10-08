import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = params;
  const supabase = createClient();
  try {
    const { data } = await supabase
      .from("group_posts")
      .select("*, profiles(nickname, profile_image_url)")
      .eq("id", postId)
      .single();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "포스트를 가져오는 데 실패했습니다." });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = params;
  const newGroupPost = await request.json();

  const supabase = createClient();
  try {
    const { data } = await supabase.from("group_posts").update(newGroupPost).eq("id", postId);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "포스트를 수정하는 데 실패했습니다." });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = params;
  try {
    const supabase = createClient();
    const { data } = await supabase.from("group_posts").delete().eq("id", postId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "포스트를 삭제하는 데 실패했습니다." });
  }
}
