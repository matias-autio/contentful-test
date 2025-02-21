import { client } from './contentful';
import { gql } from 'graphql-request';
import { ImageFragment } from './fragments/Image';
import { RichTextFragment } from './fragments/RichText';

// Gets page by slug, and retrieves ids of all components
export async function getPageBySlug(slug) {
  const query = gql`
    query ($slug: String!) {
      pageCollection(
        where: { slug: $slug }, limit: 1 ) {
        items {
          sys { id }
          title,
          slug,
          richText {
            json
          },
          componentsCollection {
            items {
              ...Image
              ...RichText
            } 
          }
        }
      }
    }

    fragment Image on Image {
      sys { id }
    }

    fragment RichText on ContentTypeRichText {
      sys { id }
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

// Gets a Navigation by its id
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

// Get the Header with logo and navigation
export async function getHeader() {
  const query = gql`
    query {
      headerCollection(limit: 1) {
        items {
          title
          logo {
            url
            title
            description
            width
            height
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

// Gets the components based on ids. The components' queries are defined in /lib/fragments.
export async function getComponentsByIds(componentIds) {
  if (!componentIds.length) return [];

  const query = gql`

    ${ImageFragment}
    ${RichTextFragment}

    query ($ids: [String!]!) {
      entryCollection(where: { sys: { id_in: $ids } }) {
        items {
          __typename
          ...Image
          ...RichText
        }
      }
    }
  `;

  const variables = { ids: componentIds };
  const data = await client.request(query, variables);

  return data?.entryCollection?.items || [];
}
