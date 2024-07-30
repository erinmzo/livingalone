import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;
    const supabase = createClient();

    const newGroupApply = await request.json();
    console.log(newGroupApply);
    console.log(postId);

    const { data } = await supabase
      .from("group_applications")
      .update(newGroupApply)
      .eq("id", postId)
      .select();

    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 수정하는 데 실패했습니다." });
  }
}
