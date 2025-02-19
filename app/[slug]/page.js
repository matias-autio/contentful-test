import { getPageBySlug, getAllPages } from '../../lib/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';

export default async function Page({ params }) {
  const { slug } = params;

  // Fetch page data based on slug
  const page = await getPageBySlug(slug);

  // Handle 404 if page doesn't exist
  if (!page) {
    notFound();
  }

  return (
    <div>
      <Header />
      <h1>{page.title}</h1>
      <article>{documentToReactComponents(page.richText.json)}</article>
    </div>
  );
}

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((page) => ({ slug: page.slug }));
}
