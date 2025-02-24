# Contentful Snippets

## Default client
```js
import { createClient } from 'contentful';
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});
export default client;
```

## Loop

```js
const pages = await getAllPages();

<nav className='prose flex gap-4'>
<Link href="/">Home</Link>
    {pages.map((page) => (
        <Link key={page.slug} href={`/${page.slug}`}>
        {page.slug}
        </Link>
    ))}
</nav>
```
