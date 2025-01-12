import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Space Exhibition 2025`,
    description: `Explore innovative projects by bachelor students of Communication Design, Interaction Design, and Media Design at FH Joanneum. Space Exhibition 2025 showcases creativity and cutting-edge design from the next generation of designers.`,
    siteUrl: `https://www.tbd.tbd`,
    image: `/default_social_image.png`
  },
  graphqlTypegen: true,
  plugins: [{
    resolve: 'gatsby-source-sanity',
    options: {
      "projectId": "962k8imr",
      "dataset": "production"
    }
  }, "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-postcss"]
};

export default config;
