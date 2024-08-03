import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // 공구 신청
  const newGroupApply = await request.json();
  try {
    const supabase = createClient();
    const { data } = await supabase.from("group_applications").insert(newGroupApply);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 등록하는 데 실패했습니다." });
  }
}
