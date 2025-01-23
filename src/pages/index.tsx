import React, { act, useEffect, useState } from 'react';
import { graphql, type HeadFC, type PageProps } from 'gatsby';
import SEO from '../components/seo';
import SideNavigation, { SideNavItem } from '../components/common/SideNavigation';
import ProjectsSection from '../components/sections/home/ProjectsSection';
import BigExhibitionFooter from '../components/common/BigExhibitionFooter';
import MiniExhibitionHeader from '../components/common/MiniExhibitionHeader';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import noiseInteractionSketch from '../sketches/TestSketch/NoiseInteractionSketch';
import imgSpaceTitle from '../images/sapce_full.png';

const IndexPage = ({ data }: PageProps<Queries.MajorsQuery>) => {
  const [activeSectionHref, setActiveSectionHref] = useState('');
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const { nodes: majors } = data.allSanityMajor;
  const { nodes: projects } = data.allSanityProject;

  const navItems: SideNavItem[] = majors.map((major) => {
    return {
      title: major.title,
      majorSlug: `${major.slug?.current}`,
    } as SideNavItem;
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.majorSlug));

      sections.push(document.getElementById('hero'));

      let activeId = '';
      let activeIdx = 0;
      sections.forEach((section, idx) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            activeId = section.id;
            activeIdx = idx;
          }
        }
      });

      if (activeId) {
        setActiveSectionHref(activeId);
        setActiveSectionIdx(activeId === 'hero' ? -1 : activeIdx);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check in case the page is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]);

  return (
    <main className="relative overflow-hidden">
      {/** Background Noise Interaction Sketch */}
      <div
        className="fixed"
        style={{
          maskImage: `url(${imgSpaceTitle})`,
          maskMode: 'alpha',
          maskSize: 'auto 100%',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
        }}
      >
        <ReactP5Wrapper
          sketch={noiseInteractionSketch}
          currentColorIdx={activeSectionIdx}
        />
      </div>

      <MiniExhibitionHeader fixed />
      <SideNavigation items={navItems} activeSectionHref={activeSectionHref} />
      <section className="h-[100vh] flex flex-col items-center justify-end" id="hero">
        <BigExhibitionFooter />
      </section>
      {majors.map((major, idx) => {
        const filteredProjects = projects.filter(
          (project) => project.major?.slug?.current === major.slug?.current
        );

        return (
          <ProjectsSection
            key={'projectSection' + idx}
            majorSlug={`${major.slug?.current}`}
            projects={filteredProjects}
          />
        );
      })}
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => {
  return <SEO />;
};

export const majorsQuery = graphql`
  query Majors {
    allSanityMajor(sort: { title: ASC }) {
      nodes {
        title
        slug {
          current
        }
      }
    }
    allSanityProject {
      nodes {
        title
        slug {
          current
        }
        major {
          slug {
            current
          }
        }
        thumbnail {
          asset {
            gatsbyImageData(
              width: 300
              placeholder: DOMINANT_COLOR
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`;
