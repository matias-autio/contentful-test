import { client } from '../contentful';
import { gql } from 'graphql-request';

// Get the Footer with logo and navigation
export default async function getFooter() {
  const query = gql`
    query {
      footerCollection( order: sys_firstPublishedAt_ASC, limit: 1 ) {
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
  const footer = data?.footerCollection?.items[0] || null;

  return footer
  ? {
      title: footer.title,
      logo: footer.logo,
      navigationId: footer.navigation?.sys?.id || null, // Extract navigation ID
    }
  : null;
}
