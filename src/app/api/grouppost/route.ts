import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  //전체리스트
  return NextResponse.json("");
}

export async function POST(request: NextRequest) {
  const ddd = await request.json();
  console.log(ddd);
  //작성
  console.log("이것이 리퀘스트여" + request);
  console.log("haha,,,");
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("group_posts").insert(ddd);
  } catch {}
  return NextResponse.json("");
}
