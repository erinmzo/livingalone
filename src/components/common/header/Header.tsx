"use client";
import { useAuthStore } from "@/zustand/authStore";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect } from "react";
import AuthHeader from "./AuthHeader";
import GlobalNav from "./GlobalNav";
import MobileNav from "./MobileNav";
import WriteButton from "./WriteButton";

interface UserProps {
  user: User | null;
}
function Header({ userSessionInfo }: { userSessionInfo: UserProps }) {
  const saveUser = useAuthStore((state) => state.saveUser);

  useEffect(() => {
    if (userSessionInfo) {
      saveUser(userSessionInfo.user);
    } else {
      saveUser(null);
    }
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
          <WriteButton />
        </div>
      </div>
      <MobileNav />
    </header>
  );
}

export default Header;
