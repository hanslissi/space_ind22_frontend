import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface ProjectPreviewProps {
  title: string;
  slug: string;
  thumbnailImg: IGatsbyImageData | undefined;
}

const ProjectPreview = ({ title, slug, thumbnailImg }: ProjectPreviewProps) => {
  return (
    <a href={`/${slug}`}>
      <div className="flex flex-col items-center gap-2 bg-black rounded-3xl">
        {thumbnailImg && (
          <GatsbyImage
            className="w-[300px] h-[200px] object-cover rounded-3xl"
            image={thumbnailImg}
            alt={`${title} project thumbnail`}
          />
        )}
        {title}
      </div>
    </a>
  );
};

export default ProjectPreview;
