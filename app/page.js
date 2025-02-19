import { getFrontPage, getPageBySlug } from '../lib/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default async function Home() {
  // const frontPage = await getFrontPage();
  const frontPage = await getPageBySlug("/");
  const heipskukkuu = await getPageBySlug("heipskukkuu");

  return (
    <div>
      <main>
        <h1>{frontPage.title}</h1>
        <p>{frontPage.slug}</p>
      </main>
      <aside>
        <h1>{heipskukkuu.title}</h1>
        <p>{heipskukkuu.slug}</p>
      </aside>
      <article>
       {documentToReactComponents(frontPage.richText.json)}
      </article>
    </div>
  );
}
