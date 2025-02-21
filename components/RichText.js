import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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
  