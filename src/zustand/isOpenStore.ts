import { create } from "zustand";

interface userState {
  isOpenAlarm: boolean;
  isOpenWriteButton: boolean;
  isOpenSideBar: boolean;
  isOpenFrontBanner: boolean;
  setIsOpenAlarm: (isOpen: boolean) => void;
  setIsOpenWriteButton: (isOpen: boolean) => void;
  setIsOpenSideBar: (isOpen: boolean) => void;
  setIsOpenFrontBanner: (isOpen: boolean) => void;
  toggleIsOpenSideBar: () => void;
}

export const useIsOpen = create<userState>((set) => ({
  isOpenAlarm: false,
  isOpenWriteButton: false,
  isOpenSideBar: false,
  isOpenFrontBanner: true,
  setIsOpenAlarm: (isOpen) => set({ isOpenAlarm: isOpen }),
  setIsOpenWriteButton: (isOpen) => set({ isOpenWriteButton: isOpen }),
  setIsOpenSideBar: (isOpen) => set({ isOpenSideBar: isOpen }),
  setIsOpenFrontBanner: (isOpen) => set({ isOpenFrontBanner: isOpen }),
  toggleIsOpenSideBar: () => set((state) => ({ isOpenSideBar: !state.isOpenSideBar })),
}));
