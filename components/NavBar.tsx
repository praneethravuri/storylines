'use client';
import React, { useState, useEffect } from 'react';
import { ModeToggle } from './mode-toggle';
import { Github, Menu, X } from 'lucide-react';
import Link from 'next/link';

const NavBar = () => {;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`fixed bg-background w-full z-50 transition-all duration-300 border border-b-surface-300 shadow-md`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">StoryLines</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/features" className="text-foreground hover:text-primary-500 transition-colors">Features</Link>
            {/* <Link href="/pricing" className="text-foreground hover:text-primary-500 transition-colors">Pricing</Link> */}
            <Link href="/about" className="text-foreground hover:text-primary-500 transition-colors">About</Link>
            <Link href="https://github.com/praneethravuri/storylines" target='_blank' className="text-foreground hover:text-primary-500 transition-colors">
              <Github size={20} />
            </Link>
            <ModeToggle />
          </div>
          
          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface-100 border-t border-surface-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/features" className="block text-foreground hover:text-primary-500 transition-colors">Features</Link>
            <Link href="/pricing" className="block text-foreground hover:text-primary-500 transition-colors">Pricing</Link>
            <Link href="/about" className="block text-foreground hover:text-primary-500 transition-colors">About</Link>
            <Link href="https://github.com/praneethravuri/storylines" target='_blank' className="block text-foreground hover:text-primary-500 transition-colors">
              GitHub
            </Link>
            <div className="flex items-center justify-between">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;