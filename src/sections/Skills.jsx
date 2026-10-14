import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { skillCategories } from '../data/skills';

/**
 * Skills Section Component
 * Compact, categorized capabilities with concrete context notes instead of arbitrary percentage bars.
 */
export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 border-t border-edge/60">
      <SectionHeading
        number="03"
        label="Technical Inventory"
        title="Skills &amp; Technologies"
        subtitle="A categorized inventory of tools, languages, and frameworks used across my coursework, research, and independent repositories."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {skillCategories.map((cat) => (
          <div
            key={cat.id}
            className="p-6 rounded-lg bg-base-secondary/80 border border-edge hover:border-edge-bright transition-colors"
          >
            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-bold text-content-primary">
                {cat.title}
              </h3>
              <p className="text-xs text-content-muted mt-1 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <ul className="space-y-3 pt-3 border-t border-edge/60">
              {cat.skills.map((skill) => (
                <li key={skill.name} className="flex items-start justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                    <span className="font-mono font-semibold text-content-primary">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-content-muted font-mono text-[11px] text-right truncate max-w-[220px]">
                    {skill.context}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
