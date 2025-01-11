import React from "react";
import { graphql, PageProps } from "gatsby";

const SingleMajor = ({ data }: PageProps<Queries.MajorProjectsQueryQuery>) => {
  console.log(data);

  const {allSanityProject, sanityMajor} = data;
  return <main>
    <h1>{sanityMajor?.title}</h1>
    {allSanityProject.nodes.map((project, i) => {
        return (<a key={i}>
            {project.title}
        </a>);
    })}
  </main>;
};

export default SingleMajor;

export const majorPojectsQuery = graphql`
  query MajorProjectsQuery($id: String!) {
    sanityMajor(id: { eq: $id }) {
      title
      slug {
        current
      }
    }
    allSanityProject(filter: { major: { id: { eq: $id } } }) {
      nodes {
        slug {
          current
        }
        title
      }
    }
  }
`;
