import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    author: z.string().default('Hari Kotian'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    lang: z.string().default('en'),
    slug: z.string(),
    ogImage: z.string().optional(),
    featured: z.boolean().default(false),
    readingTime: z.string().optional(),
  }),
});

const cities = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    state: z.string(),
    pincode: z.string().optional(),
    population: z.string().optional(),
    knownFor: z.array(z.string()).optional(),
    nearbyCities: z.array(z.string()).optional(),
  }),
});

const pillars = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    author: z.string().default('Hari Kotian'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    slug: z.string(),
    isHub: z.boolean().default(false),
    hubFamily: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, cities, pillars };