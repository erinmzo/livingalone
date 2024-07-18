import AuthContextProvider from "@/providers/AuthContextProvider";
import QueryProvider from "@/providers/QueryProvider";
import { PropsWithChildren } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryProvider>
  );
}

export default ProviderLayout;
