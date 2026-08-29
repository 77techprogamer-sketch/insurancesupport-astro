import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const citiesCollection = defineCollection({
  loader: glob({ base: './src/content/cities', exclude: ['index.json'], pattern: '**/*.json' }),
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
    local_faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),
    lat: z.number(),
    lng: z.number(),
  }),
});

export const collections = {
  cities: citiesCollection,
};
