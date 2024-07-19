import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //리스트 전체
  const supabase = createClient();
  const { data, error } = await supabase.from("group_posts").select();

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  //작성
  return NextResponse.json("");
}
