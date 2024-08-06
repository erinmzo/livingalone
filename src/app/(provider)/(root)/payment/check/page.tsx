import Page from "@/components/common/Page/Page";
import PaymentCheck from "@/components/payment/check/PaymentCheck";
import React from "react";

function PaymentCheckPage({
  searchParams,
}: {
  searchParams: { paymentId: string; code: string };
}) {
  return (
    <Page>
      <PaymentCheck
        paymentId={searchParams.paymentId as string}
        code={searchParams.code as string}
      />
    </Page>
  );
}

export default PaymentCheckPage;
