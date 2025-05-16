import { create } from 'zustand';

type MoodEntry = {
  id: number;
  mood: string;
  note: string;
  affirmation: string;
  date: string;
  tags: string[];
};

type MoodStore = {
  entries: MoodEntry[];
  addEntry: (entry: MoodEntry) => void;

  selectedMood: string | null;
  setSelectedMood: (mood: string | null) => void;
};

export const useMoodStore = create<MoodStore>((set) => ({
  entries: [],
  addEntry: (entry) =>
    set((state) => ({
      entries: [...state.entries, entry],
    })),
  selectedMood: null,
  setSelectedMood: (mood) =>
    set((state) => {
      // Only set if the mood changes to avoid unnecessary re-renders
      if (state.selectedMood !== mood) {
        return { selectedMood: mood };
      }
      return state;
    }),
}));
