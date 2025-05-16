'use client';
import { useMoodStore } from '@/store/useMoodStore';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useMemo } from 'react';

export default function MoodTrendChart() {
  const entries = useMoodStore((s) => s.entries);

  // Aggregate moods per date
  const data = useMemo(() => {
    const moodCountByDate: Record<string, Record<string, number>> = {};

    entries.forEach((entry) => {
      const date = entry.date;
      if (!moodCountByDate[date]) {
        moodCountByDate[date] = {};
      }
      moodCountByDate[date][entry.mood] =
        (moodCountByDate[date][entry.mood] || 0) + 1;
    });

    return Object.entries(moodCountByDate).map(([date, moods]) => ({
      date,
      ...moods,
    }));
  }, [entries]);

  return (
    <div className='w-full h-32 mt-4'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type='monotone' dataKey='happy' stroke='#facc15' />
          <Line type='monotone' dataKey='sad' stroke='#60a5fa' />
          <Line type='monotone' dataKey='angry' stroke='#f87171' />
          <Line type='monotone' dataKey='anxious' stroke='#a78bfa' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
