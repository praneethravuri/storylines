"use client";
import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link';
import WordRotate from './magicui/word-rotate';

const LandingPage = () => {
  return (
    <main className="min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <p className="text-5xl font-bold mb-6">Create Your Own <span><WordRotate
              className="text-4xl font-bold text-black dark:text-white"
              words={["Story", "Hero", "Path", "Fantasy"]}
            /></span> </p>
            <p className="text-xl mb-8">Unlock your creativity and bring your ideas to life with our innovative platform. Start your journey today.</p>
            <div>
              <Link href="/storymap" className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-tertiary bg-accent-muted hover:bg-accent-muted/90 transition-colors">
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative h-96 w-full">
            <Image
              src="/landing-page-images/hero.png"
              layout="fill"
              objectFit="contain"
              alt="Hero image"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default LandingPage