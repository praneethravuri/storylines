"use client";
import React, { useState, useEffect } from 'react';
import WordRotate from "../magicui/word-rotate";

const shuffleArray = (array: string[]): string[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const LoadingScreen: React.FC = () => {
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);

  useEffect(() => {
    const words = ["Write Your Own Tales", "Weave Your Own Adventures", "Create Your Own Path"];
    setShuffledWords(shuffleArray(words));
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-[10001]">
      <WordRotate
        className="text-4xl font-bold text-foreground bg-background"
        words={shuffledWords}
      />
    </div>
  );
}

export default LoadingScreen;
