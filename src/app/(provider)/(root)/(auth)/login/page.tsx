import Page from "@/components/common/Page/Page";
import LoginButton from "@/components/login-join/login/LoginButton";
import LoginForm from "@/components/login-join/login/LoginForm";
import LoginTitle from "@/components/login-join/login/LoginTitle";

function LoginPage() {
  return (
    <Page>
      <LoginTitle />
      <LoginForm />
      <LoginButton />
    </Page>
  );
}

export default LoginPage;
