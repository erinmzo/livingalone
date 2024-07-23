import JoinForm from "@/components/auth/login-join/join/JoinForm";
import JoinTitle from "@/components/auth/login-join/join/JoinTitle";
import Page from "@/components/common/Page/Page";

function JoinPage() {
  return (
    <Page>
      <JoinTitle />
      <JoinForm />
    </Page>
  );
}

export default JoinPage;
