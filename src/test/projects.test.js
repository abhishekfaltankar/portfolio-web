import { describe, it, expect } from 'vitest';
import { featuredProjects } from '../data/projects';

describe('Featured Projects Configuration', () => {
  it('features exactly three primary projects', () => {
    expect(featuredProjects).toHaveLength(3);
  });

  it('includes the flagship Multimodal Deepfake Detection project', () => {
    const deepfake = featuredProjects.find((p) => p.id === 'multimodal-deepfake-detection');
    expect(deepfake).toBeDefined();
    expect(deepfake.githubUrl).toBe('https://github.com/abhishekfaltankar/Multimodal-Deepfake-Detection');
    expect(deepfake.technologies).toContain('PyTorch');
    expect(deepfake.technologies).toContain('YOLOv8');
  });

  it('includes complete authentic case studies for all 3 projects', () => {
    featuredProjects.forEach((project) => {
      expect(project.caseStudy).toBeDefined();
      expect(project.caseStudy.problem).toBeTruthy();
      expect(project.caseStudy.whatWasBuilt).toBeTruthy();
      expect(project.caseStudy.architecture.length).toBeGreaterThan(0);
      expect(project.caseStudy.technicalDecisions.length).toBeGreaterThan(0);
      expect(project.caseStudy.challenges.length).toBeGreaterThan(0);
      expect(project.caseStudy.nextSteps.length).toBeGreaterThan(0);
    });
  });

  it('has verified GitHub links for each project', () => {
    featuredProjects.forEach((project) => {
      expect(project.githubUrl).toMatch(/^https:\/\/github\.com\/abhishekfaltankar\//);
    });
  });
});
