import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

//내역조회
export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const paymentId = url.searchParams.get("paymentId");
    console.log(paymentId);
    const response = await fetch(
      `https://api.portone.io/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `PortOne ${process.env.NEXT_PUBLIC_PORTONE_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export async function POST(request: NextRequest) {
  // 공구템 작성
  const newPayment = await request.json();
  try {
    const supabase = createClient();
    const { data } = await supabase.from("payments").insert(newPayment);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 등록하는 데 실패했습니다." });
  }
}
