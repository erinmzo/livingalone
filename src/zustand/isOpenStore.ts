import { create } from "zustand";

interface userState {
  isOpenAlarm: boolean;
  isOpenWriteButton: boolean;
  setIsOpenAlarm: (isOpen: boolean) => void;
  setIsOpenWriteButton: (isOpen: boolean) => void;
}

export const useIsOpen = create<userState>((set) => ({
  isOpenAlarm: false,
  isOpenWriteButton: false,
  setIsOpenAlarm: (isOpen) => set({ isOpenAlarm: isOpen }),
  setIsOpenWriteButton: (isOpen) => set({ isOpenWriteButton: isOpen }),
}));
