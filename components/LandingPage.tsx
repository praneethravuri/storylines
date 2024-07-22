import React from 'react';
import Link from 'next/link';
import { Github, ArrowRight, Pickaxe, BookOpenText, Route } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const cardContent = [
  { icon: Pickaxe, title: "Create", tagline: "Craft your own stories or add new chapters to existing tales." },
  { icon: BookOpenText, title: "Explore", tagline: "Dive into new stories and discover captivating narratives created by others." },
  { icon: Route, title: "Navigate", tagline: "Choose your path and explore different storylines and possibilities." },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8 border-b">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <span className="text-2xl font-bold">StoryLines</span>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/" className="nav-link">Home</Link></li>
              <li><Link href="/discover" className="nav-link">About</Link></li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="btn btn-secondary">Sign In</button>
          <button className="btn btn-primary">Register</button>
          <button className="p-2 rounded-full hover:bg-accent"><Github className="w-5 h-5" /></button>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="heading-primary mb-4">
            Write your tales <br />
            <span className="text-primary">Weave your own adventures</span>
          </h1>
          <p className="paragraph-primary mb-8 max-w-2xl mx-auto">
            Write captivating tales, collaborate on epic sagas, and craft your own thrilling adventures!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="btn btn-primary">
              Learn more
            </button>
            <Link href="/storymap" className="btn btn-outline group">
              Get started <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardContent.map(({ icon: Icon, title, tagline }, index) => (
            <div key={index} className="card flex flex-col items-center text-center">
              <Icon className="icon-primary mb-4" />
              <h2 className="heading-secondary">{title}</h2>
              <p className="paragraph-secondary">{tagline}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;