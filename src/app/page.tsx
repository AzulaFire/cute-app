// app/page.tsx or wherever your root layout is
'use client';
import { useMoodTheme } from '@/hooks/useMoodTheme';
import EntryForm from '@/components/EntryForm';
import EntryList from '@/components/EntryList';
import MoodAnalytics from '@/components/MoodAnalytics';

export default function Home() {
  const bgClass = useMoodTheme();

  return (
    // <div className={`min-h-screen p-4 transition-colors ${bgClass}`}>
    <div className={`min-h-screen p-4 transition-colors bg-zinc-100`}>
      <main className='flex h-screen'>
        <div className='w-1/2 overflow-y-auto space-y-4'>
          <EntryForm />
          <div className='sticky bottom-0 z-10 bg-white py-4'>
            <MoodAnalytics />
          </div>
        </div>
        <div className='w-1/2 p-4 overflow-y-scroll border-l'>
          <EntryList />
        </div>
      </main>
    </div>
  );
}
