"use client";
import { useAuthStore } from "@/zustand/authStore";
import Image from "next/image";
import Link from "next/link";
import AuthHeader from "./AuthHeader";
import GlobalNav from "./GlobalNav";
import WriteButton from "./WriteButton";

function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header>
      <div>
        <AuthHeader />
        <div className="container mx-auto w-full max-w-[1024px] flex justify-center justify-between items-center py-[18px] px-[16px] lg:px-0">
          <h1 className="text-[30px] font-extrabold">
            <Link href="/">
              <Image src="/img/logo.svg" alt="혼자살때" width={90} height={0} />
            </Link>
          </h1>
          <div className="flex items-center">
            <GlobalNav />
            {user && <WriteButton />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
