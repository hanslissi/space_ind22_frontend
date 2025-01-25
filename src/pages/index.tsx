import React, { useEffect, useRef, useState } from 'react';
import { graphql, type HeadFC, type PageProps } from 'gatsby';
import SEO from '../components/seo';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import noiseInteractionSketch from '../sketches/TestSketch/NoiseInteractionSketch';
import imgSpaceTitle from '../images/sapce_full.png';
import ProjectsSection from '../components/sections/home/ProjectsSection';
import { map } from '../util/numUtils';
import SideNavigation, { SideNavItem } from '../components/common/SideNavigation';
import BigExhibitionFooter from '../components/common/BigExhibitionFooter';
import { motion, useScroll, useTransform } from 'framer-motion';
import MiniExhibitionHeader from '../components/common/MiniExhibitionHeader';

const IndexPage = ({ data }: PageProps<Queries.MajorsQuery>) => {
  const mainScrollDivRef = useRef<HTMLDivElement | null>(null);
  const spaceMaskRef = useRef<HTMLDivElement | null>(null);
  const [activeSectionHref, setActiveSectionHref] = useState('');
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const { scrollYProgress } = useScroll({
    container: mainScrollDivRef,
  });
  const { nodes: majors } = data.allSanityMajor;
  const { nodes: projects } = data.allSanityProject;

  useEffect(() => {
    const handleScroll = (e: Event) => {
      /** Scrolling Animation for Hero Image */
      let scrollPercentage =
        (mainScrollDivRef.current?.scrollTop || 0) /
        (mainScrollDivRef.current?.scrollHeight ?? 1);

      const scale = map(scrollPercentage, 0, 0.25, 1, 30);
      const opacity = map(scrollPercentage, 0, 0.25, 0, 1);

      spaceMaskRef.current?.style.setProperty('--scale-value', scale.toString());

      spaceMaskRef.current?.style.setProperty('--opacity-value', opacity.toString());

      /** Updating Section highlights */
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

    mainScrollDivRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      mainScrollDivRef.current?.removeEventListener('scroll', handleScroll);
    };
  });

  const navItems: SideNavItem[] = majors.map((major) => {
    return {
      title: major.title,
      majorSlug: `${major.slug?.current}`,
    } as SideNavItem;
  });

  const footerY = useTransform(scrollYProgress, [0, 0.25], ['0%', '100%']);
  const headerY = useTransform(scrollYProgress, [0, 0.25], ['-100%', '0%']);

  return (
    <main className="relative">
      <div
        className="fixed pointer-events-none -z-10"
        style={{
          WebkitMaskImage: `url(${imgSpaceTitle})`,
          maskImage: `url(${imgSpaceTitle}), linear-gradient(rgba(0,0,0,var(--opacity-value, 0)), rgba(0,0,0,var(--opacity-value, 0)))`,
          maskMode: 'alpha',
          maskSize: 'auto calc(var(--scale-value, 1) * 100%)',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          transition: 'mask-size 0.1s',
        }}
        ref={spaceMaskRef}
      >
        <ReactP5Wrapper
          sketch={noiseInteractionSketch}
          currentColorIdx={activeSectionIdx}
        />
      </div>

      <SideNavigation items={navItems} activeSectionHref={activeSectionHref} />
      <motion.div className="fixed w-full z-50" style={{ y: headerY }}>
        <MiniExhibitionHeader />
      </motion.div>

      <div
        className="relative h-screen snap-y snap-mandatory overflow-y-scroll"
        ref={mainScrollDivRef}
      >
        {/** Hero Section*/}
        <section
          className="h-screen snap-start bg-gradient-to-t from-black-transparent-20 to-transparent"
          id="hero"
        >
          <div className="fixed bottom-0 w-full">
            <motion.div className="w-full flex justify-center" style={{ y: footerY }}>
              <BigExhibitionFooter />
            </motion.div>
          </div>
        </section>

        {/** Majors Sections */}
        {majors.map((major, idx) => {
          const filteredProjects = projects.filter(
            (project) => project.major?.slug?.current === major.slug?.current
          );

          return (
            <ProjectsSection
              key={'projectSection' + idx}
              majorSlug={`${major.slug?.current}`}
              projects={filteredProjects}
              className="snap-start bg-black-transparent-20"
            />
          );
        })}
      </div>
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
