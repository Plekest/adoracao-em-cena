export interface GeneroInfo {
	definicao: string;
}

export const generos: Record<string, GeneroInfo> = {
	Histórico: {
		definicao:
			"Retrata evento ou período de tempo específico (bíblico ou não), com contexto cultural/social da época - figurino, cenário e linguagem ambientados.",
	},
	Bíblico: {
		definicao:
			"Encena personagens e narrativas das Escrituras - patriarcas, profetas, milagres, parábolas de Jesus - fiel ao texto sagrado.",
	},
	Cotidiano: {
		definicao:
			"Situações contemporâneas e dilemas pessoais do dia a dia (família, trabalho, fé, tentação), personagens comuns, sem período histórico definido.",
	},
	Alegórico: {
		definicao:
			"Representação simbólica de conceitos espirituais - batalha espiritual, virtudes x pecados, anjos, demônios - não literal, comunica verdade através de metáfora cênica.",
	},
};
