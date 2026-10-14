import React, { useEffect, useState } from 'react';
import { X, FileText, Download, AlertCircle, CheckCircle, ExternalLink, Mail } from 'lucide-react';
import { profile } from '../data/profile';

/**
 * ResumeModal Component
 * Provides an honest, graceful resume experience.
 * Checks for PDF presence or shows configuration guide with quick recruiter summary.
 */
export function ResumeModal({ isOpen, onClose }) {
  const [pdfAvailable, setPdfAvailable] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);

    // Verify if PDF file actually exists at the configured path
    fetch(profile.resume.path, { method: 'HEAD' })
      .then((res) => {
        setPdfAvailable(res.ok && res.headers.get('content-type')?.includes('pdf'));
      })
      .catch(() => {
        setPdfAvailable(false);
      });

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-base-secondary border border-edge rounded-lg p-6 sm:p-8 shadow-2xl text-content-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-edge/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-base-elevated border border-edge text-accent">
              <FileText size={22} />
            </div>
            <div>
              <h3 id="resume-modal-title" className="text-xl font-bold tracking-tight">
                Resume &amp; Credentials
              </h3>
              <p className="text-xs font-mono text-content-muted mt-0.5">
                Configured path: {profile.resume.path}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-content-muted hover:text-content-primary hover:bg-base-elevated rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-5 text-sm">
          {pdfAvailable ? (
            /* File is confirmed available */
            <div className="p-4 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300">
              <div className="flex items-center gap-2 font-mono text-xs mb-1">
                <CheckCircle size={15} />
                <span>Verified PDF Document Available</span>
              </div>
              <p className="text-xs text-content-secondary mt-1">
                The compiled resume is ready to view or download.
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href={profile.resume.path}
                  download={profile.resume.filename}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-accent text-base text-xs font-semibold hover:bg-accent-hover transition-colors"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>
                <a
                  href={profile.resume.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-base-elevated border border-edge text-content-primary text-xs font-mono hover:bg-base-hover transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>Open in New Tab</span>
                </a>
              </div>
            </div>
          ) : (
            /* Honest configuration guide */
            <div className="p-4 rounded-lg bg-base-elevated border border-edge text-xs leading-relaxed space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-accent">
                <AlertCircle size={15} />
                <span>Resume Configuration Notice</span>
              </div>
              <p className="text-content-secondary">
                This button is configured to serve your compiled PDF from{' '}
                <code className="text-accent font-mono px-1 py-0.5 rounded bg-base">
                  public/resume/abhishek-faltankar-resume.pdf
                </code>
                .
              </p>
              <p className="text-content-muted">
                To activate direct 1-click download, place your finalized PDF in that directory. The site logic will immediately serve it without requiring code modifications.
              </p>
            </div>
          )}

          {/* Quick Recruiter Summary Card */}
          <div className="p-5 rounded-lg bg-base/60 border border-edge/80 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
              Quick Candidate Profile Snapshot
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-content-muted block font-mono">Candidate:</span>
                <span className="font-semibold text-content-primary">{profile.name}</span>
              </div>
              <div>
                <span className="text-content-muted block font-mono">Degree:</span>
                <span className="text-content-primary">{profile.education.degree}</span>
              </div>
              <div>
                <span className="text-content-muted block font-mono">Target Graduation:</span>
                <span className="text-content-primary font-mono">{profile.education.timeline}</span>
              </div>
              <div>
                <span className="text-content-muted block font-mono">Target Roles:</span>
                <span className="text-content-primary">Software Engineer / AI &amp; ML Intern</span>
              </div>
            </div>

            <div className="pt-3 border-t border-edge/60 text-xs">
              <span className="text-content-muted block font-mono mb-1.5">
                Primary Tooling &amp; Frameworks:
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono">
                {['Python', 'PyTorch', 'YOLOv8', 'FastAPI', 'PostgreSQL', 'JavaScript', 'React', 'Git'].map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded bg-base-elevated border border-edge text-content-secondary">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-edge/60 flex items-center justify-between">
          <a
            href={`mailto:${profile.social.email}?subject=Interview%20Inquiry%20-%20Abhishek%20Faltankar`}
            className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:underline"
          >
            <Mail size={14} />
            <span>Request Resume via Direct Email</span>
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-mono rounded bg-base-elevated hover:bg-base-hover border border-edge text-content-primary transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
