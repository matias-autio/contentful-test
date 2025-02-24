import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Render rich text using rich-text-react-renderer
// https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer
export default async function Richtext({ richText }) {
    if (!richText){
      return null;
    }
  
    return (
      <>
        {documentToReactComponents(richText.json)}
      </>
    );
  }
  