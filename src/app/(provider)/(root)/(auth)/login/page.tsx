import Page from "@/components/common/Page/Page";

import LoginForm from "@/components/login-join/login/LoginForm";
import LoginTitle from "@/components/login-join/login/LoginTitle";

function LoginPage() {
  return (
    <Page>
      <LoginTitle />
      <LoginForm />
    </Page>
  );
}

export default LoginPage;
