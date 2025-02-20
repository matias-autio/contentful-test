import { getHeader } from '../lib/api';
import Navigation from './Navigation';

export default async function Header() {
  const header = await getHeader();

  if (!header) {
    return null;
  }

  return (
    <header>
      {header.logo && <img src={header.logo.url} alt="Logo" width={200} />}
      <h1 className='font-bold'>{header.title}</h1>
      <Navigation navigationId={header.navigationId} />
    </header>
  );
}

