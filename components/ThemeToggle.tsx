"use client"
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {SunIcon, MoonIcon} from "@radix-ui/react-icons"

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full text-foreground"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <SunIcon className="w-7 h-7" /> : <MoonIcon className="w-7 h-7" />}
    </button>
  );
};

export default ThemeToggle;