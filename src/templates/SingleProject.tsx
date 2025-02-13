import React from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import SEO from '../components/seo';
import MiniExhibitionHeader from '../components/common/MiniExhibitionHeader';
import { PortableTextBlock } from '@portabletext/react';
import PortableTextDisplay from '../components/common/PortableTextDisplay';
import { getTextHalves } from '../util/textUtils';
import FullscreenImage from '../components/common/ClickableImage';
import CopyrightFooter from '../components/common/CopyrightFooter';

const SingleProject = ({ data }: PageProps<Queries.SingleProjectQuery>) => {
  // Check if data.sanityProject exists before rendering the component
  if (!data.sanityProject) {
    return <div>Project data is not available.</div>;
  }

  const { title, major, contributors, content, pictures } = data.sanityProject;

  const thumbnail = data.sanityProject.thumbnail?.asset?.gatsbyImageData;

  return (
    <main>
      <section className="h-screen min-h-[700px] md:px-10 px-4 flex flex-col items-center justify-between">
        <MiniExhibitionHeader className="container px-0" />
        <div className="container h-full flex flex-col lg:gap-10 gap-4 lg:items-end justify-center">
          <h1 className="w-full ">{title}</h1>
          <div className="lg:w-[50%] w-full aspect-video">
            {thumbnail && (
              <GatsbyImage
                image={thumbnail}
                alt={`${title} project thumbnail`}
                className="h-full w-full object-cover rounded-3xl"
              />
            )}
          </div>
        </div>
        <div className="pb-4">
          <StaticImage
            src="../images/icons/arrowDown.svg"
            alt="Little Arrow Pointing Down"
          />
        </div>
      </section>
      <section className="container mx-auto md:px-10 px-4 min-h-screen flex flex-col gap-16 justify-center">
        <div className="flex lg:flex-row flex-col justify-center lg:gap-32 gap-16 md:py-40 py-20">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm opacity-40">Studenten</h2>
            <ul>
              {contributors?.map((contributor, idx) => (
                <li key={'contributor' + idx}>
                  <p>{contributor}</p>
                </li>
              ))}
              <li className="text-sm opacity-40 mt-4">Project Copyright © 2025</li>
            </ul>
          </div>
          <div className="lg:w-[50%] w-full flex flex-col gap-3">
            <h2 className="text-sm opacity-40">Projekt Beschreibung</h2>
            {/** TODO: Really whack approach right now, only quick solution I found without completely ruining the query tyes */}
            <PortableTextDisplay value={content as unknown as PortableTextBlock[]} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:w-[80%] w-full mx-auto">
          <div className="flex flex-col w-full gap-4">
            {pictures?.slice(0, pictures.length / 2).map((picture, idx) => {
              const imageData = picture?.asset?.gatsbyImageData;
              if (!imageData) {
                return null;
              }

              return (
                <FullscreenImage
                  key={'picture row 1 ' + idx}
                  image={picture?.asset?.gatsbyImageData}
                  alt={`${title} project picture ${idx}`}
                />
              );
            })}
          </div>
          <div className="flex flex-col w-full gap-4">
            {pictures?.slice(pictures.length / 2, pictures.length).map((picture, idx) => {
              const imageData = picture?.asset?.gatsbyImageData;
              if (!imageData) {
                return null;
              }

              return (
                <FullscreenImage
                  key={'picture row 2 ' + idx}
                  image={picture?.asset?.gatsbyImageData}
                  alt={`${title} project picture ${Math.floor(idx + pictures.length / 2)}`}
                />
              );
            })}
          </div>
        </div>
      </section>
      <CopyrightFooter className="container mx-auto md:px-10 px-4 " />
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
          gatsbyImageData(width: 1200, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          url
        }
      }
      content: _rawContent(resolveReferences: { maxDepth: 5 })
      pictures {
        asset {
          gatsbyImageData(width: 1200, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
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
