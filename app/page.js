import { getPageBySlug, getComponentsByIds } from '@/lib/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import Components from '@/components/Components';
import getSiteSettings from "@/lib/getSiteSettings";

export async function generateMetadata() {

  const frontPage = await getPageBySlug("/");
  const siteSettings = await getSiteSettings();

  return {
    title: `${frontPage.title} - ${siteSettings.siteName}`,
    description: frontPage.description ? frontPage.description : siteSettings.description,
  }
}

export default async function Home() {

  const frontPage = await getPageBySlug("/");

  if (!frontPage) {
    notFound();
  }

  const componentIds = frontPage?.componentsCollection?.items.map(c => c.sys.id) || [];
  const components = await getComponentsByIds(componentIds);

  return (
    <div className='container mx-auto'>
      <div className='prose mx-auto bg-slate-100 p-8'>
        <main>
          <h1>{frontPage.title}</h1>
        </main>
        <article>
          {documentToReactComponents(frontPage.richText.json)}
          <Components components={components} />
        </article>
      </div>
    </div>
  );
}
