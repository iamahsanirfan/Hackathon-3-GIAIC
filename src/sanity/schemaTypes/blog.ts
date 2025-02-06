export default {
    name: 'post',
    type: 'document',
    title: 'Blog Post',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: { source: 'title' }
      },
      {
        name: 'mainImage',
        type: 'image',
        title: 'Main Image',
        options: { hotspot: true }
      },
      {
        name: 'excerpt',
        type: 'text',
        title: 'Excerpt'
      },
      {
        name: 'body',
        type: 'array',
        title: 'Body',
        of: [{ type: 'block' }]
      },
      {
        name: 'publishedAt',
        type: 'datetime',
        title: 'Published At'
      },
      {
        name: 'author',
        type: 'reference',
        to: [{ type: 'author' }]
      },
      {
        name: 'categories',
        type: 'array',
        title: 'Categories',
        of: [{ type: 'string' }]
      }
    ]
  }