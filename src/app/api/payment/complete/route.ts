import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   console.log(request);
//   try {
//     // 요청의 body로 paymentId가 전달되기를 기대합니다.
//     const body = await request.json();
//     const { paymentId } = body;

//     // paymentId가 없는 경우 에러를 던집니다.
//     if (!paymentId) {
//       throw new Error("paymentId is required");
//     }

//     // 1. 포트원 결제내역 단건조회 API 호출
//     const paymentResponse = await fetch(
//       `https://api.portone.io/payments/${paymentId}`,
//       {
//         headers: {
//           Authorization: `PortOne ${process.env.PORTONE_API_KEY}`,
//         },
//       }
//     );
//     if (!paymentResponse.ok)
//       throw new Error(`paymentResponse: ${await paymentResponse.json()}`);
//     const payment = await paymentResponse.json();
//   } catch (e) {
//     // 결제 검증에 실패했습니다.
//     // res.status(400).send(e);
//   }
// }

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
          Authorization: `PortOne ${process.env.PORTONE_API_KEY}`,
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
