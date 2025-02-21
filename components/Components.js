import ImageComponent from '@/components/ImageComponent';
import RichText from '@/components/RichText';

export default async function Components({components}) {

  if (!components) {
    return null;
  }

  return (
    <>
      {components.map((component) => {
        switch (component.__typename) {
          case "Image":
            return <ImageComponent key={component.sys.id} image={component.image} />;
          case "ContentTypeRichText":
            return <RichText key={component.sys.id} richText={component.richText} />;
          default:
            return null;
        }
      })}
    </>
  );
}

