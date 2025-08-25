// Esquema para validar nuestras colecciones de contenido
import { z, defineCollection } from 'astro:content';

// Definir esquema para la colección de noticias
const noticiasCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    author: z.string().optional(),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
  }),
});

// Exportar colecciones
export const collections = {
  'noticias': noticiasCollection,
};
