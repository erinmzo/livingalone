import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  //리스트
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("group_posts")
      .select(
        "id, title, is_finished, price, people_num , img_url, start_date, end_date"
      )
      .order("created_at", { ascending: false })
      .range(0, 1);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
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
