import getFooter from '@/lib/api/getFooter';
import ImageComponent from '@/components/ImageComponent';
import Navigation from './Navigation';
import Link from 'next/link';

// Render the footer
export default async function Footer() {
  const footer = await getFooter();

  if (!footer) {
    return null;
  }

  return (
    <footer className='flex gap-16 p-8 bg-slate-300 items-center'>
      <div className='grid gap-4'>
        {/* Link logo to frontpage */}
        <Link href={`/`}>
          <ImageComponent image={footer.logo} />
        </Link>
        <h2 className='font-bold'>{footer.title}</h2>
      </div>
      <Navigation navigationId={footer.navigationId} />
    </footer>
  );
}
