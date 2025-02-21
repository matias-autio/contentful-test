import Image from 'next/image';

export default async function ImageComponent({ image }) {

    if (!image) {
      return null;
    }
  
    return (
      <Image
        src={image.url}
        width={image.width}
        height={image.height}
        alt={image.description}
      />
    );
  }
  