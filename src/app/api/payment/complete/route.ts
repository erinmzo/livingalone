// import { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   try {
//     // 요청의 body로 paymentId가 전달되기를 기대합니다.
//     const { paymentId, orderId } = request.body;

//     // 1. 포트원 결제내역 단건조회 API 호출
//     const paymentResponse = await fetch(
//       `https://api.portone.io/payments/${paymentId}`,
//       {
//         headers: {
//           Authorization: `PortOne qtJ1xXWp1Tf5vcByQxwAKqeMYFlDp5OEzADIXjmucHzLUOK04Fap3SN7HhkG63uOpkafogsrikV62TWv`,
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
