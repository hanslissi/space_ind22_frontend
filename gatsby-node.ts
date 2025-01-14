import type { GatsbyNode } from "gatsby";
import path from "path";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const singleMajorTemplate = path.resolve(
    "./src/templates/SingleMajor.tsx"
  );

  const singleProjectTemplate = path.resolve(
    "./src/templates/SingleProject.tsx"
  );

  const { createPage } = actions;

  // Major page creation
  const allMajorsResult: any = await graphql(`
    query AllMajors {
      allSanityMajor {
        nodes {
          id
          slug {
            current
          }
        }
      }
    }
  `);

  if (allMajorsResult.errors) throw allMajorsResult.errors;

  const majors = allMajorsResult.data.allSanityMajor.nodes;

  majors.forEach((major: any) => {
    createPage({
      path: `${major.slug.current}`,
      component: singleMajorTemplate,
      context: {
        id: major.id,
      },
    });
  });

  // Project page creation
  const allProjectsResult: any = await graphql(`
    query AllProjects {
      allSanityProject {
        nodes {
          id
          major {
            slug {
              current
            }
          }
          slug {
            current
          }
        }
      }
    }
  `);

  if (allProjectsResult.errors) throw allProjectsResult.errors;

  const projects = allProjectsResult.data.allSanityProject.nodes;

  projects.forEach((project: any) => {
    createPage({
      path: `${project.major.slug.current}/${project.slug.current}`,
      component: singleProjectTemplate,
      context: {
        id: project.id,
      },
    });
  });
};
