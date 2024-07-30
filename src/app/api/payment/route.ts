import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { paymentId } = await request.json();
    const response = await fetch(
      `https://api.portone.io/payments/${paymentId}/cancel`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `PortOne ${process.env.NEXT_PUBLIC_PORTONE_API_KEY}`,
        },
        body: '{"reason":"실제 상품이 아니므로 환불됩니다. 구매해주셔서 감사합니다!"}',
      }
    );
    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "환불 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
