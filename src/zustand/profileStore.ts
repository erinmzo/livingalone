import { create } from "zustand";

type EditProfile = {
  nickname: string;
  userPic: string;
  setNickname: (nickname: string) => void;
  setUserPic: (userPic: string) => void;
};

export const useEditProfile = create<EditProfile>((set) => ({
  nickname: "초기값",
  userPic: "",
  setNickname: (nickname) => set({ nickname }),
  setUserPic: (userPic) => set({ userPic }),
}));
