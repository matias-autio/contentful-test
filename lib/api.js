import { client } from './contentful';
import { gql } from 'graphql-request';

// export async function getFrontPage() {
//   const response = await client.getEntries({
//     content_type: 'page',
//     // 'fields.isFrontPage': true,
//     limit: 1,
//   });
//   return response.items[0]?.fields || null;
// }

// export async function getFrontPage() {
//   const query = gql`
//     query {
//       pageCollection( limit: 1 ) {
//         items {
//           title,
//           slug
//         }
//       }
//     }
//   `;

//   const data = await client.request(query);
//   return data.pageCollection.items[0] || null;
// }

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
