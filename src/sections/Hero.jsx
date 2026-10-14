import React from 'react';
import { ArrowDown, FileText, ArrowUpRight, Terminal, Sparkles } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { profile } from '../data/profile';

/**
 * Hero Section Component
 * Asymmetric, developer-focused hero introducing Abhishek with authentic technical annotations.
 */
export function Hero({ onOpenResume }) {
  return (
    <section id="hero" className="pt-12 sm:pt-20 pb-16 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left narrative column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status pill with subtle pulse */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-base-elevated border border-edge font-mono text-xs text-content-secondary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span>{profile.availability.badge}</span>
          </div>

          {/* Primary Name & Headline */}
          <div className="space-y-3">
            <span className="font-mono text-xs sm:text-sm text-accent uppercase tracking-wider block">
              {'// Student Developer & Systems Builder'}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-content-primary leading-[1.15]">
              Hey, I'm <span className="text-content-primary underline decoration-accent/60 decoration-2 underline-offset-8">{profile.name}</span>.<br />
              I like building things that work.
            </h1>
          </div>

          {/* Narrative text */}
          <p className="text-base sm:text-lg text-content-secondary leading-relaxed max-w-xl">
            I'm a B.Tech student in <strong className="text-content-primary font-semibold">Artificial Intelligence &amp; Data Science</strong> (Class of 2027). I focus on practical software engineering, computer vision pipelines, and full-stack applications that solve concrete problems.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-accent text-base font-semibold hover:bg-accent-hover transition-colors focus:ring-1 focus:ring-accent shadow-sm"
            >
              <span>Explore Selected Work</span>
              <ArrowDown size={14} />
            </a>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-base-elevated hover:bg-base-hover border border-edge text-content-primary transition-colors focus:ring-1 focus:ring-accent"
            >
              <FileText size={14} className="text-accent" />
              <span>Resume</span>
            </button>

            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-base-elevated hover:bg-base-hover border border-edge text-content-primary hover:text-accent transition-colors focus:ring-1 focus:ring-accent"
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
              <ArrowUpRight size={12} className="text-content-muted" />
            </a>
          </div>
        </div>

        {/* Right technical annotation card */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-lg bg-base-secondary/90 border border-edge font-mono text-xs shadow-lg space-y-4">
            {/* Card header */}
            <div className="flex items-center justify-between pb-3 border-b border-edge/60 text-content-muted">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-accent" />
                <span className="text-content-primary font-semibold">dev_profile.meta</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-base-elevated border border-edge/80 text-accent">
                ACTIVE
              </span>
            </div>

            {/* Metadata table rows */}
            <div className="space-y-2.5 text-content-secondary text-[11px] sm:text-xs">
              <div className="flex justify-between items-start gap-2">
                <span className="text-content-muted shrink-0">degree:</span>
                <span className="text-content-primary text-right font-medium">B.Tech in AI &amp; Data Science</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-content-muted shrink-0">graduation:</span>
                <span className="text-accent font-semibold">2027</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-content-muted shrink-0">primary_stack:</span>
                <span className="text-content-primary text-right">Python • React • PyTorch • SQL</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-content-muted shrink-0">primary_repo:</span>
                <a
                  href="https://github.com/abhishekfaltankar/Multimodal-Deepfake-Detection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline text-right truncate max-w-[200px]"
                >
                  Multimodal-Deepfake-Detection
                </a>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-content-muted shrink-0">held_out_metrics:</span>
                <span className="text-content-primary text-right">95% Val Acc (CV) / 93.7% (IIoT)</span>
              </div>
            </div>

            {/* Currently building line */}
            <div className="pt-3 border-t border-edge/60">
              <span className="text-content-muted block mb-1 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={11} className="text-accent" />
                {'// CURRENTLY BUILDING'}
              </span>
              <p className="text-content-secondary text-[11px] leading-relaxed">
                {profile.currentFocus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
