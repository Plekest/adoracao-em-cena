const desbloqueadas = ["power-of-love", "juju-e-leleco"];

export function pecaDesbloqueada(id: string): boolean {
	return desbloqueadas.includes(id);
}
