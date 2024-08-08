import AuthTitle from "@/components/auth/common/AuthTitle";
import JoinForm from "@/components/auth/login-join/join/JoinForm";
import Page from "@/components/common/Page/Page";
import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import IsOpenProvider from "@/providers/IsOpenProvider";

function JoinPage() {
  return (
    <>
      <MobileHeader title="회원가입" alarm={false} />
      <IsOpenProvider>
        <main>
          <Page>
            <AuthTitle title="회원가입" />
            <JoinForm />
          </Page>
        </main>
      </IsOpenProvider>
      <MobileNav />
    </>
  );
}

export default JoinPage;
