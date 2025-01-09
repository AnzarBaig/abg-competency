import { create } from 'zustand';

export const useStore = create((set) => ({
    behaviors: null,
    selectedCompetency: "ADAPT AND RESPOND PROACTIVELY",
    selectedTitle: "",
    selectedThemeColor: ["asliOrange", "halkaOrange"],
    setBehaviors: (behaviors) => set({ behaviors }),
    setSelectedCompetency: (competency) => set({ selectedCompetency: competency }),
    setSelectedTitle: (title) => set({ selectedTitle: title }),
    setSelectedThemeColor: (themeColor) => set({ selectedThemeColor: themeColor }),
}));
