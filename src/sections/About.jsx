import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { profile } from '../data/profile';
import { GraduationCap, CheckCircle } from 'lucide-react';

/**
 * About Section Component
 * Authentic narrative regarding education, engineering philosophy, and coursework.
 */
export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 border-t border-edge/60">
      <SectionHeading
        number="01"
        label="Background &amp; Education"
        title="Engineering Approach &amp; Focus"
        subtitle="A snapshot of what I'm studying, how I approach software, and where I'm directing my efforts."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Narrative paragraphs */}
        <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-content-secondary leading-relaxed">
          {profile.bio.paragraphs.map((paragraph, idx) => (
            <p key={idx} className="first-of-type:text-content-primary first-of-type:text-base sm:first-of-type:text-lg">
              {paragraph}
            </p>
          ))}

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded bg-base-secondary border border-edge">
              <span className="text-accent font-semibold block mb-1">01 / Code Quality</span>
              <span className="text-content-muted">
                I write tested, modular code with boundary verification and defensive error handling.
              </span>
            </div>
            <div className="p-3.5 rounded bg-base-secondary border border-edge">
              <span className="text-accent font-semibold block mb-1">02 / Applied ML</span>
              <span className="text-content-muted">
                Focus on real-world constraints: inference throughput, class imbalance, and forensic reporting.
              </span>
            </div>
          </div>
        </div>

        {/* Education & Core Topics sidebar */}
        <div className="lg:col-span-5 space-y-4 w-full">
          <div className="p-4 sm:p-6 rounded-lg bg-base-secondary/80 border border-edge space-y-4">
            <div className="flex items-center gap-2.5 font-mono text-xs text-accent uppercase">
              <GraduationCap size={16} />
              <span>Academic Curriculum</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-content-primary">
                {profile.education.institution}
              </h3>
              <p className="text-xs font-mono text-content-muted mt-0.5">
                Timeline: {profile.education.timeline}
              </p>
            </div>

            <div className="pt-3 border-t border-edge/60">
              <span className="block font-mono text-xs text-content-muted uppercase mb-3">
                Relevant Coursework &amp; Foundations:
              </span>
              <ul className="space-y-2 text-xs text-content-secondary">
                {profile.education.coreTopics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-accent shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
