import AuthContextProvider from "@/providers/AuthContextProvider";
import QueryProvider from "@/providers/QueryProvider";
import { PropsWithChildren } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <AuthContextProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthContextProvider>
  );
}

export default ProviderLayout;
