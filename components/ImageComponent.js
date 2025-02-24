import Image from 'next/image';

// Basically uses Next.js Image component, but could be customised here
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
  