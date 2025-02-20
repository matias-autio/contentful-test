import Link from 'next/link';
import { getAllPages } from '../lib/api';

export default async function Header() {

  const pages = await getAllPages();

  return (
    <nav className='prose flex gap-4'>
      <Link href="/">Home</Link>
      {pages.map((page) => (
        <Link key={page.slug} href={`/${page.slug}`}>
          {page.slug}
        </Link>
      ))}
    </nav>
  );
}
