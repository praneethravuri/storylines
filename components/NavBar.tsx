"use client";
import React, { useState } from 'react';
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X, Map, Heart, Settings, LogOut, BookOpenText } from 'lucide-react';
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
    { href: "/storymap", icon: BookOpenText, label: "Story Map" },
    { href: "/your-maps", icon: Map, label: "Your Maps" },
    { href: "/favourites", icon: Heart, label: "Favourites" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      <Button
        variant="ghost"
        className="fixed top-4 left-4 z-50 p-2 md:hidden"
        onClick={toggleNavbar}
      >
        <Menu size={24} />
      </Button>
      <div className={`fixed top-0 left-0 h-full w-64 transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 bg-background shadow-lg`}>
        <div className="flex flex-col h-full p-5">
          <div className="flex items-center justify-between mb-10">
            <h1 className="">StoryLines</h1>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleNavbar}
            >
              <X size={24} />
            </Button>
          </div>
          <nav className="flex-grow">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-accent-muted text-tertiary'
                        : 'text-secondary hover:bg-accent-muted hover:text-tertiary'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-4">
            <ModeToggle />
            <Button variant="outline" className="w-full justify-start text-secondary hover:text-tertiary" onClick={() => {}}>
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;