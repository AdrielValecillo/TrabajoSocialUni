import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const procesoGraduacion = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/proceso-graduacion',
  }),
  schema: z.object({
    title: z.string(),
    imageSrc: z.string(),
    imageAlt: z.string(),
    order: z.number(),
  }),
});

const preguntasFrecuentes = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/preguntas-frecuentes',
  }),
  schema: z.object({
    title: z.string(),
    imageSrc: z.string(),
    imageAlt: z.string(),
    order: z.number(),
    descriptions: z.array(z.string()),
    preguntas: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
  }),
});

const contactoRecursos = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/contacto-recursos',
  }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  'proceso-graduacion': procesoGraduacion,
  'preguntas-frecuentes': preguntasFrecuentes,
  'contacto-recursos': contactoRecursos,
};
