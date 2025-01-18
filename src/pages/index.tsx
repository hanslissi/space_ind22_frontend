import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
import SEO from "../components/seo";
import SideNavigation, {
  SideNavItem,
} from "../components/common/SideNavigation/SideNavigation";

const IndexPage = ({ data }: PageProps<Queries.MajorsQuery>) => {
  const { nodes: majors } = data.allSanityMajor;

  const navItems: SideNavItem[] = majors.map((major) => {
    return {
      title: major.title,
      href: `#${major.slug?.current}`,
    } as SideNavItem;
  });

  return (
    <main>
      <SideNavigation items={navItems} />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => {
  return <SEO />;
};

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
