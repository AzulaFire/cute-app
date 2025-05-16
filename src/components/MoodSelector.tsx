'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaSmile, FaFrown, FaAngry, FaMeh } from 'react-icons/fa';

const moods = [
  { label: 'happy', icon: <FaSmile className='text-yellow-400' /> },
  { label: 'sad', icon: <FaFrown className='text-blue-400' /> },
  { label: 'angry', icon: <FaAngry className='text-red-400' /> },
  { label: 'anxious', icon: <FaMeh className='text-purple-400' /> },
];

type Props = {
  selected: string | null;
  onSelect: (mood: string) => void;
};

export default function MoodSelector({ selected, onSelect }: Props) {
  return (
    <div className='flex gap-4 justify-center'>
      {moods.map((m) => (
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          key={m.label}
          className={`p-3 rounded-full border-2 transition ${
            selected === m.label ? 'border-black' : 'border-gray-300'
          }`}
          onClick={() => onSelect(m.label)}
        >
          {m.icon}
        </motion.button>
      ))}
    </div>
  );
}
