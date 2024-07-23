import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { nickname, email, password } = await request.json();
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: nickname,
      },
    },
  });

  if (error) {
    if (error.status == 422) {
      return Response.json(
        { message: "이미 존재하는 이메일입니다" },
        { status: error.status }
      );
    }
    return Response.json({ message: error.message }, { status: 401 });
  }

  const { error: profileError } = await supabase
    .from("profile")
    .insert([{ id: user.user?.id, nickname }]);

  if (profileError) {
    return Response.json({ message: profileError.message }, { status: 401 });
  }

  return NextResponse.json({
    message: "회원가입이 완료되었습니다",
  });
}
