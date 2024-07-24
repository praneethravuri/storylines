import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t py-12 bg-background/50 backdrop-blur-sm">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <div className="mb-8 md:mb-0">
        <h2 className="text-2xl font-bold">StoryLines</h2>
        <p className="text-sm text-muted-foreground mt-2">Weaving tales, one node at a time</p>
      </div>
      <nav className="flex flex-wrap justify-center md:justify-end">
        <Link href="/about" className="mx-3 nav-link">About</Link>
        <Link href="/contact" className="mx-3 nav-link">Contact</Link>
        <Link href="/privacy" className="mx-3 nav-link">Privacy Policy</Link>
        <Link href="/terms" className="mx-3 nav-link">Terms of Service</Link>
      </nav>
    </div>
    <div className="container mx-auto mt-8 text-center text-sm text-muted-foreground">
      <p>&copy; 2024 StoryLines. All rights reserved.</p>
      <p>Made by <Link href="https://www.praneethravuri.com/" className='underline text-primary font-semibold decoration-dashed' target='_blank'>Praneeth Ravuri</Link></p>
    </div>
  </footer>
  )
}

export default Footer