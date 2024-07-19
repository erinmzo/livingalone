import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // 게시글 상세 가져오기
  return NextResponse.json("");
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // 게시글 수정
  return NextResponse.json("");
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  //삭제
  return NextResponse.json("");
}
