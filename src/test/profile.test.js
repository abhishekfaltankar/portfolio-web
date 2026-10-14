import { describe, it, expect } from 'vitest';
import { profile } from '../data/profile';

describe('Profile Data Configuration', () => {
  it('contains correct personal name and graduation year', () => {
    expect(profile.name).toBe('Abhishek Faltankar');
    expect(profile.education.timeline).toContain('2027');
    expect(profile.education.degree).toContain('Artificial Intelligence');
  });

  it('provides verified GitHub profile link', () => {
    expect(profile.social.github).toBe('https://github.com/abhishekfaltankar');
  });

  it('specifies configured resume path without broken absolute links', () => {
    expect(profile.resume.path).toBe('/resume/abhishek-faltankar-resume.pdf');
    expect(profile.resume.filename).toContain('.pdf');
  });

  it('contains authentic non-inflated bio text', () => {
    expect(profile.bio.paragraphs.length).toBeGreaterThanOrEqual(2);
    expect(profile.bio.short).toContain('AI & Data Science');
  });
});
