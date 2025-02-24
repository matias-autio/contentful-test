import { gql } from 'graphql-request';

// Fragment for getting Image component's data via GraphQL
export const ImageFragment = gql`
  fragment Image on Image {
    sys { id }
    image {
      url
      description
      width
      height
    }
  }
`;
