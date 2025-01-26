import React from 'react';
import ProjectPreview from '../../common/ProjectPreview';
import clsx from 'clsx';
import { motion } from 'framer-motion';

type ProjectNodes = Queries.MajorsQuery['allSanityProject']['nodes'];

interface ProjectsSectionProps {
  majorSlug: string;
  projects: ProjectNodes;
  className?: string;
}

const ProjectsSection = ({ majorSlug, projects, className }: ProjectsSectionProps) => {
  return (
    <section id={majorSlug} className={clsx('h-screen md:pt-0 pt-40', className)}>
      <div
        className="h-full overflow-y-scroll scrollbar-hidden"
        style={{
          maskImage:
            'linear-gradient(0deg, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 95%)',
        }}
      >
        <div className="container mx-auto min-h-full flex flex-col items-end justify-center py-24">
          <div className="md:max-w-[80%] w-full flex flex-row flex-wrap justify-center gap-12">
            {projects.map((project, idx) => {
              return (
                <motion.div
                  key={'project' + idx}
                  initial={{ opacity: 0, scale: 0.8, rotate: 8 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{delay: 0.1}}
                >
                  <ProjectPreview
                    title={`${project.title}`}
                    slug={`${project.slug?.current}`}
                    thumbnailImg={project.thumbnail?.asset?.gatsbyImageData}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
