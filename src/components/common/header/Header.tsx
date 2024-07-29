"use client";
import { getUser } from "@/apis/auth";
import { useAuthStore } from "@/zustand/authStore";
import Link from "next/link";
import { useEffect } from "react";
import AuthHeader from "./AuthHeader";
import GlobalNav from "./GlobalNav";
import MobileNav from "./MobileNav";
import WriteButton from "./WriteButton";

function Header() {
  const saveUser = useAuthStore((state) => state.saveUser);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    getUser().then((res) => saveUser(res.data.user));
  }, []);

  return (
    <header>
      <AuthHeader />
      <div className="container mx-auto max-w-[1024px] flex justify-center sm:justify-between items-center py-[18px]">
        <h1 className="text-[30px] font-extrabold">
          <Link href="/">혼자살때</Link>
        </h1>
        <div className="flex items-center">
          <GlobalNav />
          {user && <WriteButton />}
        </div>
      </div>
      <MobileNav />
    </header>
  );
}

export default Header;
