import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  //리스트
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("group_posts")
      .select(
        "id, title, is_finished, price, people_num , img_url, start_date, end_date, group_applications(id)"
      )
      .order("created_at", { ascending: false })
      .range(0, 1);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
}
