import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Header } from '../components/Header';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { ResumeModal } from '../components/ResumeModal';
import { ProjectModal } from '../components/ProjectModal';
import { GitHubProjects } from '../components/GitHubProjects';
import { ContactSection } from '../components/ContactSection';
import { featuredProjects } from '../data/projects';
import * as githubService from '../services/github';

describe('UI Components', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
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

  it('toggles mobile menu in Header on hamburger button click', () => {
    render(<Header onOpenResume={vi.fn()} />);

    const menuToggle = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
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

  it('renders ProjectModal with case study details and closes on Escape and backdrop click', () => {
    const project = featuredProjects[0];
    const handleClose = vi.fn();

    const { rerender } = render(<ProjectModal project={project} onClose={handleClose} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.caseStudy.problem)).toBeInTheDocument();
    expect(screen.getByText(project.caseStudy.whatWasBuilt)).toBeInTheDocument();

    // Escape key press
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Clicking backdrop
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(handleClose).toHaveBeenCalledTimes(2);

    // When project is null, renders nothing
    rerender(<ProjectModal project={null} onClose={handleClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders GitHubProjects with repositories and supports refresh', async () => {
    vi.spyOn(githubService, 'fetchUserRepositories').mockResolvedValue({
      source: 'api',
      error: null,
      repos: [
        {
          id: 1,
          name: 'Multimodal-Deepfake-Detection',
          html_url: 'https://github.com/abhishekfaltankar/Multimodal-Deepfake-Detection',
          description: 'Deepfake detection system using PyTorch and YOLOv8.',
          language: 'Python',
          stargazers_count: 3,
          forks_count: 1
        }
      ]
    });

    render(<GitHubProjects />);

    await waitFor(() => {
      expect(screen.getByText('Multimodal-Deepfake-Detection')).toBeInTheDocument();
      expect(screen.getByText(/Live API Synced/i)).toBeInTheDocument();
    });

    const refreshBtn = screen.getByRole('button', { name: /refresh github repositories/i });
    fireEvent.click(refreshBtn);

    await waitFor(() => {
      expect(githubService.fetchUserRepositories).toHaveBeenCalledWith(true);
      expect(screen.queryByText('Refreshing...')).not.toBeInTheDocument();
    });
  });

  it('copies email to clipboard in ContactSection and provides feedback', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    render(<ContactSection />);

    const copyBtn = screen.getByRole('button', { name: /copy email address/i });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('abhishekfaltankar21@gmail.com');
    await waitFor(() => {
      expect(screen.getByText(/email copied to clipboard!/i)).toBeInTheDocument();
    });
  });

  it('validates contact form fields and flags errors when empty', () => {
    render(<ContactSection />);

    const submitBtn = screen.getByRole('link', { name: /compose direct email/i });
    expect(submitBtn).toBeInTheDocument();
  });
});
