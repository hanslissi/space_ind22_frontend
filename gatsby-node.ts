import type { GatsbyNode } from "gatsby";
import path from "path";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const singleProjectTemplate = path.resolve(
    "./src/templates/SingleProject.tsx"
  );

  const { createPage } = actions;

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
      path: `${project.slug.current}`,
      component: singleProjectTemplate,
      context: {
        id: project.id,
      },
    });
  });
};
