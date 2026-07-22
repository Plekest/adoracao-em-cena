export interface GeneroInfo {
	definicao: string;
	corGlow: string;
}

export const generos: Record<string, GeneroInfo> = {
	Histórico: {
		definicao:
			"Retrata evento ou período de tempo específico (bíblico ou não), com contexto cultural/social da época - figurino, cenário e linguagem ambientados.",
		corGlow: "rgba(201, 166, 107, 0.32)",
	},
	Bíblico: {
		definicao:
			"Encena personagens e narrativas das Escrituras - patriarcas, profetas, milagres, parábolas de Jesus - fiel ao texto sagrado.",
		corGlow: "rgba(201, 166, 107, 0.32)",
	},
	Cotidiano: {
		definicao:
			"Situações contemporâneas e dilemas pessoais do dia a dia (família, trabalho, fé, tentação), personagens comuns, sem período histórico definido.",
		corGlow: "rgba(242, 236, 228, 0.16)",
	},
	Alegórico: {
		definicao:
			"Representação simbólica de conceitos espirituais - batalha espiritual, virtudes x pecados, anjos, demônios - não literal, comunica verdade através de metáfora cênica.",
		corGlow: "rgba(179, 44, 61, 0.34)",
	},
};
