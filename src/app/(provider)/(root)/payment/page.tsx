"use client";

import Page from "@/components/common/Page/Page";
import PaymentMain from "@/components/payment/PaymentMain";
import PortOne from "@portone/browser-sdk/v2";

function PaymentPage() {
  return (
    <Page>
      <PaymentMain />
    </Page>
  );
}

export default PaymentPage;
