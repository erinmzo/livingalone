"use client";

import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import PaymentMain from "@/components/payment/PaymentMain";
import IsOpenProvider from "@/providers/IsOpenProvider";

function PaymentPage() {
  return (
    <>
      <MobileHeader />
      <IsOpenProvider>
        <main>
          <PaymentMain />
        </main>
      </IsOpenProvider>
      <MobileNav />
    </>
  );
}

export default PaymentPage;
