"use client";
import { getUser } from "@/apis/auth";
import { useAuthStore } from "@/zustand/authStore";
import { PropsWithChildren, useEffect } from "react";

function GetUserProvider({ children }: PropsWithChildren) {
  const saveUser = useAuthStore((state) => state.saveUser);

  useEffect(() => {
    getUser().then((res) => saveUser(res.data.user));
  }, []);
  return <div>{children}</div>;
}

export default GetUserProvider;
