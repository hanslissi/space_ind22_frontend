import { motion, stagger, Transition, Variants } from 'framer-motion';
import { Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';

interface ProjectPreviewProps {
  title: string;
  slug: string;
  thumbnailImg: IGatsbyImageData | undefined;
}

const ProjectPreview = ({ title, slug, thumbnailImg }: ProjectPreviewProps) => {
  return (
    <Link
      to={`/${slug}`}
    >
      <motion.div 
      className="flex flex-col items-center bg-black rounded-3xl"
      whileHover={{ scale: 1.05 }}
      >
        {thumbnailImg ? (
          <GatsbyImage
            className="w-[300px] h-[200px] object-cover rounded-3xl"
            image={thumbnailImg}
            alt={`${title} project thumbnail`}
          />
        ) : (
          <div className="w-[300px] h-[200px] rounded-3xl"></div>
        )}
        <div className="w-full text-center p-2">{title}</div>
      </motion.div>
    </Link>
  );
};

export default ProjectPreview;
