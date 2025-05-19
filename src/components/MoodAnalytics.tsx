'use client';
import { useMoodStore } from '@/store/useMoodStore';
import { Button } from '@/components/ui/button';
import MoodTrendChart from './MoodTrendChart';

export default function MoodAnalytics({ className = '' }) {
  const entries = useMoodStore((s) => s.entries);
  const setSelectedMood = useMoodStore((s) => s.setSelectedMood); // ✅ separate

  const counts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const moods = Object.entries(counts);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className='flex gap-2 flex-wrap ml-4'>
        <Button
          variant='outline'
          className='cursor-pointer'
          onClick={() => setSelectedMood(null)}
        >
          All
        </Button>
        {moods.map(([mood, count]) => (
          <Button
            key={mood}
            variant='secondary'
            onClick={() => setSelectedMood(mood)}
            className='capitalize cursor-pointer'
          >
            {mood} ({count})
          </Button>
        ))}
      </div>
      <MoodTrendChart />
    </div>
  );
}
