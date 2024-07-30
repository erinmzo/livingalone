import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;
  const supabase = createClient();
  const { data, error } = await supabase
    .from("must_wishes")
    .select("id,post_id, must_posts(title,item,img_url)")
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message });
  }
  return NextResponse.json(data);
}
