import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { profile } from '../data/profile';

/**
 * Header Component
 * Restrained sticky navigation with typographic monogram, anchor links, and mobile drawer.
 */
export function Header({ onOpenResume }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Repositories', href: '#repositories' },
    { label: 'Contact', href: '#contact' },
  ];

  // Active section spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'work', 'skills', 'repositories', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-base/85 border-b border-edge/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Typographic Monogram Logo */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono text-sm tracking-tight text-content-primary hover:text-accent transition-colors focus:ring-1 focus:ring-accent"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded bg-base-elevated border border-edge font-bold text-accent group-hover:border-accent transition-colors">
            {profile.monogram}
          </span>
          <div className="flex flex-col">
            <span className="font-semibold text-xs leading-none text-content-primary group-hover:text-accent">
              abhishek.dev
            </span>
            <span className="text-[10px] text-content-muted leading-tight mt-0.5">
              ai &amp; software
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors focus:ring-1 focus:ring-accent ${
                  isActive
                    ? 'text-accent bg-base-elevated font-semibold'
                    : 'text-content-secondary hover:text-content-primary hover:bg-base-elevated/50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA / GitHub button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium bg-base-elevated hover:bg-base-hover border border-edge text-content-primary transition-colors focus:ring-1 focus:ring-accent"
          >
            <FileText size={13} className="text-accent" />
            <span>Resume</span>
          </button>

          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abhishek's GitHub Profile"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium bg-base-elevated hover:bg-base-hover border border-edge text-content-primary hover:text-accent transition-colors focus:ring-1 focus:ring-accent"
          >
            <GithubIcon size={14} />
            <ArrowUpRight size={12} className="text-content-muted" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenResume}
            className="px-2.5 py-1 text-xs font-mono rounded bg-base-elevated border border-edge text-accent"
            aria-label="Open resume"
          >
            Resume
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded bg-base-elevated border border-edge text-content-primary hover:text-accent focus:ring-1 focus:ring-accent"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-edge bg-base-secondary/95 backdrop-blur-lg px-4 pt-3 pb-5 space-y-2 animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2.5 rounded text-sm font-mono text-content-secondary hover:text-content-primary hover:bg-base-elevated transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-edge/60 flex flex-col gap-2 font-mono text-xs">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded bg-base-elevated border border-edge text-content-primary"
            >
              <span className="flex items-center gap-2">
                <GithubIcon size={15} />
                <span>GitHub Profile</span>
              </span>
              <ArrowUpRight size={13} className="text-content-muted" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
