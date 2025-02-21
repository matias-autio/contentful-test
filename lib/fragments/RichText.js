import { gql } from 'graphql-request';

export const RichTextFragment = gql`
  fragment RichText on ContentTypeRichText {
    sys { id }
    richText {
      json
    }
  }
`;
