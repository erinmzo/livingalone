import NotiflixProvider from "@/providers/NotiflixProvider";
import QueryProvider from "@/providers/QueryProvider";
import { PropsWithChildren } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <NotiflixProvider>{children}</NotiflixProvider>
    </QueryProvider>
  );
}

export default ProviderLayout;
