import { getPageBySlug, getComponentsByIds } from '../../lib/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import Components from '@/components/Components';

export default async function Page({ params }) {
  const { slug } = await params;

  // Fetch page data based on slug
  const page = await getPageBySlug(slug);
  const componentIds = page.componentsCollection?.items.map(c => c.sys.id) || [];
  const components = await getComponentsByIds(componentIds);

  // Handle 404 if page doesn't exist
  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <main className='prose'>
        <h1>{page.title}</h1>
      </main>
      <article className='prose bg-slate-100'>
        {documentToReactComponents(page.richText.json)}
        <Components components={components} />
      </article>
    </div>
  );
}
