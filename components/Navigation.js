import Link from 'next/link';
import { getNavigation } from '../lib/api';

export default async function Navigation({ navigationId }) {
  if (!navigationId) {
    return null;
  }

  const navigation = await getNavigation(navigationId);

  return (
    <nav className='bg-slate-300'>
      <ul className='flex gap-4'>
        {navigation.pages.map((page) => (
          <li key={page.slug}>
            <Link href={`/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
