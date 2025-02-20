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

export async function getNavigation() {
  const query = gql`
    query {
      navigationCollection(limit: 1) {
        items {
          pagesCollection {
            items {
              title
              slug
            }
          }
        }
      }
    }
  `;

  const data = await client.request(query);
  
  // Extract and return the navigation pages
  return data?.navigationCollection?.items[0]?.pagesCollection?.items || [];
}
