import Image from '../components/Image';
import RichText from '../components/RichText';

export default async function Components({components}) {

  if (!components) {
    return null;
  }

  return (
    <>
      {/* Render components dynamically */}
      {components.map((component) => {
        switch (component.__typename) {
          case "Image":
            return <Image key={component.sys.id} image={component.image} />;
          case "ContentTypeRichText":
            return <RichText key={component.sys.id} richText={component.richText} />;
          default:
            return null;
        }
      })}
    </>
  );
}

