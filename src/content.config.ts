import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cities collection with inline schema
const citiesCollection = defineCollection({
  loader: glob({
    base: './src/content/cities',
    pattern: '**/*.json',
  }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    state: z.string(),
    desc: z.string(),
    phone: z.string(),
    areas: z.array(z.string()),
    nearby: z.array(z.string()),
    it_focus: z.string(),
    senior_focus: z.string(),
    branch_dets: z.string(),
    local_faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
    lat: z.number(),
    lng: z.number(),
  }),
});

// Blog collection with inline schema
const blogCollection = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.md',
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    author: z.string(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
    heroImage: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  cities: citiesCollection,
  blog: blogCollection,
};