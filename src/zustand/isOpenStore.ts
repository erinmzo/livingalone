import { create } from "zustand";

interface userState {
  isOpenAlarm: boolean;
  isOpenWriteButton: boolean;
  isOpenSideBar: boolean;
  setIsOpenAlarm: (isOpen: boolean) => void;
  setIsOpenWriteButton: (isOpen: boolean) => void;
  setIsOpenSideBar: (isOpen: boolean) => void;
  toggleIsOpenSideBar: () => void;
}

export const useIsOpen = create<userState>((set) => ({
  isOpenAlarm: false,
  isOpenWriteButton: false,
  isOpenSideBar: false,
  setIsOpenAlarm: (isOpen) => set({ isOpenAlarm: isOpen }),
  setIsOpenWriteButton: (isOpen) => set({ isOpenWriteButton: isOpen }),
  setIsOpenSideBar: (isOpen) => set({ isOpenSideBar: isOpen }),
  toggleIsOpenSideBar: () =>
    set((state) => ({ isOpenSideBar: !state.isOpenSideBar })),
}));
