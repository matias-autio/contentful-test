import { gql } from 'graphql-request';

// Fragment for getting RichText component's data via GraphQL
export const RichTextFragment = gql`
  fragment RichText on ContentTypeRichText {
    sys { id }
    richText {
      json
    }
  }
`;
