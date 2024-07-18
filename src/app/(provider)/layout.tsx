import AuthContextProvider from "@/queries/AuthContextProvider";
import QueryProvider from "@/queries/QueryProvider";
import { PropsWithChildren } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <AuthContextProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthContextProvider>
  );
}

export default ProviderLayout;
