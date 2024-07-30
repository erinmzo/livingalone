import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const supabase = createClient();
  try {
    const { data } = await supabase
      .from("group_applications")
      .select(
        "*, group_posts(id, title, is_finished, price, people_num , img_url, start_date, end_date)"
      )
      .eq("user_id", userId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "포스트를 가져오는 데 실패했습니다." });
  }
}
