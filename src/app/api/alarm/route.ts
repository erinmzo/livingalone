import { createClient } from "@/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const alarm = await request.json();
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("alarm").insert(alarm).select();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 추가하는데 실패했습니다." });
  }
}
