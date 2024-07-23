import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  return NextResponse.json("");
}
