import { createClient } from "@/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "아이디가 업습니다" });
  }
  const { data, error } = await supabase
    .from("profiles")
    .select("nickname, profile_image_url")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message });
  }
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const { nickname, profile_image_url } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "ID is required" });
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ nickname, profile_image_url })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json(data);
}
