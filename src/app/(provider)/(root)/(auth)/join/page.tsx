import AuthTitle from "@/components/auth/common/AuthTitle";
import JoinForm from "@/components/auth/login-join/join/JoinForm";
import Page from "@/components/common/Page/Page";

function JoinPage() {
  return (
    <Page>
      <AuthTitle title="회원가입" />
      <JoinForm />
    </Page>
  );
}

export default JoinPage;
