import { create } from 'zustand'

export const useStore = create((set) => ({
    behaviors: null,
    selectedCompetency: "ADAPT AND RESPOND PROACTIVELY",
    selectedTitle: "Is flexible and embraces change wholeheartedly",
    setBehaviors: (behaviors) => set({ behaviors }),
    setSelectedCompetency: (competency) => set({ selectedCompetency: competency }),
    setSelectedTitle: (title) => set({ selectedTitle: title })
}))