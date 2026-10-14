import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon } from './Icons';
import { profile } from '../data/profile';

/**
 * Footer Component
 * Minimalist, restrained developer footer with dynamic year and back-to-top anchor.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-edge/60 bg-base-secondary/60 py-10 mt-20 transition-colors">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-content-muted">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-4 text-center sm:text-left leading-relaxed">
            <span className="text-content-primary font-medium">{profile.name}</span>
            <span className="hidden sm:inline text-edge">•</span>
            <span>© {currentYear} • Class of 2027</span>
            <span className="hidden sm:inline text-edge">•</span>
            <span>Built with React, Vite &amp; Tailwind</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-content-secondary hover:text-accent transition-colors"
            >
              <GithubIcon size={13} />
              <span>GitHub</span>
            </a>

            <span className="text-edge">•</span>

            <a
              href="#top"
              className="inline-flex items-center gap-1 text-content-secondary hover:text-accent transition-colors"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
