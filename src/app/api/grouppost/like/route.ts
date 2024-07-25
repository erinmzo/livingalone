import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const likeData = await request.json();
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("group_likes").insert(likeData);
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 등록하는 데 실패했습니다." });
  }
}

export async function DELETE(request: NextRequest) {
  const likeData = await request.json();
  const { post_id, user_id } = await likeData;
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("group_likes").delete().eq("post_id", post_id).eq("user_id", user_id);
    if (error) return NextResponse.json({ error: "데이터를 등록하는 데 실패했습니다." });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 등록하는 데 실패했습니다." });
  }
}
