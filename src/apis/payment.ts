export async function insertPayment(newPayment: any) {
  console.log(newPayment);
  await fetch("/api/payment/complete", {
    method: "POST",
    body: JSON.stringify(newPayment),
  });
}
