"use client";
import React, { useState } from 'react';
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X, Sparkles, UserRoundPen, Settings, Map } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { href: "/storymap", icon: Map, label: "StoryMap" },
    { href: "/profile", icon: UserRoundPen, label: "Profile" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-50 p-2 md:hidden text-foreground bg-background border border-border rounded-md"
          onClick={toggleNavbar}
        >
          <Menu size={24} />
        </button>
      )}
      <div className={`fixed top-0 left-0 h-full w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 bg-background text-foreground border-r border-border`}>
        <div className="flex flex-col h-full p-5">
          {isOpen && (
            <button
              className="absolute top-4 right-4 p-2 md:hidden text-foreground"
              onClick={toggleNavbar}
            >
              <X size={24} />
            </button>
          )}
          <h1 className="text-2xl font-bold mb-8 text-primary">StoryLines</h1>
          <nav className="flex-grow">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 hover:text-primary-accent ${pathname === item.href ? 'text-primary-accent' : ''
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="create-story my-5">
            <Link href="/create-story" className="flex items-center justify-center bg-purpleAccent p-2 rounded-lg transition duration-300 ease-in-out hover:bg-purple-500 text-black">
              <Sparkles className="mr-3" />
              Create
            </Link>
          </div>

          <div className="mt-auto">
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;