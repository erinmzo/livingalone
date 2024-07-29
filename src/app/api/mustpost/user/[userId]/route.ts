<<<<<<< HEAD
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   // 유저가 쓴 글 가져오기
//   return NextResponse.json("유저");
// }

import { createClient } from "@/supabase/server";
=======
import { createClient } from "@/supabase/client";
>>>>>>> 6c4665f9748408d8ad932a6dceb98fa5766fb936
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const supabase = createClient();
<<<<<<< HEAD
  try {
    const { data } = await supabase
      .from("must_posts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "포스트를 가져오는 데 실패했습니다." });
  }
  // 유저가 쓴 글 가져오기
=======
  console.log(userId);
  const { data, error } = await supabase
    .from("must_wishes")
    .select("id,post_id, must_posts(title,item,img_url)")
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message });
  }
  return NextResponse.json(data);
>>>>>>> 6c4665f9748408d8ad932a6dceb98fa5766fb936
}
