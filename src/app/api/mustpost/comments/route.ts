import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const newComment = await request.json();
  try {
    const supabase = createClient();
    const { data } = await supabase.from("must_comments").insert(newComment);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 등록하는 데 실패했습니다." });
  }
}

// export async function DELETE(request: NextRequest) {
//   try {
//     const commentId = await request.json();
//     const supabase = createClient();
//     const { data } = await supabase
//       .from("must_comments")
//       .delete()
//       .eq("id", commentId);
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: "댓글 삭제에 실패하였습니다!" });
//   }
// }

export async function DELETE(request: NextRequest) {
  try {
    const commentId = await request.json();
    const supabase = createClient();
    const { data } = await supabase.from("must_comments").delete().eq("id", commentId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "댓글 삭제에 실패하였습니다!" });
  }
}
