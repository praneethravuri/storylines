"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Pickaxe, BookOpenText, Route } from 'lucide-react';
import Link from 'next/link';
import WordRotate from './magicui/word-rotate';

const cardContent = [
  { icon: Pickaxe, title: "Create", tagline: "Craft your own stories or add new chapters to existing tales." },
  { icon: BookOpenText, title: "Explore", tagline: "Dive into new stories and discover captivating narratives created by others." },
  { icon: Route, title: "Navigate", tagline: "Choose your path and explore different storylines and possibilities." },
]

const LandingPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen flex flex-col pt-40 items-center bg-surface-100 text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary-300 to-primary-600 text-transparent bg-clip-text">
              Create Your Own {mounted && (
                <WordRotate
                  className="text-4xl font-bold"
                  words={["Story", "Hero", "Path", "Fantasy"]}
                />
              )}
            </h1>
            <p className="text-xl mb-8 text-black dark:text-surface-600">
              Unlock your creativity and bring your stories to everyone.
            </p>
            <div>
              <Link href="/storymap" className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-surface-100 bg-primary-500 hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl">
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative h-96 w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-400 rounded-2xl transform rotate-3 scale-95 opacity-50 blur-2xl"></div>
            <Image
              src="/landing-page-images/hero.png"
              layout="fill"
              objectFit="contain"
              alt="Hero image"
              className="relative z-10 rounded-lg"
            />
          </div>
        </div>
      </div>

      <hr className='border border-surface-300 w-2/3 my-8 mx-auto' />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardContent.map(({ icon: Icon, title, tagline }, index) => (
            <div key={index} className="p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <div className="logo mb-4">
                <Icon size={48} className="text-primary-500" />
              </div>
              <div className="heading text-2xl font-semibold mb-2">{title}</div>
              <div className="tagline text-surface-600">
                <p>{tagline}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}

export default LandingPage;
