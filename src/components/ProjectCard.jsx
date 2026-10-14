import React from 'react';
import { ExternalLink, BookOpen, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';

/**
 * ProjectCard Component
 * Displays a single verified project with technical highlights and actions.
 */
export function ProjectCard({ project, index, onOpenDeepDive }) {
  const indexStr = String(index + 1).padStart(2, '0');

  return (
    <article
      className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-lg bg-base-secondary/90 border border-edge hover:border-edge-bright transition-all duration-200"
      aria-labelledby={`project-${project.id}-title`}
    >
      <div>
        {/* Top metadata strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-content-muted">
            <span className="text-accent font-semibold">{indexStr}</span>
            <span>{'//'}</span>
            <span className="uppercase tracking-wide">{project.category}</span>
          </div>
          <span className="px-2.5 py-0.5 rounded text-[11px] bg-base-elevated border border-edge text-content-secondary font-medium">
            {project.statusBadge}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3
          id={`project-${project.id}-title`}
          className="text-xl sm:text-2xl font-bold tracking-tight text-content-primary group-hover:text-accent transition-colors"
        >
          {project.title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm font-mono text-content-muted">
          {project.tagline}
        </p>

        {/* Summary */}
        <p className="mt-4 text-sm sm:text-base text-content-secondary leading-relaxed">
          {project.summary}
        </p>

        {/* Implementation Highlights */}
        <div className="mt-5 pt-4 border-t border-edge/60">
          <span className="block font-mono text-[11px] uppercase tracking-wider text-accent mb-2.5 flex items-center gap-1.5">
            <Layers size={13} className="text-accent" />
            Verified Implementation Highlights
          </span>
          <ul className="space-y-1.5 text-xs sm:text-sm text-content-secondary">
            {project.implementationHighlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent font-mono shrink-0 select-none">›</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer: Tech stack and action links */}
      <div className="mt-6 pt-5 border-t border-edge/60">
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-mono rounded bg-base-elevated text-content-secondary border border-edge/80"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <button
            onClick={() => onOpenDeepDive(project)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent transition-colors focus:ring-1 focus:ring-accent"
          >
            <BookOpen size={14} />
            <span>Case Study</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-base-elevated hover:bg-base-hover border border-edge text-content-primary transition-colors focus:ring-1 focus:ring-accent"
            >
              <GithubIcon size={14} />
              <span>Repository</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live deployment for ${project.title}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent text-base font-semibold hover:bg-accent-hover transition-colors focus:ring-1 focus:ring-accent"
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
