import { motion, Variants } from "framer-motion";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface ProjectPreviewProps {
  title: string;
  slug: string;
  thumbnailImg: IGatsbyImageData | undefined;
}

const projectPreviewVariants: Variants = {
  idle: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
  }
}

const projectTitleVariants: Variants = {
  idle: {
    height: '0',
  },
  hover: {
    height: '50px',
  }
}

const placeHolderVariants: Variants = {
  idle: {
    height: '50px',
  },
  hover: {
    height: '0',
  }
}

const ProjectPreview = ({ title, slug, thumbnailImg }: ProjectPreviewProps) => {
  return (
    <motion.a 
    href={`/${slug}`}
    initial={'idle'}
    animate={'idle'}
    whileHover={'hover'}
    variants={projectPreviewVariants}
    >
      <div className="flex flex-col items-center bg-black rounded-3xl">
        {thumbnailImg && (
          <GatsbyImage
            className="w-[300px] h-[200px] object-cover rounded-3xl"
            image={thumbnailImg}
            alt={`${title} project thumbnail`}
          />
        )}
        <motion.div variants={projectTitleVariants} className="flex flex-col justify-center overflow-hidden">
          {title}
        </motion.div>
      </div>
      <motion.div variants={placeHolderVariants}></motion.div>
    </motion.a>
  );
};

export default ProjectPreview;
