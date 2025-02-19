import Link from 'next/link';
import { getAllPages } from '../lib/api';

export default async function Header() {
  console.log('hello from header');

  const pages = await getAllPages();

  return (
    <nav>
      <Link href="/">Home</Link>
      {pages.map((page) => (
        <Link key={page.slug} href={`/${page.slug}`}>
          {page.slug}
        </Link>
      ))}
    </nav>
  );
}
