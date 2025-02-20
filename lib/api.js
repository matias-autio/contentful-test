import { client } from './contentful';
import { gql } from 'graphql-request';

export async function getPageBySlug(slug) {
  const query = gql`
    query ($slug: String!) {
      pageCollection(
        where: { slug: $slug }, limit: 1 ) {
        items {
          title,
          slug,
          richText {
            json
          }
        }
      }
    }
  `;

  const variables = { slug };

  const data = await client.request(query, variables);
  return data.pageCollection.items.length > 0 ? data.pageCollection.items[0] : null;
}

export async function getAllPages() {
  const query = gql`
    query {
      pageCollection {
        items {
          slug
        }
      }
    }
  `;

  const data = await client.request(query);

  console.log('Fetched data:', data);

  return data.pageCollection.items;
}

export async function getNavigation(navigationId) {
  if (!navigationId) return null;

  const query = gql`
    query ($id: String!) {
      navigation(id: $id) {
        pagesCollection {
          items {
            title
            slug
          }
        }
      }
    }
  `;

  const variables = { id: navigationId };
  const data = await client.request(query, variables);

  return {
    pages: data?.navigation?.pagesCollection?.items || [],
  };
}

export async function getHeader() {
  const query = gql`
    query {
      headerCollection(limit: 1) {
        items {
          title
          logo {
            url
          }
          navigation {
            sys {
              id
            }
          }
        }
      }
    }
  `;

  const data = await client.request(query);

  // Extract header and navigation
  const header = data?.headerCollection?.items[0] || null;

  return header
  ? {
      title: header.title,
      logo: header.logo,
      navigationId: header.navigation?.sys?.id || null, // Extract navigation ID
    }
  : null;
}
