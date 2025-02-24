import { client } from '../contentful';
import { gql } from 'graphql-request';
import { ImageFragment } from '../fragments/Image';
import { RichTextFragment } from '../fragments/RichText';

// Gets the components based on ids. The components' queries are defined in /lib/fragments.
export default async function getComponentsByIds(componentIds) {
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
  
    if (process.env.NODE_ENV !== 'production') {
      console.log('Components:', data);
    }

    return data?.entryCollection?.items || [];
  }
