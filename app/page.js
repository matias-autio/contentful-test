import { getPageBySlug, getComponentsByIds } from '@/lib/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import Components from '@/components/Components';

export default async function Home() {

  const frontPage = await getPageBySlug("/");

  if (!frontPage) {
    notFound();
  }

  const componentIds = frontPage?.componentsCollection?.items.map(c => c.sys.id) || [];
  const components = await getComponentsByIds(componentIds);

  return (
    <div>
      <main className='prose'>
        <h1>{frontPage.title}</h1>
      </main>
      <article className='prose bg-slate-100'>
        {documentToReactComponents(frontPage.richText.json)}
        <Components components={components} />
      </article>
    </div>
  );
}
