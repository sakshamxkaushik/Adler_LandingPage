"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Ubuntu } from "next/font/google";
import { Button } from "@/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/images/logo.png";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const navItems = [
  { href: "https://adler-dev3.vercel.app/", label: "Adler 3D" },
  { href: "/feature", label: "Features" },
  { href: "#", label: "How It Works" },
  { href: "#", label: "IR" },
  { href: "/about", label: "About Us" },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-85 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={Logo} alt="Adler Logo" width={120} height={40} />
          </Link>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white hover:text-[#FF69B4] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-[#FC2D7C] hover:bg-[#1F1F1F] text-white">
              Get In Touch
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              En
            </Button>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-sm">
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-lg font-medium text-white hover:text-[#FF69B4] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button className="bg-[#FC2D7C] hover:bg-[#1F1F1F] text-white w-full">
              Get In Touch
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black w-full"
            >
              En
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
