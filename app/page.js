import { getPageBySlug } from '../lib/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Header from '../components/Header';

export default async function Home() {

  console.log('hello from Home');

  // const frontPage = await getFrontPage();
  const frontPage = await getPageBySlug("/");
  const heipskukkuu = await getPageBySlug("heipskukkuu");

  return (
    <div>
      <Header />
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
