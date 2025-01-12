import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";

const IndexPage = ({ data }: PageProps<Queries.MajorsQuery>) => {
  const {nodes: majors} = data.allSanityMajor;

  return (
    <main>
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
        {majors.map((major, i) => {
          return (
            <a key={i} href={major.slug?.current || '#'}>
              {major.title}
            </a>
          )
        })}
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Space Exhibition</title>;

export const majorsQuery = graphql`
  query Majors {
    allSanityMajor {
      nodes {
        title
        slug {
          current
        }
      }
    }
  }
`;
