import { HeadFC } from "gatsby";
import React, { useEffect, useState } from "react";
import SEO from "../components/seo";
import imgCommunicationDesign from "../images/SpacePlakatQ_communication.min.jpg";
import imgInteractionDesign from "../images/SpacePlakatQ_interaction.min.jpg";
import imgMediaDesign from "../images/SpacePlakatQ_media.min.jpg";
import { StaticImage } from "gatsby-plugin-image";

const ComingSoon = () => {
  const [imgIdx, setImgIdx] = useState(0);

  const images = [
    imgCommunicationDesign,
    imgInteractionDesign,
    imgMediaDesign,
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(images.length);
      setImgIdx((prevIdx) => (prevIdx + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId); //This is important
  }, []);
  return (
    <main>
      <div className="w-full h-[100vh] flex flex-col justify-end items-center bg-gray-dark text-white font-light">
        <div className="absolute top-0 left-0 w-full h-full">
          {images.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Space Exhibition Poster ${idx + 1}`}
              className={`absolute object-cover select-none inset-0 w-full h-[100vh] transition-opacity duration-[1800ms] ${
                idx === imgIdx ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
        </div>
        <div className="w-full max-w-[550px] min-w-[300px] flex flex-col items-end sm:gap-4 gap-2 p-4 z-20">
          <div className="sm:text-2xl text-xl w-full flex flex-row justify-between pr-16">
            <div></div>
            <p className="leading-none">
              Lendkai 17, 8020 Graz
              <br />
              Eröffnung: 30.01 19:00
            </p>
          </div>
          <h2 className="sm:text-4xl text-2xl uppercase w-full flex flex-row justify-between">
            <div>IND22</div>
            <div>exhibition</div>
          </h2>
          <div className="sm:text-6xl text-4xl w-full flex flex-row justify-between items-center gap-5">
            <div>29.01</div>
            <div className="w-full h-1 bg-white"></div>
            <div>31.01.2024</div>
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
