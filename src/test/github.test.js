import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchUserRepositories } from '../services/github';

describe('GitHub Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('provides verified fallback repositories when API is unreachable', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const result = await fetchUserRepositories(true);
    expect(result.source).toBe('fallback');
    expect(result.repos.length).toBeGreaterThan(0);
    expect(result.error).toBeTruthy();

    const deepfake = result.repos.find((r) => r.name === 'Multimodal-Deepfake-Detection');
    expect(deepfake).toBeDefined();
  });

  it('handles HTTP 403 rate-limiting gracefully without crashing', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({ message: 'API rate limit exceeded' }),
    });

    const result = await fetchUserRepositories(true);
    expect(result.source).toBe('fallback');
    expect(result.error).toContain('rate limit');
    expect(result.repos.length).toBeGreaterThan(0);
  });

  it('parses valid API response and sanitizes fields safely', async () => {
    const mockData = [
      {
        id: 101,
        name: 'test-repo',
        full_name: 'abhishekfaltankar/test-repo',
        html_url: 'https://github.com/abhishekfaltankar/test-repo',
        description: 'A test repository',
        language: 'Python',
        stargazers_count: 5,
        forks_count: 1,
      },
      {
        id: 102,
        name: 'abhishekfaltankar', // Config repo should be filtered
        full_name: 'abhishekfaltankar/abhishekfaltankar',
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    const result = await fetchUserRepositories(true);
    expect(result.source).toBe('api');
    expect(result.error).toBeNull();
    expect(result.repos).toHaveLength(1);
    expect(result.repos[0].name).toBe('test-repo');
    expect(result.repos[0].stargazers_count).toBe(5);
  });
});
