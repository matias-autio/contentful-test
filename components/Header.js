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
    <header className='flex gap-16 p-8 bg-slate-300 items-center'>
      <div className='grid gap-4'>
        <Link href={`/`}>
          <ImageComponent image={header.logo} />
        </Link>
        <h1 className='font-bold'>{header.title}</h1>
      </div>
      <Navigation navigationId={header.navigationId} />
    </header>
  );
}

