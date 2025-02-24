import { client } from '../contentful';
import { gql } from 'graphql-request';

// Get page by slug, and retrieve ids of all components
export default async function getPageBySlug(slug) {
  const query = gql`
    query ($slug: String!) {
      pageCollection(
        where: { slug: $slug }, limit: 1 ) {
        items {
          sys { id }
          title
          description
          slug
          richText {
            json
          }
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
