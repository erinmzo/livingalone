"use client";
import { useIsOpen } from "@/zustand/isOpenStore";
import { PropsWithChildren } from "react";

function IsOpenProvider({ children }: PropsWithChildren) {
  const setIsOpenAlarm = useIsOpen((state) => state.setIsOpenAlarm);
  const setIsOpenWriteButton = useIsOpen((state) => state.setIsOpenWriteButton);

  const handleCloseModal = () => {
    setIsOpenAlarm(false);
    setIsOpenWriteButton(false);
  };
  return <div onClick={handleCloseModal}>{children}</div>;
}

export default IsOpenProvider;
