import Page from "@/components/common/Page/Page";
import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import PaymentComplete from "@/components/payment/complete/PaymentComplete";

function PaymentCompletePage({
  searchParams,
}: {
  searchParams: { paymentId: string };
}) {
  return (
    <>
      <MobileHeader />
      <Page>
        <PaymentComplete paymentId={searchParams.paymentId} />
      </Page>
      <MobileNav />
    </>
  );
}

export default PaymentCompletePage;
