import React from 'react';
import ProjectPreview from '../../common/ProjectPreview';
import clsx from 'clsx';

type ProjectNodes = Queries.MajorsQuery['allSanityProject']['nodes'];

interface ProjectsSectionProps {
  majorSlug: string;
  projects: ProjectNodes;
  className?: string;
}

const ProjectsSection = ({ majorSlug, projects, className }: ProjectsSectionProps) => {
  return (
    <section id={majorSlug} className={className}>
      <div className="container mx-auto h-screen flex flex-col items-end justify-center">
        <div className="max-w-[80%] flex flex-row flex-wrap justify-center gap-12">
          {projects.map((project, idx) => {
            return (
              <ProjectPreview
                title={`${project.title}`}
                slug={`${project.slug?.current}`}
                thumbnailImg={project.thumbnail?.asset?.gatsbyImageData}
              />
            );
          })}
          {projects.map((project, idx) => {
            return (
              <ProjectPreview
                title={`${project.title}`}
                slug={`${project.slug?.current}`}
                thumbnailImg={project.thumbnail?.asset?.gatsbyImageData}
              />
            );
          })}
          {projects.map((project, idx) => {
            return (
              <ProjectPreview
                title={`${project.title}`}
                slug={`${project.slug?.current}`}
                thumbnailImg={project.thumbnail?.asset?.gatsbyImageData}
              />
            );
          })}
          {projects.map((project, idx) => {
            return (
              <ProjectPreview
                title={`${project.title}`}
                slug={`${project.slug?.current}`}
                thumbnailImg={project.thumbnail?.asset?.gatsbyImageData}
              />
            );
          })}
          {projects.map((project, idx) => {
            return (
              <ProjectPreview
                title={`${project.title}`}
                slug={`${project.slug?.current}`}
                thumbnailImg={project.thumbnail?.asset?.gatsbyImageData}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
