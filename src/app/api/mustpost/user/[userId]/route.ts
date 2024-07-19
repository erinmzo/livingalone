import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 유저가 쓴 글 가져오기
  return NextResponse.json("유저");
}
