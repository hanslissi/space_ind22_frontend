import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import SEO from "../components/seo";

const SingleMajor = ({ data }: PageProps<Queries.MajorProjectsQuery>) => {
  console.log(data);

  const { allSanityProject, sanityMajor } = data;
  return (
    <main>
      <h1>{sanityMajor?.title}</h1>
      {allSanityProject.nodes.map((project, i) => {
        return (
          <a key={i} href={project.slug?.current || "#"}>
            {project.title}
          </a>
        );
      })}
    </main>
  );
};

export default SingleMajor;

export const Head: HeadFC<Queries.MajorProjectsQuery> = ({
  data,
}) => {
  // TODO: Fetch Metadata from sanity (not yet available)
  return <SEO />;
};

export const majorPojectsQuery = graphql`
  query MajorProjects($id: String!) {
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
