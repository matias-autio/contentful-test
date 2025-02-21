import { client } from './contentful';
import { gql } from 'graphql-request';

export default async function getSiteSettings() {
  const query = gql`
    query {
        siteSettingsCollection {
          items {
            siteName
            siteDescription
          }
        }
    }
  `;

  const data = await client.request(query);

  if (process.env.NODE_ENV !== 'production') {
    console.log('Fetched data:', data);
  }

  // Only use the first result (Note console log above will show all).
  return data?.siteSettingsCollection?.items[0] || [];
}
