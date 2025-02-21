import { gql } from 'graphql-request';

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
