import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { PortableTextBlock } from "@portabletext/react";
import PortableTextDisplay from "../components/common/PortableTextDisplay";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import SEO from "../components/seo";

const SingleProject = ({ data }: PageProps<Queries.SingleProjectQuery>) => {
  // Check if data.sanityProject exists before rendering the component
  if (!data.sanityProject) {
    return <div>Project data is not available.</div>;
  }

  const { title, major, contributors, content, seo } = data.sanityProject;

  const thumbnail = getImage(data.sanityProject.thumbnail?.asset ?? null);

  return (
    <main>
      <h1>{title}</h1>
    </main>
  );
};

export default SingleProject;

export const Head: HeadFC<Queries.SingleProjectQuery> = ({ data }) => {
  if (!data.sanityProject) {
    return <SEO />;
  }

  const { seo, thumbnail } = data.sanityProject;
  return <SEO 
    title={seo?.metaTitle}
    description={seo?.metaDescription}
    image={seo?.socialImage?.asset?.url || thumbnail?.asset?.url}
  />;
};

export const projectQuery = graphql`
  query SingleProject($id: String!) {
    sanityProject(id: { eq: $id }) {
      title
      major {
        title
      }
      contributors
      thumbnail {
        asset {
          gatsbyImageData(
            width: 1200
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
          url
        }
      }
      content {
        _rawChildren(resolveReferences: { maxDepth: 5 })
      }
      seo {
        metaTitle
        metaDescription
        socialImage {
          asset {
            url
          }
        }
      }
    }
  }
`;
