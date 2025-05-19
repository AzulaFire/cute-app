'use client';
import { useMoodStore } from '@/store/useMoodStore';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function getMoodBackground(mood: string) {
  switch (mood) {
    case 'happy':
      return 'bg-yellow-500';
    case 'sad':
      return 'bg-blue-500';
    case 'angry':
      return 'bg-red-500';
    case 'anxious':
      return 'bg-purple-500';
    default:
      return 'bg-white';
  }
}

export default function EntryList() {
  const entries = useMoodStore((s) => s.entries);
  const selectedMood = useMoodStore((s) => s.selectedMood);

  const filteredEntries = selectedMood
    ? entries.filter((e) => e.mood === selectedMood)
    : entries;

  return (
    <div className='space-y-4 my-4'>
      {filteredEntries.length > 0 && (
        <h2 className='text-center font-bold text-2xl'>Mood Entries</h2>
      )}
      {filteredEntries.map((e) => (
        <motion.div
          key={e.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={getMoodBackground(e.mood)}>
            <CardHeader>
              <CardTitle className='capitalize'>{e.mood}</CardTitle>
              <CardDescription>{e.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <blockquote className='italic text-sm mb-2'>
                “{e.affirmation}”
              </blockquote>
              <p className='text-sm mb-1'>{e.note}</p>
              <div className='flex gap-2 flex-wrap text-xs text-muted-foreground'>
                {e.tags.map((tag, idx) => (
                  <span key={idx} className='px-2 py-1 bg-gray-100 rounded'>
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
