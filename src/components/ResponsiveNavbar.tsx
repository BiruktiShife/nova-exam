'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ResponsiveNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo - Much larger and visible on mobile */}
        <div className="flex items-center gap-3">
          {/* REMOVED 'hidden lg:block' from the Link */}
          <Link href="/" className="block"> 
          <Image
  src="/Nova2.png"
  alt="Nova Exam Services"
  width={160}
  height={60}
  className="h-16 w-auto max-h-12 object-contain sm:h-20 sm:max-h-16"
/>

          </Link> 
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/mock-tests" className="hover:text-primary transition-colors">Mock Tests</Link>
          <Link href="/booking" className="hover:text-primary transition-colors">Booking</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/blog-and-resources" className="hover:text-primary transition-colors">Blogs And Resources</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        {/* Desktop Book Now Button */}
        <div className="hidden md:block">
          <Button asChild>
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <Button asChild size="sm" className="hidden sm:block">
            <Link href="/booking">Book Now</Link>
          </Button>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`} />
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay with Slide Animation */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop with blur */}
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeMenu}
        />
        
        {/* Mobile Menu Panel */}
        <div className={`absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md rounded-lg border shadow-lg transform transition-all duration-300 ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}>
          <nav className="flex flex-col p-6 space-y-3 text-sm">
            <Link 
              href="/mock-tests" 
              className="py-3 px-4 hover:text-primary hover:bg-accent/50 rounded-md transition-colors font-medium"
              onClick={closeMenu}
            >
              Mock Tests
            </Link>
            <Link 
              href="/booking" 
              className="py-3 px-4 hover:text-primary hover:bg-accent/50 rounded-md transition-colors font-medium"
              onClick={closeMenu}
            >
              Booking
            </Link>
            <Link 
              href="/contact" 
              className="py-3 px-4 hover:text-primary hover:bg-accent/50 rounded-md transition-colors font-medium"
              onClick={closeMenu}
            >
              Contact
            </Link>
            <Link 
              href="/about" 
              className="py-3 px-4 hover:text-primary hover:bg-accent/50 rounded-md transition-colors font-medium"
              onClick={closeMenu}
            >
              About Us
            </Link>
            <div className="pt-4 mt-2 border-t">
              <Button asChild className="w-full" size="lg">
                <Link href="/booking" onClick={closeMenu}>
                  Book Mock Test
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}