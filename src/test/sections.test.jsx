import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Projects } from '../sections/Projects';
import { Skills } from '../sections/Skills';
import { Footer } from '../components/Footer';
import { App } from '../App';
import { skillCategories } from '../data/skills';
import { profile } from '../data/profile';

describe('Sections and Integration', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      headers: { get: () => null },
    });
  });

  describe('Hero Section', () => {
    it('renders candidate title, bio, and calls resume callback', () => {
      const handleOpenResume = vi.fn();
      render(<Hero onOpenResume={handleOpenResume} />);

      expect(screen.getByText(profile.name)).toBeInTheDocument();
      expect(screen.getByText(/Artificial Intelligence & Data Science/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /explore selected work/i })).toHaveAttribute('href', '#work');

      const resumeBtn = screen.getByRole('button', { name: /resume/i });
      fireEvent.click(resumeBtn);
      expect(handleOpenResume).toHaveBeenCalledTimes(1);
    });

    it('renders social links to GitHub and status pill', () => {
      render(<Hero onOpenResume={vi.fn()} />);

      const githubLink = screen.getByRole('link', { name: /github profile/i });
      expect(githubLink).toHaveAttribute('href', profile.social.github);
      expect(screen.getByText(profile.availability.badge)).toBeInTheDocument();
    });
  });

  describe('About Section', () => {
    it('renders education details and coursework', () => {
      render(<About />);

      expect(screen.getByText(/Engineering Approach & Focus/i)).toBeInTheDocument();
      expect(screen.getByText(profile.education.institution)).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes(profile.education.timeline))).toBeInTheDocument();

      profile.education.coreTopics.forEach((topic) => {
        expect(screen.getByText(topic)).toBeInTheDocument();
      });
    });
  });

  describe('Skills Section', () => {
    it('renders all four skill category cards with correct titles', () => {
      render(<Skills />);

      skillCategories.forEach((cat) => {
        expect(screen.getByText(cat.title)).toBeInTheDocument();
        expect(screen.getByText(cat.description)).toBeInTheDocument();
      });
    });
  });

  describe('Projects Section', () => {
    it('renders featured projects heading and opens case study modal on click', async () => {
      render(<Projects />);

      expect(screen.getByText(/Featured Engineering Projects/i)).toBeInTheDocument();
      expect(screen.getByText(/Multimodal Deepfake Detection System/i)).toBeInTheDocument();

      const deepDiveButtons = screen.getAllByRole('button', { name: /case study/i });
      expect(deepDiveButtons.length).toBe(3);

      // Open first modal
      fireEvent.click(deepDiveButtons[0]);

      // Verify modal is open
      const modal = await screen.findByRole('dialog');
      expect(modal).toBeInTheDocument();
      expect(screen.getByText(/The Problem & Context/i)).toBeInTheDocument();

      // Close modal
      const closeBtn = screen.getByRole('button', { name: 'Close modal' });
      fireEvent.click(closeBtn);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Footer Component', () => {
    it('renders copyright and back to top link', () => {
      render(<Footer />);

      expect(screen.getByText(new RegExp(profile.name, 'i'))).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /back to top/i })).toHaveAttribute('href', '#top');
    });
  });

  describe('Full Application Integration (App)', () => {
    it('renders all page sections and opens/closes Resume modal from Header', async () => {
      render(<App />);

      // Skip link
      const skipLink = screen.getByText('Skip to main content');
      expect(skipLink).toHaveAttribute('href', '#main-content');

      // Check header resume button opens resume modal
      const resumeButtons = screen.getAllByRole('button', { name: /resume/i });
      fireEvent.click(resumeButtons[0]);

      const resumeModal = await screen.findByRole('dialog');
      expect(resumeModal).toBeInTheDocument();
      expect(screen.getByText(/Resume & Credentials/i)).toBeInTheDocument();

      // Close modal
      const closeBtn = screen.getByRole('button', { name: 'Close modal' });
      fireEvent.click(closeBtn);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });
});
