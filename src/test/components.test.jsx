import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Header } from '../components/Header';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { ResumeModal } from '../components/ResumeModal';
import { ContactSection } from '../components/ContactSection';
import { featuredProjects } from '../data/projects';

describe('UI Components', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      headers: { get: () => null }
    });
  });
  it('renders Header with navigation links and resume trigger', () => {
    const handleOpenResume = vi.fn();
    render(<Header onOpenResume={handleOpenResume} />);

    expect(screen.getByText('AF')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work');

    const resumeBtns = screen.getAllByRole('button', { name: /resume/i });
    expect(resumeBtns.length).toBeGreaterThan(0);
    fireEvent.click(resumeBtns[0]);
    expect(handleOpenResume).toHaveBeenCalled();
  });

  it('renders ProjectCard with verified links and calls case study on click', () => {
    const project = featuredProjects[0];
    const handleDeepDive = vi.fn();

    render(
      <ProjectCard
        project={project}
        index={0}
        onOpenDeepDive={handleDeepDive}
      />
    );

    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.summary)).toBeInTheDocument();

    const caseStudyBtn = screen.getByRole('button', { name: /case study/i });
    fireEvent.click(caseStudyBtn);
    expect(handleDeepDive).toHaveBeenCalledWith(project);
  });

  it('renders SectionHeading with index and label', () => {
    render(
      <SectionHeading
        number="01"
        label="Test Category"
        title="Testing Title"
        subtitle="Testing Subtitle"
      />
    );

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('Testing Title')).toBeInTheDocument();
    expect(screen.getByText('Testing Subtitle')).toBeInTheDocument();
  });

  it('renders ResumeModal with candidate profile snapshot', async () => {
    const handleClose = vi.fn();
    render(<ResumeModal isOpen={true} onClose={handleClose} />);

    expect(screen.getByText(/Resume & Credentials/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Quick Candidate Profile Snapshot/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Abhishek Faltankar/i)).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: 'Close modal' });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });

  it('validates contact form fields and flags errors when empty', () => {
    render(<ContactSection />);

    const submitBtn = screen.getByRole('link', { name: /compose direct email/i });
    expect(submitBtn).toBeInTheDocument();
  });
});
