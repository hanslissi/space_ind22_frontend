import { useSiteMetadata } from "../hooks/use-site-metadata";
import React, { ReactNode } from "react";

interface SEOProps {
  title?: string | null | undefined;
  description?: string | null | undefined;
  pathname?: string | null | undefined;
  image?: string | null | undefined;
  children?: ReactNode;
}

const SEO = ({ title, description, pathname, image, children }: SEOProps) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image: defaultImage,
    siteUrl,
  } = useSiteMetadata() || {};

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: `${siteUrl}${pathname || ""}`,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description || ""} />
      <meta name="image" content={seo.image || ""} />
      {children}
    </>
  );
};

export default SEO;
