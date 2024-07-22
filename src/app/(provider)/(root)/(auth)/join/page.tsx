import Page from "@/components/common/Page/Page";
import JoinButton from "@/components/login-join/join/JoinButton";
import JoinForm from "@/components/login-join/join/JoinForm";
import JoinTitle from "@/components/login-join/join/JoinTitle";

function JoinPage() {
  return (
    <Page>
      <JoinTitle />
      <JoinForm />
      <JoinButton />
    </Page>
  );
}

export default JoinPage;
