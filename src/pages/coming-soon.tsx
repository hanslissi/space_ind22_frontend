import { HeadFC } from "gatsby";
import React, { useEffect, useState } from "react";
import SEO from "../components/seo";
import imgCommunicationDesign from "../images/SpacePlakatQ_communication.min.jpg";
import imgInteractionDesign from "../images/SpacePlakatQ_interaction.min.jpg";
import imgMediaDesign from "../images/SpacePlakatQ_media.min.jpg";
import { StaticImage } from "gatsby-plugin-image";

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
        <div className="w-full max-w-[550px] min-w-[300px] flex flex-col items-end sm:gap-4 gap-2 p-4 z-20">
          <div className="sm:text-2xl text-xl w-full flex flex-row sm:justify-between justify-center sm:pr-16">
            <div></div>
            <p className="leading-none">
              Eröffnung: 29.01.2025, 19:00
              <br />
              Lendhafen, Lendkai 17, 8020 Graz
            </p>
          </div>
          <h2 className="sm:text-2xl text-lg uppercase w-full flex flex-row justify-between">
            <div className="">IND22</div>
            <div className="relative w-full overflow-hidden">
              {majors.map((major, idx) => (
                <div
                  key={idx}
                  className={`absolute transform left-1/2 -translate-x-1/2 transition-all duration-[500ms] ${
                    idx === majorIdx
                      ? "opacity-100 translate-y-[0] z-10"
                      : "opacity-0 translate-y-[100%] z-0"
                  }`}
                >
                  {major.title}
                </div>
              ))}
            </div>
            <div className="text-right">exhibition</div>
          </h2>
          <div className="sm:text-6xl text-4xl w-full flex flex-row justify-between items-center gap-5">
            <div>30.01</div>
            <div className="w-full h-1 bg-white"></div>
            <div>01.02.2025</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const Head: HeadFC = () => {
  return <SEO />;
};

export default ComingSoon;
