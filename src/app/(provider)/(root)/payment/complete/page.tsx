import Page from "@/components/common/Page/Page";
import PaymentComplete from "@/components/payment/complete/PaymentComplete";
import React from "react";

function PaymentCompletePage({
  searchParams,
}: {
  searchParams: { paymentId: string };
}) {
  console.log(searchParams.paymentId);
  return (
    <Page>
      <PaymentComplete paymentId={searchParams.paymentId as string} />
    </Page>
  );
}

export default PaymentCompletePage;
