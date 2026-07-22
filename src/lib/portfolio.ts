const desbloqueadas = [
	"power-of-love",
	"juju-e-leleco",
	"historia-do-amor",
	"historia-da-redencao",
	"portas",
	"na-cruz-eu-venci",
	"moises",
	"liberte-me",
	"maravilhoso-deus",
];

export function pecaDesbloqueada(id: string): boolean {
	return desbloqueadas.includes(id);
}

export function duracaoParaSegundos(duracao?: string): number | null {
	if (!duracao) return null;
	let total = 0;
	let encontrou = false;
	for (const [, valor, unidade] of duracao.matchAll(/(\d+)\s*(h|min|s)\b/gi)) {
		encontrou = true;
		const n = Number(valor);
		if (unidade.toLowerCase() === "h") total += n * 3600;
		else if (unidade.toLowerCase() === "min") total += n * 60;
		else total += n;
	}
	return encontrou ? total : null;
}

export function duracaoConcisa(duracao?: string): string | null {
	if (!duracao) return null;
	const min = duracao.match(/(\d+)\s*min/i);
	if (min) return `${min[1]} min`;
	const seg = duracao.match(/(\d+)\s*s/i);
	if (seg) return `${seg[1]} s`;
	return duracao;
}
