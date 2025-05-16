'use client';
import { useState } from 'react';
import MoodSelector from './MoodSelector';
import { useMoodStore } from '@/store/useMoodStore';
import { affirmations } from '@/lib/backend';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function EntryForm() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [tags, setTags] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const addEntry = useMoodStore((s) => s.addEntry);

  const handleSubmit = () => {
    if (!mood) {
      toast.error('Please select a mood', {
        description: 'You must choose a mood before saving.',
      });
      return;
    }

    const affs = affirmations[mood];
    const affirmation = affs[Math.floor(Math.random() * affs.length)];

    const newEntry = {
      id: Date.now(),
      mood,
      note,
      affirmation,
      date: new Date().toLocaleDateString(),
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    addEntry(newEntry);

    // Reset form state
    setNote('');
    setMood('');
    setTags('');
    setSelectedMood(null);

    toast.success('Mood saved!', {
      description: `Your "${mood}" mood was recorded.`,
    });
  };

  return (
    <Card className='max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-center'>
          How are you feeling today?
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Label className='mb-2 block text-sm'>Select a mood</Label>
        <MoodSelector
          selected={selectedMood}
          onSelect={(m) => {
            setMood(m);
            setSelectedMood(m);
          }}
        />

        <Separator className='my-4' />

        <Label htmlFor='note' className='block mb-2'>
          Write a note
        </Label>
        <Textarea
          id='note'
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder='Write something about your day...'
          className='resize-none'
        />
        <Separator className='my-4' />
        <Label htmlFor='tags' className='block mb-2'>
          Tags (comma-separated)
        </Label>
        <Input
          id='tags'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder='e.g. work, stress, gym'
        />
      </CardContent>

      <CardFooter>
        <Button className='w-full' onClick={handleSubmit}>
          Save Entry
        </Button>
      </CardFooter>
    </Card>
  );
}
