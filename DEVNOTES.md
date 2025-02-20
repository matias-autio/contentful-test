Loop

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
