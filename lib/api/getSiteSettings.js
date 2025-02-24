import { client } from '../contentful';
import { gql } from 'graphql-request';

// Get site settings
export default async function getSiteSettings() {
  const query = gql`
    query {
        siteSettingsCollection ( order: sys_firstPublishedAt_ASC, limit: 1 ) {
          items {
            siteName
            siteDescription
          }
        }
    }
  `;

  const data = await client.request(query);

  if (process.env.NODE_ENV !== 'production') {
    console.log('SiteSettings:', data);
  }

  // Only use the first result (Note console log above will show all).
  return data?.siteSettingsCollection?.items[0] || [];
}
