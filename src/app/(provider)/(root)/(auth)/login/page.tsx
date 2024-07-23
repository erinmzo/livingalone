import Page from "@/components/common/Page/Page";

import LoginForm from "@/components/auth/login-join/login/LoginForm";
import LoginTitle from "@/components/auth/login-join/login/LoginTitle";

function LoginPage() {
  return (
    <Page>
      <LoginTitle />
      <LoginForm />
    </Page>
  );
}

export default LoginPage;
