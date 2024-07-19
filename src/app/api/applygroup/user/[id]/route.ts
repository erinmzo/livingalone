import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // 명단 가져오기
  // parmas : user id  / request: post id 를 넣어서 가져오기
  return NextResponse.json("");
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // 입금완료
  // parmas : user id  / request: post id 를 넣어서 수정 ㅗㅂ내기
  return NextResponse.json("");
}
