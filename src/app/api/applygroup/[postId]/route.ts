import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  const supabase = createClient();

  const newGroupApply = await request.json();

  const { data, error } = await supabase
    .from("group_applications")
    .update(newGroupApply)
    .eq("id", postId)
    .select();

  console.log(error);
  if (error) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json(data);
}
