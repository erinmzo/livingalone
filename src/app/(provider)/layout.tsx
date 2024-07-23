import QueryProvider from "@/providers/QueryProvider";
import { PropsWithChildren } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  return <QueryProvider>{children}</QueryProvider>;
}

export default ProviderLayout;
