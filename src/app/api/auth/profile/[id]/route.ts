import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("nickname, profile_image_url")
    .eq("user_id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message });
  }
  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const supabase = createClient();

  const updateProfile = await request.json();

  const { data, error } = await supabase
    .from("profiles")
    .update(updateProfile)
    .eq("user_id", id)
    .select();

  console.log(error);
  if (error) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json(data);
}
