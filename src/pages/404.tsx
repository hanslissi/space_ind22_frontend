import { HeadFC } from "gatsby";
import React from "react";
import SEO from "../components/seo";

const NotFoundPage = () => {
  return (
    <main>
      <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-gray-dark text-white gap-12">
        <h1>Not Found</h1>
        <div>
          <p>Looks like empty SPACE</p>
        </div>
      </div>
    </main>
  );
};

export const Head: HeadFC = () => {
  return <SEO />;
};

export default NotFoundPage;
