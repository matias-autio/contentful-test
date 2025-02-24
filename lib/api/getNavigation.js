import { client } from '@/lib/contentful';
import { gql } from 'graphql-request';

// Get a Navigation by its id
export default async function getNavigation(navigationId) {
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

  if (process.env.NODE_ENV !== 'production') {
    console.log('Navigation:', data);
  }

  return {
    pages: data?.navigation?.pagesCollection?.items || [],
  };
}
