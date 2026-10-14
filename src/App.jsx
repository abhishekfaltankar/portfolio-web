import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base text-content-primary selection:bg-accent selection:text-base relative">
      {/* Accessible skip link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Header */}
      <div id="top">
        <Header onOpenResume={() => setIsResumeOpen(true)} />
      </div>

      {/* Subtle background grid accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10 h-full w-full"></div>

      {/* Main Content Area */}
      <main id="main-content" className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume verification modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default App;
