import Link from 'next/link';
import { getNavigation } from '../lib/api';

export default async function Navigation() {
  const pages = await getNavigation();

  return (
    <nav className='bg-slate-300'>
      <ul className='flex gap-4'>
        {pages.map((page) => (
          <li key={page.slug}>
            <Link href={`/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
