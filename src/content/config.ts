import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string(),
    summary: z.string(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  blog: blogCollection,
};