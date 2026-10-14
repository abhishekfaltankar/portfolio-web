/**
 * GitHub Data Access Service
 * Handles caching, error handling, rate limiting, and fallbacks for public GitHub data.
 * Does not expose any secrets or use dangerouslySetInnerHTML.
 */

const GITHUB_USERNAME = "abhishekfaltankar";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`;
const CACHE_KEY = `github_repos_${GITHUB_USERNAME}`;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache

// Curated verified fallbacks matching real public repositories
export const fallbackRepositories = [
  {
    id: 1,
    name: "Multimodal-Deepfake-Detection",
    full_name: "abhishekfaltankar/Multimodal-Deepfake-Detection",
    html_url: "https://github.com/abhishekfaltankar/Multimodal-Deepfake-Detection",
    description: "Explainable multimodal deepfake detection system classifying videos into 6 categories with forensic reporting and Streamlit web dashboard.",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-10-14T11:00:00Z",
    isFallback: true
  },
  {
    id: 2,
    name: "FactoryPulse",
    full_name: "abhishekfaltankar/FactoryPulse",
    html_url: "https://github.com/abhishekfaltankar/FactoryPulse",
    description: "Industrial Predictive Maintenance & IIoT Machine Telemetry Platform with physics-derived ML feature engineering and FastAPI backend.",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-10-14T11:04:30Z",
    isFallback: true
  },
  {
    id: 3,
    name: "age-calculator-app",
    full_name: "abhishekfaltankar/age-calculator-app",
    html_url: "https://github.com/abhishekfaltankar/age-calculator-app",
    homepage: "https://age-calculator-app-nu-lilac.vercel.app",
    description: "Frontend date validation and calculation application with edge-case handling for leap years and month lengths.",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-04-07T06:48:25Z",
    isFallback: true
  },
  {
    id: 4,
    name: "enterprise-retail-intelligence-platform",
    full_name: "abhishekfaltankar/enterprise-retail-intelligence-platform",
    html_url: "https://github.com/abhishekfaltankar/enterprise-retail-intelligence-platform",
    description: "End-to-end AI-powered retail analytics platform using Python, SQL, PostgreSQL, Power BI, Machine Learning, and Streamlit.",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-10-14T11:07:58Z",
    isFallback: true
  },
  {
    id: 5,
    name: "leetcode-solutions",
    full_name: "abhishekfaltankar/leetcode-solutions",
    html_url: "https://github.com/abhishekfaltankar/leetcode-solutions",
    description: "A collection of my LeetCode solutions in SQL, Python, and Java. Documenting coding practice and algorithm patterns.",
    language: "Java",
    stargazers_count: 1,
    forks_count: 0,
    updated_at: "2026-08-08T17:41:56Z",
    isFallback: true
  },
  {
    id: 6,
    name: "gdp-project-india",
    full_name: "abhishekfaltankar/gdp-project-india",
    html_url: "https://github.com/abhishekfaltankar/gdp-project-india",
    homepage: "https://gdp-project-india.vercel.app",
    description: "Data analysis project studying macroeconomic indicators and sectoral GDP trends in India.",
    language: "Jupyter Notebook",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-07-21T07:20:30Z",
    isFallback: true
  }
];

/**
 * Reads valid cached repositories from localStorage if within TTL
 */
function getCachedRepos() {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { timestamp, repos } = JSON.parse(raw);
    if (Date.now() - timestamp < CACHE_TTL_MS && Array.isArray(repos)) {
      return { repos, isStale: false };
    }
    // Return stale cache if expired (useful for offline resilience)
    return { repos, isStale: true };
  } catch (e) {
    return null;
  }
}

/**
 * Saves repositories to localStorage with current timestamp
 */
function setCachedRepos(repos) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), repos })
    );
  } catch (e) {
    // Ignore storage quota errors silently
  }
}

/**
 * Fetches public repositories from the GitHub REST API.
 * Safely parses response and falls back to cached or local data on error.
 */
export async function fetchUserRepositories(forceRefresh = false) {
  // Check fresh cache first if not forced
  if (!forceRefresh) {
    const cacheResult = getCachedRepos();
    if (cacheResult && !cacheResult.isStale && cacheResult.repos.length > 0) {
      return {
        repos: cacheResult.repos,
        source: "cache",
        error: null
      };
    }
  }

  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        Accept: "application/vnd.github.v3+json"
      }
    });

    if (!response.ok) {
      const errorMsg =
        response.status === 403
          ? "GitHub API rate limit reached. Displaying verified repository snapshot."
          : `GitHub API error (HTTP ${response.status}). Displaying repository snapshot.`;

      // Fall back to stale cache or local fallback data
      const cached = getCachedRepos();
      const fallbackData = cached?.repos?.length ? cached.repos : fallbackRepositories;

      return {
        repos: fallbackData,
        source: "fallback",
        error: errorMsg
      };
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Unexpected API response structure");
    }

    // Filter out config repository (e.g. abhishekfaltankar/abhishekfaltankar) if desired,
    // or keep all valid software repositories. Clean and sanitize fields.
    const sanitized = data
      .filter((repo) => repo.name !== "abhishekfaltankar") // filter profile README repo
      .map((repo) => ({
        id: repo.id,
        name: String(repo.name || ""),
        full_name: String(repo.full_name || ""),
        html_url: String(repo.html_url || ""),
        description: repo.description ? String(repo.description) : null,
        language: repo.language ? String(repo.language) : "Other",
        stargazers_count: typeof repo.stargazers_count === "number" ? repo.stargazers_count : 0,
        forks_count: typeof repo.forks_count === "number" ? repo.forks_count : 0,
        homepage: repo.homepage ? String(repo.homepage) : null,
        updated_at: repo.updated_at || repo.pushed_at || null,
        isFallback: false
      }));

    setCachedRepos(sanitized);

    return {
      repos: sanitized,
      source: "api",
      error: null
    };
  } catch (err) {
    // Network or parsing failure
    const cached = getCachedRepos();
    const fallbackData = cached?.repos?.length ? cached.repos : fallbackRepositories;

    return {
      repos: fallbackData,
      source: "fallback",
      error: "Unable to reach GitHub API directly. Showing verified repository list."
    };
  }
}
