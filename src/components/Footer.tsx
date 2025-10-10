"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(authStatus === 'true');
    };

    checkAuthStatus();

    // Listen for storage changes (if login happens in another tab/window)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    
    // Redirect to home page
    router.push('/');
    
    // Optional: Show logout confirmation
    alert('You have been logged out successfully.');
  };

  const handleLogin = () => {
    // This will navigate to login page
    // The actual login logic is handled in the login page
  };

  return (
    <footer className="bg-background border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/Nova2.png"
                alt="Nova Exam Services"
                width={160}
                height={60}
                className="h-16 w-auto max-h-12 object-contain sm:h-20 sm:max-h-16"
              />
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Professional English exam preparation services with expert guidance, 
              comprehensive mock tests, and personalized coaching to help you achieve 
              your desired scores.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/mock-tests" className="text-muted-foreground hover:text-primary transition-colors">
                  Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-muted-foreground hover:text-primary transition-colors">
                  Book a Test
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                {isLoggedIn ? (
                  <button 
                    onClick={handleLogout}
                    className="text-muted-foreground hover:text-primary transition-colors text-left w-full"
                  >
                    Logout
                  </button>
                ) : (
                  <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>

          {/* Exam Types */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Exam Types</h3>
            <ul className="space-y-3">
              <li>
                <a className="text-muted-foreground hover:text-primary transition-colors">
                  IELTS Preparation
                </a>
              </li>
              <li>
                <a className="text-muted-foreground hover:text-primary transition-colors">
                  TOEFL iBT
                </a>
              </li>
              <li>
                <a className="text-muted-foreground hover:text-primary transition-colors">
                  PTE Academic
                </a>
              </li>
              <li>
                <a className="text-muted-foreground hover:text-primary transition-colors">
                  Cambridge English
                </a>
              </li>
              <li>
                <a className="text-muted-foreground hover:text-primary transition-colors">
                  TOEIC
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Nova Exam Services. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Trusted by 10,000+ students worldwide</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}