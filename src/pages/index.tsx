import React, { useEffect, useState } from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
import SEO from "../components/seo";
import SideNavigation, {
  SideNavItem,
} from "../components/common/SideNavigation";
import ProjectsSection from "../components/sections/home/ProjectsSection";
import BigExhibitionFooter from "../components/common/BigExhibitionFooter";
import MiniExhibitionHeader from "../components/common/MiniExhibitionHeader";

const IndexPage = ({ data }: PageProps<Queries.MajorsQuery>) => {
  const [activeSectionHref, setActiveSectionHref] = useState("");
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
      const sections = navItems.map((item) =>
        document.getElementById(item.majorSlug)
      );

      sections.push(document.getElementById("hero"));

      let activeId = "";
      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            activeId = section.id;
          }
        }
      });

      if (activeId) {
        setActiveSectionHref(activeId);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check in case the page is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navItems]);

  return (
    <main>
      <MiniExhibitionHeader fixed/>
      <SideNavigation items={navItems} activeSectionHref={activeSectionHref} />
      <section
        className="h-[100vh] flex flex-col items-center justify-end"
        id="hero"
      >
        <BigExhibitionFooter />
      </section>
      {majors.map((major, idx) => {
        const filteredProjects = projects.filter(
          (project) => project.major?.slug?.current === major.slug?.current
        );

        return (
          <ProjectsSection
            key={"projectSection" + idx}
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
