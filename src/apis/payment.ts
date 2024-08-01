export async function insertPayment(newPayment: any) {
  await fetch("/api/payment/complete", {
    method: "POST",
    body: JSON.stringify(newPayment),
  });
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
