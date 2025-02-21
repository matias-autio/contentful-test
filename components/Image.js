export default async function Image({ image }) {

    if (!image) {
      return null;
    }
  
    return (
      <img src={image.url + '?w=800'} alt={image.description} width={image.width} height={image.height} />
    );
  }
  