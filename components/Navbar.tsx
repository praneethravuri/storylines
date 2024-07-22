"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full z-50 transition-all duration-300 border-b">
      <header className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link href="/" className="link-primary">StoryLines</Link>
        </div>
        <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
          <button className="btn btn-secondary">Sign In</button>
          <button className="btn btn-primary">Register</button>
          <button className="btn-icon"><FaGithub className="icon-primary" /></button>
          <button className="btn-icon"><FaDiscord className="icon-primary" /></button>
          <ThemeToggle />
        </div>
        <button className="md:hidden btn-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button className="btn btn-secondary w-full">Sign In</button>
            <button className="btn btn-primary w-full">Register</button>
            <div className="flex justify-between items-center">
              <button className="btn-icon"><FaGithub className="icon-primary" /></button>
              <button className="btn-icon"><FaDiscord className="icon-primary" /></button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;