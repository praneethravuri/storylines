import React from 'react';
import Link from 'next/link';
import { Github, ArrowRight, Pickaxe, BookOpenText, Route } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

const cardContent = [
  { icon: Pickaxe, title: "Create", tagline: "Craft your own stories or add new chapters to existing tales." },
  { icon: BookOpenText, title: "Explore", tagline: "Dive into new stories and discover captivating narratives created by others." },
  { icon: Route, title: "Navigate", tagline: "Choose your path and explore different storylines and possibilities." },
]

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      <header className="flex justify-between items-center py-4 px-20 border border-b-surface-200 shadow-lg">
        <div className="flex items-center space-x-8">
          <span className="text-2xl font-bold mr-2">StoryLines</span>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/discover">About</Link></li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button>Sign In</button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-full">Register</button>
          <button ><Github /></button>
          <ModeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 py-16">

        <h1 className="text-6xl font-bold mb-4">
          Write your tales <br />
          <span className="text-purple-500">Weave your own adventures</span>
        </h1>

        <p className="text-xl mb-8">
          Write captivating tales, collaborate on epic sagas, and craft your own thrilling adventures!
        </p>

        <div className="flex space-x-4 mb-16">
          <button className="bg-purple-500 text-white px-6 py-3 rounded-full">
            Learn more
          </button>
          <button className="bg-gray-800 text-white px-6 py-3 rounded-full flex justify-between group transition-all duration-300 ease-in-out">
            Get started <span className='group-hover:translate-x-1'><ArrowRight /></span>
          </button>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cardContent.map(({ icon: Icon, title, tagline }, index) => (
              <div key={index} className="p-6 rounded-3xl shadow-lg flex flex-col items-center text-center card-dark">
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
    </div>
  );
};

export default LandingPage;