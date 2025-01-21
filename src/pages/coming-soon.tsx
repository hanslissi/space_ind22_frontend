import { HeadFC } from "gatsby";
import React, { useEffect, useState } from "react";
import SEO from "../components/seo";
import { StaticImage } from "gatsby-plugin-image";
import BigExhibitionFooter from "../components/common/BigExhibitionFooter";

const imgCommunicationDesignPath =
  "../images/SpacePlakatQ_communication.min.jpg";
const imgInteractionDesignPath = "../images/SpacePlakatQ_interaction.min.jpg";
const imgMediaDesignPath = "../images/SpacePlakatQ_media.min.jpg";

type Major = {
  title: string;
  imageComponent: JSX.Element;
};

const ComingSoon = () => {
  const [majorIdx, setMajorIdx] = useState(0);

  const majors: Major[] = [
    {
      title: "Communication",
      imageComponent: (
        <StaticImage
          src={imgCommunicationDesignPath}
          className="h-full"
          alt="Communication Design (Orange Red) Poster"
          layout="fullWidth"
          placeholder="blurred"
          quality={90}
        />
      ),
    },
    {
      title: "Interaction",
      imageComponent: (
        <StaticImage
          src={imgInteractionDesignPath}
          className="h-full"
          alt="Interaction Design (Green) Poster"
          placeholder="blurred"
          quality={90}
        />
      ),
    },
    {
      title: "Media",
      imageComponent: (
        <StaticImage
          src={imgMediaDesignPath}
          className="h-full"
          alt="Media Design (Blue) Poster"
          layout="fullWidth"
          placeholder="blurred"
          quality={90}
        />
      ),
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMajorIdx((prevIdx) => (prevIdx + 1) % majors.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <main>
      <div className="w-full h-[100vh] flex flex-col justify-end items-center bg-gray-dark text-white font-light">
        <div className="absolute top-0 left-0 w-full h-full">
          {majors.map((major, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-[1800ms] ${
                idx === majorIdx ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {major.imageComponent}
            </div>
          ))}
        </div>
        <BigExhibitionFooter
          majors={majors.map(major => major.title)}
          currentMajor={majors[majorIdx].title}
        />
      </div>
    </main>
  );
};

export const Head: HeadFC = () => {
  return <SEO />;
};

export default ComingSoon;
