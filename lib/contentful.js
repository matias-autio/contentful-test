// import { createClient } from 'contentful';

// const client = createClient({
//   space: process.env.CONTENTFUL_SPACE_ID,
//   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
// });

// export default client;



import { GraphQLClient } from 'graphql-request';

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID || '';
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || '';

export const client = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
  {
    headers: {
      Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
    },
  }
);
