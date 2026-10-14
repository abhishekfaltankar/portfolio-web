import React, { useState } from 'react';
import { Mail, Copy, Check, Send, AlertCircle, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { profile } from '../data/profile';

/**
 * ContactSection Component
 * Honest contact methods: direct mailto, copy to clipboard, social links,
 * and working form ONLY when an endpoint is configured via VITE_FORMSPREE_ENDPOINT.
 */
export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [serverMessage, setServerMessage] = useState('');

  const hasFormEndpoint = Boolean(profile.contactService.endpoint);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g., name@domain.com).';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please include a short message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!hasFormEndpoint) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setServerMessage('External form provider not configured. Please use the direct email link.');
      return;
    }

    try {
      const response = await fetch(profile.contactService.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json().catch(() => ({}));
        setSubmitStatus('error');
        setServerMessage(data.error || 'Submission failed. Please email me directly.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setServerMessage('Network error. Please reach out via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left column: Direct contact info */}
      <div className="lg:col-span-5 space-y-6">
        <div className="p-6 rounded-lg bg-base-secondary/80 border border-edge">
          <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-2">
            Direct Communication
          </h3>
          <p className="text-sm text-content-secondary leading-relaxed mb-6">
            I am actively seeking software engineering placements and internships. Whether you have an open role, technical feedback on my projects, or an interesting engineering problem, my inbox is open.
          </p>

          {/* Email button & copy */}
          <div className="space-y-3">
            <a
              href={`mailto:${profile.social.email}?subject=Software%20Development%20Opportunity`}
              className="flex items-center justify-between p-3.5 rounded bg-base-elevated hover:bg-base-hover border border-edge text-content-primary group transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <span className="font-mono text-xs sm:text-sm font-medium">
                  {profile.social.email}
                </span>
              </div>
              <ArrowUpRight size={14} className="text-content-muted group-hover:text-accent transition-colors" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-mono bg-base-elevated/60 hover:bg-base-elevated border border-edge text-content-secondary hover:text-content-primary transition-colors focus:ring-1 focus:ring-accent"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-accent" />
                  <span className="text-accent font-semibold">Email copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy email address</span>
                </>
              )}
            </button>
          </div>

          {/* Channels list */}
          <div className="mt-6 pt-5 border-t border-edge/60 space-y-2.5 font-mono text-xs">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded hover:bg-base-elevated text-content-secondary hover:text-content-primary transition-colors"
            >
              <span className="flex items-center gap-2">
                <GithubIcon size={15} />
                <span>github.com/abhishekfaltankar</span>
              </span>
              <ArrowUpRight size={13} className="text-content-muted" />
            </a>

            {profile.social.linkedin && (
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded hover:bg-base-elevated text-content-secondary hover:text-content-primary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <LinkedinIcon size={15} />
                  <span>LinkedIn Profile</span>
                </span>
                <ArrowUpRight size={13} className="text-content-muted" />
              </a>
            )}
          </div>
        </div>

        {/* Location & Timezone info */}
        <div className="p-4 rounded-lg bg-base-secondary/50 border border-edge text-xs font-mono text-content-muted space-y-1">
          <div className="flex justify-between">
            <span>Location:</span>
            <span className="text-content-primary">India</span>
          </div>
          <div className="flex justify-between">
            <span>Timezone:</span>
            <span className="text-content-primary">IST (UTC +5:30)</span>
          </div>
          <div className="flex justify-between">
            <span>Expected Degree:</span>
            <span className="text-content-primary">B.Tech AI &amp; DS (2027)</span>
          </div>
        </div>
      </div>

      {/* Right column: Form or Honest Email-first fallback */}
      <div className="lg:col-span-7">
        <div className="p-6 sm:p-8 rounded-lg bg-base-secondary/80 border border-edge">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-content-primary">
              Send a Message
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-base-elevated border border-edge text-content-muted">
              {hasFormEndpoint ? 'Live Form' : 'Direct Email Mode'}
            </span>
          </div>

          {!hasFormEndpoint && (
            <div className="mb-5 p-3.5 rounded bg-base-elevated/80 border border-edge text-xs font-mono text-content-secondary leading-relaxed">
              <span className="text-accent font-semibold block mb-1">
                {'// Developer Note:'}
              </span>
              Backend contact webhook is currently unconfigured. For immediate response, please use the direct email link on the left or launch your default mail client below.
            </div>
          )}

          {submitStatus === 'success' ? (
            <div className="p-6 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 space-y-3 font-mono text-sm">
              <div className="flex items-center gap-2 font-bold">
                <Check size={18} />
                <span>Message Sent Successfully</span>
              </div>
              <p className="text-xs text-content-secondary leading-relaxed">
                Thank you for reaching out. I check my messages regularly and will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="mt-2 px-3 py-1 text-xs rounded bg-base-elevated border border-edge text-content-primary hover:bg-base-hover"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {submitStatus === 'error' && (
                <div
                  role="alert"
                  className="p-3 rounded bg-red-950/40 border border-red-800/40 text-red-300 text-xs font-mono flex items-center gap-2"
                >
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{serverMessage}</span>
                </div>
              )}

              {/* Name field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-mono text-xs uppercase tracking-wider text-content-secondary mb-1.5"
                >
                  Your Name <span className="text-accent">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Maya Lin"
                  className={`w-full px-3.5 py-2.5 rounded bg-base border text-sm text-content-primary placeholder:text-content-muted/60 focus:ring-1 focus:ring-accent ${
                    errors.name ? 'border-red-500' : 'border-edge'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs font-mono text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-mono text-xs uppercase tracking-wider text-content-secondary mb-1.5"
                >
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. recruiter@company.com"
                  className={`w-full px-3.5 py-2.5 rounded bg-base border text-sm text-content-primary placeholder:text-content-muted/60 focus:ring-1 focus:ring-accent ${
                    errors.email ? 'border-red-500' : 'border-edge'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs font-mono text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Message field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs uppercase tracking-wider text-content-secondary mb-1.5"
                >
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write a brief note regarding potential roles or collaboration..."
                  className={`w-full px-3.5 py-2.5 rounded bg-base border text-sm text-content-primary placeholder:text-content-muted/60 focus:ring-1 focus:ring-accent ${
                    errors.message ? 'border-red-500' : 'border-edge'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs font-mono text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                {hasFormEndpoint ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-accent text-base font-semibold hover:bg-accent-hover transition-colors font-mono text-xs disabled:opacity-50 focus:ring-1 focus:ring-accent"
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                  </button>
                ) : (
                  <a
                    href={`mailto:${profile.social.email}?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(formData.name || 'Visitor')}&body=${encodeURIComponent(formData.message || '')}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-accent text-base font-semibold hover:bg-accent-hover transition-colors font-mono text-xs focus:ring-1 focus:ring-accent"
                  >
                    <Mail size={14} />
                    <span>Compose Direct Email</span>
                  </a>
                )}

                <span className="text-[11px] font-mono text-content-muted">
                  No tracking scripts or telemetry attached.
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
