import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // 프로필 수정
  const formData = await request.formData();
  const newProfileImage: any = formData.get("file");
  try {
    const supabase = createClient();
    const { data } = await supabase.storage.from("profile").upload(`profile_${Date.now()}.png`, newProfileImage, {
      cacheControl: "600",
      upsert: false,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 등록하는 데 실패했습니다." });
  }
}
