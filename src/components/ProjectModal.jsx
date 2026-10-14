import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';

/**
 * ProjectModal Component
 * Accessible modal displaying the complete architecture case study for a project.
 */
export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto bg-base-secondary border border-edge rounded-lg p-4 sm:p-6 md:p-8 shadow-2xl text-content-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-start justify-between gap-4 border-b border-edge/60 pb-4 sm:pb-5">
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-accent uppercase mb-1">
              <span>{project.category}</span>
              <span className="text-edge">•</span>
              <span>{project.year}</span>
            </div>
            <h3 id="modal-project-title" className="text-lg sm:text-2xl font-bold tracking-tight text-content-primary break-word-safe">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-content-secondary mt-1 leading-relaxed">
              {project.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-content-muted hover:text-content-primary hover:bg-base-elevated rounded transition-colors focus:ring-1 focus:ring-accent shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content sections */}
        <div className="mt-6 space-y-6 text-sm sm:text-base leading-relaxed">
          {/* Problem */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              The Problem &amp; Context
            </h4>
            <p className="text-content-secondary">{caseStudy.problem}</p>
          </div>

          {/* What Was Built */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              What Was Built
            </h4>
            <p className="text-content-secondary">{caseStudy.whatWasBuilt}</p>
          </div>

          {/* Architecture Pipeline */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              System Architecture &amp; Workflow
            </h4>
            <ul className="space-y-2 mt-2">
              {caseStudy.architecture.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-content-secondary text-sm">
                  <CheckCircle2 size={16} className="text-accent shrink-0 mt-1" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Decisions */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              Key Technical Decisions
            </h4>
            <ul className="space-y-2 mt-2">
              {caseStudy.technicalDecisions.map((decision, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-content-secondary text-sm">
                  <ArrowRight size={16} className="text-accent shrink-0 mt-1" />
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges & Limitations */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
              <AlertTriangle size={15} className="text-amber-400 shrink-0" />
              Honest Challenges &amp; Generalization Limits
            </h4>
            <ul className="space-y-2 mt-2">
              {caseStudy.challenges.map((challenge, idx) => (
                <li key={idx} className="text-content-secondary text-sm pl-4 border-l border-amber-500/40">
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          {/* Next Steps */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-content-muted mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-content-muted"></span>
              Planned Improvements &amp; Next Steps
            </h4>
            <ul className="space-y-2 mt-2">
              {caseStudy.nextSteps.map((step, idx) => (
                <li key={idx} className="text-content-muted text-sm pl-4 border-l border-edge">
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div className="pt-4 border-t border-edge/60">
            <span className="block font-mono text-xs text-content-muted uppercase mb-3">
              Stack &amp; Tooling Verified
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-base-elevated border border-edge text-content-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-5 border-t border-edge/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-xs font-mono font-medium rounded bg-base-elevated hover:bg-base-hover border border-edge text-content-primary transition-colors focus:ring-1 focus:ring-accent"
            >
              <GithubIcon size={15} />
              <span>Inspect Source on GitHub</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-xs font-mono font-semibold rounded bg-accent text-base hover:bg-accent-hover transition-colors focus:ring-1 focus:ring-accent"
              >
                <ExternalLink size={15} />
                <span>Open Live Deployment</span>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-xs font-mono text-content-muted hover:text-content-primary text-center sm:text-right py-1 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
