import { getPageBySlug } from '../lib/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Header from '../components/Header';

export default async function Home() {

  const frontPage = await getPageBySlug("/");

  return (
    <div className="container mx-auto">
      <Header />
      <hr></hr>
      <main className='prose'>
        <h1>{frontPage.title}</h1>
      </main>
      <article className='prose bg-slate-100'>
       {documentToReactComponents(frontPage.richText.json)}
      </article>
    </div>
  );
}
