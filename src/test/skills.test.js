import { describe, it, expect } from 'vitest';
import { skillCategories } from '../data/skills';

describe('Skills Data Configuration', () => {
  it('contains four distinct skill categories', () => {
    expect(skillCategories).toHaveLength(4);
    const categoryIds = skillCategories.map((c) => c.id);
    expect(categoryIds).toEqual(['languages', 'data-ai', 'web-backend', 'tools']);
  });

  it('each category has a title, description, and non-empty skills array', () => {
    skillCategories.forEach((category) => {
      expect(category.title).toBeTruthy();
      expect(category.description).toBeTruthy();
      expect(category.skills.length).toBeGreaterThan(0);
      category.skills.forEach((skill) => {
        expect(skill.name).toBeTruthy();
        expect(skill.context).toBeTruthy();
      });
    });
  });

  it('includes key technologies relevant to candidate profile', () => {
    const allSkillNames = skillCategories.flatMap((c) => c.skills.map((s) => s.name));
    expect(allSkillNames).toContain('Python');
    expect(allSkillNames).toContain('PyTorch');
    expect(allSkillNames).toContain('React');
    expect(allSkillNames).toContain('Git & GitHub');
    expect(allSkillNames).toContain('Scikit-Learn');
  });
});
