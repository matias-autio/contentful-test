import { getHeader } from '@/lib/api';
import ImageComponent from '@/components/ImageComponent';
import Navigation from './Navigation';
import Link from 'next/link';

export default async function Header() {
  const header = await getHeader();

  if (!header) {
    return null;
  }

  return (
    <header>
      <Link href={`/`}>
        <ImageComponent image={header.logo} />
      </Link>
      <h1 className='font-bold'>{header.title}</h1>
      <Navigation navigationId={header.navigationId} />
    </header>
  );
}

