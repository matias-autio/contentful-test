import { client } from '../contentful';
import { gql } from 'graphql-request';

// Get the Header with logo and navigation
export default async function getHeader() {
  const query = gql`
    query {
      headerCollection( order: sys_firstPublishedAt_ASC, limit: 1 ) {
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
