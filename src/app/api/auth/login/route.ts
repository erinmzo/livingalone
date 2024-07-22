import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email: "example@email.com",
    password: "example-password",
  });
  return NextResponse.json("");
}
