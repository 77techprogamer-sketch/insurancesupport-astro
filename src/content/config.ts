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

// Define the schema for a single city entry within the collection
const citySchema = z.object({
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
  local_faqs: z.array(z.any()), // You might want a more specific schema for FAQs
  long_count: z.number(),
  lic_name: z.string(),
  lic_addr: z.string(),
});

// The cityCollection will contain an array of these citySchema objects
const cityCollection = defineCollection({
  type: 'data',
  schema: z.object({
    // Since cities/index.json contains an array, its 'data' will be an array
    default: z.array(citySchema), // 'default' refers to the default export of the JSON file
  }),
});

export const collections = {
  blog: blogCollection,
  cities: cityCollection,
};