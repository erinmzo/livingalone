import Page from "@/components/common/Page/Page";
import PaymentComplete from "@/components/payment/complete/PaymentComplete";

function PaymentCompletePage({ searchParams }: { searchParams: { paymentId: string } }) {
  return (
    <Page>
      <PaymentComplete paymentId={searchParams.paymentId as string} />
    </Page>
  );
}

export default PaymentCompletePage;
