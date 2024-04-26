import { create } from "zustand"

export const useSideBarToggle = create((set, get) => ({
    toggleCollapse: false,
    invokeToggleCollapse: () => set({ toggleCollapse: !get().toggleCollapse })
}))
