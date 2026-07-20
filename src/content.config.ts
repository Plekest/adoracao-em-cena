import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const portfolio = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
	schema: z.object({
		titulo: z.string(),
		descricao: z.string(),
		sinopse: z.string().optional(),
		classificacao: z.string().optional(),
		diretor: z.string().optional(),
		dramaturgo: z.string().optional(),
		atores: z.array(z.string()).optional(),
		genero: z.string().optional(),
		duracao: z.string().optional(),
		fotos: z.array(z.string()).default([]),
		video: z.string().url().optional(),
		videos: z.array(z.string().url()).default([]),
		data: z.coerce.date().optional(),
	}),
});

const equipe = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/equipe" }),
	schema: z.object({
		nome: z.string(),
		foto: z.string(),
		bio: z.string().optional(),
		instagram: z.string().url().optional(),
		ordem: z.number().default(0),
	}),
});

export const collections = { portfolio, equipe };
