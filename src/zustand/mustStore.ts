import { create } from "zustand";

type CategoryState = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategory: "ALL",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
