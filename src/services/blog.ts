import { ApiRequest, AuthorizedApiRequest } from "@/constant/api.config";


export const getPosts = async () => console.log(`/wp-json/wp/v2/posts`);

export const getPost = async (id: number) =>
  console.log(`/wp-json/wp/v2/posts/${id}`);
export const getCategories = async () => await AuthorizedApiRequest(`blog/category/get-category`);

// export const getPosts = async () => await ApiRequest(`/wp-json/wp/v2/posts`);

// export const getPost = async (id: number) =>
//   await ApiRequest(`/wp-json/wp/v2/posts/${id}`);

export const samplePosts = [
  {
    id: 10,
    date: '2025-05-08T15:16:37',
    date_gmt: '2025-05-08T15:16:37',
    guid: {
      rendered: 'https://blog.footballnigeria.com/?p=10',
    },
    modified: '2025-05-08T15:16:38',
    modified_gmt: '2025-05-08T15:16:38',
    slug: 'pollock-makes-lions-squad-as-owen-farrell-misses-out',
    status: 'publish',
    type: 'post',
    link: 'https://blog.footballnigeria.com/afcon-qualifieres/pollock-makes-lions-squad-as-owen-farrell-misses-out/',
    title: {
      rendered: 'Pollock makes Lions squad as Owen Farrell misses out',
    },
    content: {
      rendered: '...', // You can keep the full string or truncate for brevity
      protected: false,
    },
    excerpt: {
      rendered:
        "<p>Mike Henson BBC Sport rugby union news reporter Northampton&#8217;s 20-year-old forward Henry Pollock will tour Australia with the British and Irish Lions this summer...</p>",
      protected: false,
    },
    author: 1,
    featured_media: 11,
    comment_status: 'open',
    ping_status: 'open',
    sticky: false,
    template: '',
    format: 'standard',
    meta: {
      footnotes: '',
    },
    categories: [1],
    tags: [],
    class_list: [
      'post-10',
      'post',
      'type-post',
      'status-publish',
      'format-standard',
      'has-post-thumbnail',
      'hentry',
      'category-afcon-qualifieres',
    ],
    yoast_head: '...',
    yoast_head_json: {
      title: 'Pollock makes Lions squad as Owen Farrell misses out - My blog',
      robots: {
        index: 'index',
        follow: 'follow',
        'max-snippet': 'max-snippet:-1',
        'max-image-preview': 'max-image-preview:large',
        'max-video-preview': 'max-video-preview:-1',
      },
      canonical:
        'https://blog.footballnigeria.com/afcon-qualifieres/pollock-makes-lions-squad-as-owen-farrell-misses-out/',
      og_locale: 'en_US',
      og_type: 'article',
      og_title: 'Pollock makes Lions squad as Owen Farrell misses out - My blog',
      og_description:
        'Mike Henson BBC Sport rugby union news reporter...',
      og_url:
        'https://blog.footballnigeria.com/afcon-qualifieres/pollock-makes-lions-squad-as-owen-farrell-misses-out/',
      og_site_name: 'My blog',
      article_published_time: '2025-05-08T15:16:37+00:00',
      article_modified_time: '2025-05-08T15:16:38+00:00',
      og_image: [
        {
          width: 976,
          height: 634,
          url: 'https://blog.footballnigeria.com/wp-content/uploads/2025/05/8355a990-2c15-11f0-b26b-ab62c890638b.jpg.webp',
          type: 'image/webp',
        },
      ],
      author: 'admin',
      twitter_card: 'summary_large_image',
      twitter_misc: {
        'Written by': 'admin',
        'Est. reading time': '3 minutes',
      },
      schema: {
        '@context': 'https://schema.org',
        '@graph': [],
      },
    },
    featured_media_src_url:
      'https://blog.footballnigeria.com/wp-content/uploads/2025/05/8355a990-2c15-11f0-b26b-ab62c890638b.jpg.webp',
    _links: {
      self: [{ href: 'https://blog.footballnigeria.com/wp-json/wp/v2/posts/10', targetHints: { allow: ['GET'] } }],
      collection: [{ href: 'https://blog.footballnigeria.com/wp-json/wp/v2/posts' }],
      about: [{ href: 'https://blog.footballnigeria.com/wp-json/wp/v2/types/post' }],
      author: [{ embeddable: true, href: 'https://blog.footballnigeria.com/wp-json/wp/v2/users/1' }],
      replies: [{ embeddable: true, href: 'https://blog.footballnigeria.com/wp-json/wp/v2/comments?post=10' }],
      'version-history': [{ count: 1, href: 'https://blog.footballnigeria.com/wp-json/wp/v2/posts/10/revisions' }],
      'predecessor-version': [
        {
          id: 12,
          href: 'https://blog.footballnigeria.com/wp-json/wp/v2/posts/10/revisions/12',
        },
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'https://blog.footballnigeria.com/wp-json/wp/v2/media/11',
        },
      ],
      'wp:attachment': [
        {
          href: 'https://blog.footballnigeria.com/wp-json/wp/v2/media?parent=10',
        },
      ],
      'wp:term': [
        {
          taxonomy: 'category',
          embeddable: true,
          href: 'https://blog.footballnigeria.com/wp-json/wp/v2/categories?post=10',
        },
        {
          taxonomy: 'post_tag',
          embeddable: true,
          href: 'https://blog.footballnigeria.com/wp-json/wp/v2/tags?post=10',
        },
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true,
        },
      ],
    },
  },
];

export const categoriesData = [
  {
    id: 1,
    count: 3,
    description: '',
    link: 'https://blog.footballnigeria.com/category/afcon-qualifieres/',
    name: 'Afcon Qualifieres',
    slug: 'afcon-qualifieres',
    taxonomy: 'category',
    parent: 0,
    meta: [],
    yoast_head: '<!-- Yoast SEO plugin -->',
    yoast_head_json: {
      title: 'Afcon Qualifieres Archives - My blog',
      robots: {
        index: 'index',
        follow: 'follow',
        'max-snippet': 'max-snippet:-1',
        'max-image-preview': 'max-image-preview:large',
        'max-video-preview': 'max-video-preview:-1',
      },
      canonical: 'https://blog.footballnigeria.com/category/afcon-qualifieres/',
      og_locale: 'en_US',
      og_type: 'article',
      og_title: 'Afcon Qualifieres Archives - My blog',
      og_url: 'https://blog.footballnigeria.com/category/afcon-qualifieres/',
      og_site_name: 'My blog',
      twitter_card: 'summary_large_image',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [],
      },
    },
    _links: {
      self: [
        {
          href: 'https://blog.footballnigeria.com/wp-json/wp/v2/categories/1',
          targetHints: { allow: ['GET'] },
        },
      ],
      collection: [
        {
          href: 'https://blog.footballnigeria.com/wp-json/wp/v2/categories',
        },
      ],
      about: [
        {
          href: 'https://blog.footballnigeria.com/wp-json/wp/v2/taxonomies/category',
        },
      ],
      'wp:post_type': [
        {
          href: 'https://blog.footballnigeria.com/wp-json/wp/v2/posts?categories=1',
        },
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true,
        },
      ],
    },
  },
  {
    id: 2,
    count: 5,
    description: '',
    link: 'https://blog.footballnigeria.com/category/fifa-qualifiers/',
    name: 'FIFA Qualifiers',
    slug: 'fifa-qualifiers',
    taxonomy: 'category',
    parent: 0,
    meta: [],
    yoast_head: '<!-- Yoast SEO plugin -->',
    yoast_head_json: {
      title: 'FIFA Qualifiers Archives - My blog',
      robots: {
        index: 'index',
        follow: 'follow',
        'max-snippet': 'max-snippet:-1',
        'max-image-preview': 'max-image-preview:large',
        'max-video-preview': 'max-video-preview:-1',
      },
      canonical: 'https://blog.footballnigeria.com/category/fifa-qualifiers/',
      og_locale: 'en_US',
      og_type: 'article',
      og_title: 'FIFA Qualifiers Archives - My blog',
      og_url: 'https://blog.footballnigeria.com/category/fifa-qualifiers/',
      og_site_name: 'My blog',
      twitter_card: 'summary_large_image',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [],
      },
    },
    _links: {
      self: [
        {
          href: 'https://blog.footballnigeria.com/wp-json/wp/v2/categories/2',
          targetHints: { allow: ['GET'] },
        },
      ],
      collection: [
        {
          href: 'https://blog.footballnigeria.com/wp-json/wp/v2/categories',
        },
      ],
      about: [
        {
          href: 'https://blog.footballnigeria.com/wp-json/wp/v2/taxonomies/category',
        },
      ],
      'wp:post_type': [
        {
          href: 'https://blog.footballnigeria.com/wp-json/wp/v2/posts?categories=2',
        },
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true,
        },
      ],
    },
  },
];
