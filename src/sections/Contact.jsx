import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ContactSection } from '../components/ContactSection';

/**
 * Contact Section Component
 * Houses the contact methods, email links, and configurable delivery form.
 */
export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 border-t border-edge/60">
      <SectionHeading
        number="04"
        label="Get In Touch"
        title="Contact &amp; Placement Opportunities"
        subtitle="Currently exploring software engineering placements, internships, and collaborative AI projects. Feel free to connect directly."
      />

      <ContactSection />
    </section>
  );
}
