import { useMoodStore } from '@/store/useMoodStore';

export function useMoodTheme(): string {
  const entries = useMoodStore((s) => s.entries);
  const latestMood = entries[entries.length - 1]?.mood;

  switch (latestMood) {
    case 'happy':
      return 'bg-yellow-50';
    case 'sad':
      return 'bg-blue-50';
    case 'angry':
      return 'bg-red-50';
    case 'anxious':
      return 'bg-purple-50';
    default:
      return 'bg-white';
  }
}
