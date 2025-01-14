import { HeadFC } from "gatsby";
import React from "react";
import SEO from "../components/seo";

const ComingSoon = () => {
  return (
    <main>
      <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-gray-dark gap-12">
        <h1>SPACE</h1>
        <div>
          <p>29.01 - 31.01.2025</p>
          <p>Lendkai 17, 8020 Graz</p>
        </div>
      </div>
    </main>
  );
};

export const Head: HeadFC = () => {
  return <SEO />;
};

export default ComingSoon;
