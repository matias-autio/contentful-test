import { getPageBySlug, getComponentsByIds } from '../../lib/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import Components from '@/components/Components';
import getSiteSettings from '@/lib/getSiteSettings';

export async function generateMetadata({ params }) {

  const { slug } = await params;
  const page = await getPageBySlug(slug);
  const siteSettings = await getSiteSettings();

  return {
    title: `${page.title} - ${siteSettings.siteName}`,
    description: page.description ? page.description : siteSettings.description,
  }
}

export default async function Page({ params }) {
  const { slug } = await params;

  // Fetch page data based on slug
  const page = await getPageBySlug(slug);
  const componentIds = page?.componentsCollection?.items.map(c => c.sys.id) || [];
  const components = await getComponentsByIds(componentIds);

  // Handle 404 if page doesn't exist
  if (!page) {
    notFound();
  }

  return (
    <div className='container mx-auto'>
      <div className='prose mx-auto bg-slate-100 p-8'>
        <main>
          <h1>{page.title}</h1>
        </main>
        <article>
          {documentToReactComponents(page.richText.json)}
          <Components components={components} />
        </article>
      </div>
    </div>
  );
}
