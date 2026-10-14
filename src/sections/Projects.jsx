import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { GitHubProjects } from '../components/GitHubProjects';
import { featuredProjects } from '../data/projects';

/**
 * Projects Section Component
 * Displays the 3 primary verified projects with case-study modals, followed by live GitHub feed.
 */
export function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="work" className="py-16 sm:py-20 border-t border-edge/60">
      <SectionHeading
        number="02"
        label="Selected Work"
        title="Featured Engineering Projects"
        subtitle="Three focused projects spanning computer vision forensics, predictive industrial telemetry, and frontend date validation. Built from scratch with verified codebases."
      />

      {/* 3 Featured Projects Cards */}
      <div className="space-y-8">
        {featuredProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            onOpenDeepDive={(proj) => setActiveProject(proj)}
          />
        ))}
      </div>

      {/* Case Study Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}

      {/* Live GitHub Public Activity Feed */}
      <div id="repositories">
        <GitHubProjects />
      </div>
    </section>
  );
}
