import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const data: Queries.SiteMetadataQuery = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          image
          siteUrl
        }
      }
    }
  `);

  return data.site?.siteMetadata;
};
