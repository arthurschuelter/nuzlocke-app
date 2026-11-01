export interface Pokemon {
    name: string;
    killCount?: number;
}

export interface EncounterLocation {
    name: string;
    key: string;
    gameOrder: number;
    encounters: Pokemon[];
    encounteredPokemon: Pokemon | null;
}