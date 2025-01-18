import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import SEO from "../components/seo";
import MiniExhibitionHeader from "../components/common/MiniExhibitionHeader";

const SingleProject = ({ data }: PageProps<Queries.SingleProjectQuery>) => {
  // Check if data.sanityProject exists before rendering the component
  if (!data.sanityProject) {
    return <div>Project data is not available.</div>;
  }

  const { title, major, contributors, content, seo } = data.sanityProject;

  const thumbnail = data.sanityProject.thumbnail?.asset?.gatsbyImageData;

  return (
    <main>
      <section className="h-[100vh] flex flex-col items-center justify-between">
        <MiniExhibitionHeader />
        <div>
          {thumbnail && (
            <GatsbyImage
              className="w-[300px] h-[200px] object-cover rounded-3xl"
              image={thumbnail}
              alt={`${title} project thumbnail`}
            />
          )}
        </div>
        <div>
          <StaticImage
            src="../images/icons/arrowDown.svg"
            alt="Little Arrow Pointing Down"
          />
        </div>
      </section>
      <section className="container mx-auto h-[100vh] flex flex-col justify-center">
        <div className="flex flex-row justify-center">
          <div className="w-full flex flex-col gap-3">
            <h2 className="text-xs opacity-40">Studenten</h2>
            <ul>
              {contributors?.map((contributor) => (
                <li>
                  <p>{contributor}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[50%] flex flex-col gap-3">
            <h2 className="text-xs opacity-40">Projekt Beschreibung</h2>
            <p>
              Our short film follows the journey of a robot who has spent
              decades searching for a habitable planet. Traveling from one world
              to the next, he roams the vast expanse of space in his spaceship.
              But just as he orbits a promising planet, disaster strikes—a grim
              message arrives: his electricity contract has been cancelled. In a
              frantic attempt to regain control, he struggles to maneuver the
              spaceship, but the planet’s gravitational pull has already taken
              hold, sealing his fate.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleProject;

export const Head: HeadFC<Queries.SingleProjectQuery> = ({ data }) => {
  if (!data.sanityProject) {
    return <SEO />;
  }

  const { seo, thumbnail } = data.sanityProject;
  return (
    <SEO
      title={seo?.metaTitle}
      description={seo?.metaDescription}
      image={seo?.socialImage?.asset?.url || thumbnail?.asset?.url}
    />
  );
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
