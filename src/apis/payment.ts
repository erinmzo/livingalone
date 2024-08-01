import { TNewPayment } from "@/types/types";

export async function insertPayment(newPayment: TNewPayment) {
  await fetch("/api/payment/complete", {
    method: "POST",
    body: JSON.stringify(newPayment),
  });
}

export async function editPayment(updatePayment: TNewPayment) {
  await fetch("/api/payment/complete", {
    method: "PUT",
    body: JSON.stringify(updatePayment),
  });
}

export async function refundPayment(paymentId: string) {
  const response = await fetch("/api/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentId }),
  });
  const data = await response.json();
  return data;
}

export async function getMyPayment(userId: string) {
  const response = await fetch(`/api/payment/${userId}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data;
}

export async function getPaymentAll() {
  await fetch("/api/payment");
}
