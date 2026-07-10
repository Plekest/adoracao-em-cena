import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const portfolio = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
	schema: z.object({
		titulo: z.string(),
		descricao: z.string(),
		fotos: z.array(z.string()).default([]),
		video: z.string().url().optional(),
		data: z.coerce.date().optional(),
	}),
});

export const collections = { portfolio };
