"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const shouldShowNavbar = pathname === "/" || pathname === "/sign-in";

  if (!shouldShowNavbar) {
    return null;
  }

  return (
    <nav className="w-full fixed z-50 transition-all duration-300 border-b backdrop-blur-3xl">
      <header className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link href="/" className="link-primary">StoryLines</Link>
        </div>
        <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
          <div className='flex justify-between items-center space-x-4'>
            <Link href="/sign-in" className='btn btn-secondary'>Sign In</Link>
          </div>
          <button className="btn-icon"><FaGithub className="icon-primary" /></button>
          <button className="btn-icon"><FaDiscord className="icon-primary" /></button>
          <ThemeToggle />
        </div>
        <button className="md:hidden btn-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <RxCross1 size={24} /> : <IoMdMenu size={24} />}
        </button>
      </header>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className='flex justify-between items-center space-x-4'>
              <Link href="/sign-in" className='btn btn-secondary'>Sign In</Link>
            </div>
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