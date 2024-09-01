import React, { useState } from 'react'
import { useLocation} from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { 
  IconMenu2, 
  IconSettings, 
  IconChevronRight,
  IconHome,
  IconBookmark,
  IconUser,
  IconHelp,
  IconHeart,
  IconLogout,
  IconBooks
} from '@tabler/icons-react'
import { ModeToggle } from "../mode-toggle"

const menuItems = [
  { icon: IconHome, label: 'Home', link: '/' },
  { icon: IconBookmark, label: 'Bookmarks', link: '/bookmarks' },
  { icon: IconBooks, label: 'Storybooks', link: '/storybooks' },
  { icon: IconUser, label: 'Profile', link: '/profile' },
  { icon: IconHelp, label: 'Support', link: '/support' },
  { icon: IconHeart, label: 'Donate', link: '/donate' },
  { icon: IconSettings, label: 'Settings', link: '/settings' },
]

const AvatarMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="/placeholder-user.jpg" alt="User" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 rounded-2xl bg-neutral-50 dark:bg-neutral-950">
        <div className="flex flex-col px-2 py-1.5">
          <span className="text-sm font-semibold">Praneeth Ravuri</span>
          <span className="text-xs text-muted-foreground">pravdevrav@gmail.com</span>
        </div>
        <DropdownMenuSeparator />
        {menuItems.map(({ icon: Icon, label, link }) => (
          <DropdownMenuItem key={label} className="cursor-pointer" asChild>
            <a href={link}>
              <Icon className="mr-2 h-4 w-4" />
              {label}
              {(label === 'Support' || label === 'Settings') && (
                <IconChevronRight className="ml-auto h-4 w-4" />
              )}
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <div className="flex justify-between items-center">
            <span className="text-sm">Theme</span>
            <ModeToggle />
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <IconLogout className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-xs text-muted-foreground">
          <span className="mr-2">Privacy</span>
          <span className="mr-2">Terms</span>
          <span>Copyright</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NavBar = () => {
  const { pathname } = useLocation();
  const showAvatarMenu = !['/', '/about', '/donate'].includes(pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='fixed top-0 left-0 right-0 flex justify-center items-start m-2 z-10 '>
      <div className='flex w-full md:w-1/3 sm:w-1/2 items-center justify-between border border-border sm:m-5 p-3 bg-neutral-50/80 dark:bg-neutral-950/80 rounded-full backdrop-blur-xl'>
        <div className="name">
          <h1 className='text-lg sm:text-xl font-bold'>StoryLines</h1>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          {!showAvatarMenu && (
            <>
              <a href="/about" className="text-foreground font-semibold hover:text-muted-foreground">About</a>
              {/* <a href="/signin" className="text-foreground font-semibold hover:text-muted-foreground">Sign In</a> */}
            </>
          )}
          {showAvatarMenu && <AvatarMenu />}
        </div>
        <div className="sm:hidden flex items-center space-x-2">
          {showAvatarMenu ? <AvatarMenu /> : (
            <button
              className="flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <IconMenu2 size={24} />
            </button>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden mt-2 p-3 space-y-2 flex flex-col border border-border bg-neutral-50/80 dark:bg-neutral-950/80 rounded-xl backdrop-blur-xl">
          <a href="/about" className="text-foreground font-semibold hover:text-muted-foreground">About</a>
          <a href="/signin" className="text-foreground font-semibold hover:text-muted-foreground">Sign In</a>
        </div>
      )}
    </nav>
  )
}

export default NavBar