import rss from '@astrojs/rss';
import posts from '../data/blogs.json';

export async function GET(context) {
  // Only include English posts (exclude translations)
  const englishPosts = posts
    .filter((p) => (p.lang || 'en') === 'en')
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const items = englishPosts.map((post) => {
    const url = `https://insurancesupport.online/blog/${post.slug}`;
    const pubDate = post.modifiedDate || post.date;

    // Use the summary from blogs.json as the description
    const description =
      post.summary ||
      'Expert insurance guide from Insurance Support by Hari Kotian.';

    const item = {
      title: post.title,
      description,
      link: url,
      pubDate: new Date(pubDate),
      author: post.author || 'Hari Kotian',
      categories: (post.categories || []).concat(post.tags || []),
    };

    return item;
  });

  return rss({
    title: 'Insurance Support | Expert Insurance Guides & Tips',
    description:
      'Expert insurance guides, claim process tips, IRDAI updates, and advisory from Hari Kotian, IRDAI Certified Insurance Advisor with 25+ years of experience.',
    site: context.site,
    items,
    customData: '<language>en-IN</language><managingEditor>Hari Kotian</managingEditor><webMaster>Hari Kotian</webMaster>',
  });
}
