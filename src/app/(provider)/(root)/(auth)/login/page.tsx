import Page from "@/components/common/Page/Page";

import AuthTitle from "@/components/auth/common/AuthTitle";
import LoginForm from "@/components/auth/login-join/login/LoginForm";

function LoginPage() {
  return (
    <Page>
      <AuthTitle title="로그인" />
      <LoginForm />
    </Page>
  );
}

export default LoginPage;
