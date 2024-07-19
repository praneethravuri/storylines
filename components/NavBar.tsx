import React from 'react';
import { ModeToggle } from './mode-toggle';
import { Github } from 'lucide-react';
import Link from 'next/link';

const NavBar = () => {
  return (
    <div className="bg-background shadow-md w-full top-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="title">
          <p className="font-bold">StoryLines</p>
        </div>

        <div className="flex space-x-4 items-center">
          <div className="links">
            <ul className="flex space-x-4 text-lg">
              <li>
                <Link href="https://github.com/praneethravuri/storylines" target='_blank'><Github /></Link>
              </li>
            </ul>
          </div>

          <div className="mode-toggle">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
