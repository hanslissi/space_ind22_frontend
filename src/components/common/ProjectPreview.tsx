import { motion, stagger, Transition, Variants } from "framer-motion";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface ProjectPreviewProps {
  title: string;
  slug: string;
  thumbnailImg: IGatsbyImageData | undefined;
}

const ProjectPreview = ({ title, slug, thumbnailImg }: ProjectPreviewProps) => {
  return (
    <a 
    href={`/${slug}`}
    >
      <div className="flex flex-col items-center bg-black rounded-3xl">
        {thumbnailImg ? (
          <GatsbyImage
            className="w-[300px] h-[200px] object-cover rounded-3xl"
            image={thumbnailImg}
            alt={`${title} project thumbnail`}
          />
        ) : <div className="w-[300px] h-[200px] rounded-3xl"></div>}
        <div className="w-full text-center p-2">
          {title}
        </div>
      </div>
    </a>
  );
};

export default ProjectPreview;
