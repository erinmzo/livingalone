import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("alarm")
      .select("*,group_posts(title, img_url), must_posts(title, img_url)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 불러오는 데 실패했습니다." });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;
  const alarm = await request.json();

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("alarm").update(alarm).eq("user_id", userId).eq("id", alarm.id);
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 불러오는 데 실패했습니다." });
  }
}

export async function DELETE(request: NextRequest) {
  const alarm = await request.json();

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("alarm").delete().eq("id", alarm.id);

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 불러오는 데 실패했습니다." });
  }
}
