import React from 'react';

/**
 * SectionHeading Component
 * Standardized, restrained technical heading with numerical index and annotation.
 */
export function SectionHeading({ number, label, title, subtitle }) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="flex items-center gap-3 font-mono text-xs text-accent tracking-wider uppercase mb-2">
        <span className="text-content-muted">{number}</span>
        <span className="text-edge">/</span>
        <span>{label}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-content-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-content-secondary max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
