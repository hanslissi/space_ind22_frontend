import React from "react";

interface BigExhibitionFooterProps {
  majors?: string[];
  currentMajor?: string;
}

const BigExhibitionFooter = ({ majors, currentMajor }: BigExhibitionFooterProps) => {
  return (
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
          {majors &&
            majors.map((major, idx) => (
              <div
                key={idx}
                className={`absolute transform left-1/2 -translate-x-1/2 transition-all duration-[500ms] ${
                  major === currentMajor
                    ? "opacity-100 translate-y-[0] z-10"
                    : "opacity-0 translate-y-[100%] z-0"
                }`}
              >
                {major}
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
  );
};

export default BigExhibitionFooter;
