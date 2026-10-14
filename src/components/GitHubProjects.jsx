import React, { useState, useEffect } from 'react';
import { fetchUserRepositories } from '../services/github';
import { Star, GitFork, RefreshCw, AlertCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { GithubIcon } from './Icons';

/**
 * GitHubProjects Component
 * Live integration with public GitHub profile with caching, error state & manual retry.
 */
export function GitHubProjects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const loadData = async (force = false) => {
    if (force) setRetrying(true);
    else setLoading(true);

    try {
      const result = await fetchUserRepositories(force);
      setRepos(result.repos || []);
      setSource(result.source);
      setError(result.error);
    } catch (err) {
      setError("Unable to retrieve repositories from GitHub API.");
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  useEffect(() => {
    loadData(false);
  }, []);

  return (
    <div className="mt-14 pt-10 border-t border-edge/60">
      {/* Top bar with sync indicator and retry */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider mb-1">
            <GithubIcon size={14} />
            <span>GitHub Public Activity Feed</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-content-primary">
            Public Repositories
          </h3>
          <p className="text-xs sm:text-sm text-content-secondary mt-1">
            Real-time feed synced directly from{' '}
            <a
              href="https://github.com/abhishekfaltankar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              github.com/abhishekfaltankar
            </a>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {source && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-base-elevated border border-edge text-content-muted">
              <ShieldCheck size={13} className="text-accent" />
              <span>{source === 'api' ? 'Live API Synced' : 'Cached / Verified Snapshot'}</span>
            </span>
          )}

          <button
            onClick={() => loadData(true)}
            disabled={retrying || loading}
            aria-label="Refresh GitHub repositories"
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded bg-base-elevated hover:bg-base-hover border border-edge text-content-primary transition-colors focus:ring-1 focus:ring-accent disabled:opacity-50"
          >
            <RefreshCw size={12} className={retrying ? 'animate-spin text-accent' : ''} />
            <span>{retrying ? 'Refreshing...' : 'Sync'}</span>
          </button>
        </div>
      </div>

      {/* Error / Rate limit notification if any */}
      {error && (
        <div
          role="alert"
          className="mb-6 p-3.5 rounded bg-amber-950/30 border border-amber-800/40 text-amber-300 text-xs sm:text-sm flex items-start gap-2.5 font-mono"
        >
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div className="flex-1">
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy="true">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="p-5 rounded-lg bg-base-secondary/60 border border-edge/60 animate-pulse space-y-3 h-40"
            >
              <div className="h-4 bg-base-elevated rounded w-3/4"></div>
              <div className="h-3 bg-base-elevated rounded w-full"></div>
              <div className="h-3 bg-base-elevated rounded w-5/6"></div>
              <div className="h-3 bg-base-elevated rounded w-1/3 pt-2"></div>
            </div>
          ))}
        </div>
      ) : repos.length === 0 ? (
        /* Empty State */
        <div className="p-8 rounded-lg bg-base-secondary/50 border border-edge text-center font-mono text-sm text-content-muted">
          <p>No public repositories found at this time.</p>
          <button
            onClick={() => loadData(true)}
            className="mt-4 px-4 py-1.5 rounded bg-accent text-base text-xs font-semibold hover:bg-accent-hover"
          >
            Retry Connection
          </button>
        </div>
      ) : (
        /* Repository Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <a
              key={repo.id || repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-4 sm:p-5 rounded-lg bg-base-secondary/70 hover:bg-base-elevated border border-edge/70 hover:border-edge transition-all focus:ring-1 focus:ring-accent"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-mono text-xs sm:text-sm font-semibold text-content-primary group-hover:text-accent transition-colors break-word-safe">
                    {repo.name}
                  </h4>
                  <ExternalLink
                    size={14}
                    className="text-content-muted group-hover:text-accent shrink-0 mt-0.5 transition-colors"
                  />
                </div>
                <p className="text-xs text-content-secondary line-clamp-3 leading-relaxed mb-4">
                  {repo.description || "No public description provided on repository."}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-content-muted pt-3 border-t border-edge/40">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent/80"></span>
                  <span>{repo.language || 'Code'}</span>
                </div>
                <div className="flex items-center gap-3">
                  {typeof repo.stargazers_count === 'number' && (
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-content-muted" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                  )}
                  {typeof repo.forks_count === 'number' && repo.forks_count > 0 && (
                    <span className="flex items-center gap-1">
                      <GitFork size={12} className="text-content-muted" />
                      <span>{repo.forks_count}</span>
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Profile footer link */}
      <div className="mt-8 text-center font-mono text-xs">
        <a
          href="https://github.com/abhishekfaltankar?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-base-elevated hover:bg-base-hover border border-edge text-content-primary transition-colors focus:ring-1 focus:ring-accent"
        >
          <GithubIcon size={14} />
          <span>View All Repositories on GitHub</span>
        </a>
      </div>
    </div>
  );
}
