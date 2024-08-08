import { create } from "zustand";

interface alarmState {
  isAlarm: boolean;
  setIsAlarm: (isConfirm: boolean) => void;
}

export const useIsAlarm = create<alarmState>((set) => ({
  isAlarm: false,
  setIsAlarm: (isConfirm) => set({ isAlarm: isConfirm }),
}));
