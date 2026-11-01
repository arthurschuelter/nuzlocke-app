import type { EncounterLocation, Pokemon } from "../types";

const pokemon = (...names: string[]): Pokemon[] => names.map(name => ({ name }));

const locationNames: Record<string, string> = {
    "pallet-town": "Pallet Town",
    "viridian-city": "Viridian City",
    "cerulean-city": "Cerulean City",
    "vermilion-city": "Vermilion City",
    "fuchsia-city": "Fuchsia City",
    "cinnabar-island": "Cinnabar Island",
};

// Each entry uses its EncounterLocation key and the Pokémon available there.
const routeData: Array<[string, string[]]> = [
    ["pallet-town", ["Bulbasaur", "Charmander", "Squirtle", "Tentacool", "Shellder", "Krabby", "Horsea", "Staryu", "Psyduck", "Slowpoke", "Kingler", "Seadra", "Gyarados", "Magikarp"]],
    ["route-1", ["Pidgey", "Rattata"]],
    ["viridian-city", ["Psyduck", "Slowpoke", "Poliwag", "Poliwhirl", "Goldeen", "Magikarp", "Gyarados"]],
    ["route-22", ["Rattata", "Mankey", "Spearow", "Psyduck", "Slowpoke", "Poliwag", "Poliwhirl", "Goldeen", "Gyarados", "Magikarp"]],
    ["route-2", ["Pidgey", "Rattata", "Caterpie", "Weedle"]],
    ["route-3", ["Pidgey", "Spearow", "Nidoran♀", "Nidoran♂", "Jigglypuff", "Mankey"]],
    ["route-4", ["Rattata", "Spearow", "Ekans", "Sandshrew", "Mankey", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados"]],
    ["cerulean-city", ["Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados", "Magikarp"]],
    ["route-5", ["Pidgey", "Oddish", "Meowth", "Bellsprout"]],
    ["route-6", ["Pidgey", "Oddish", "Meowth", "Bellsprout", "Psyduck", "Slowpoke", "Poliwag", "Poliwhirl", "Gyarados"]],
    ["route-7", ["Pidgey", "Meowth", "Vulpix", "Oddish", "Growlithe", "Bellsprout"]],
    ["route-8", ["Pidgey", "Meowth", "Ekans", "Sandshrew", "Vulpix", "Growlithe"]],
    ["route-9", ["Rattata", "Spearow", "Ekans", "Sandshrew"]],
    ["route-10", ["Spearow", "Ekans", "Sandshrew", "Voltorb", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados"]],
    ["route-11", ["Spearow", "Ekans", "Sandshrew", "Drowzee", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados"]],
    ["vermilion-city", ["Tentacool", "Shellder", "Krabby", "Horsea", "Staryu", "Psyduck", "Slowpoke", "Gyarados", "Magikarp"]],
    ["route-12", ["Pidgey", "Oddish", "Venonat", "Bellsprout", "Gloom", "Weepinbell", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados", "Magikarp", "Snorlax"]],
    ["route-13", ["Oddish", "Venonat", "Bellsprout", "Pidgeotto", "Gloom", "Weepinbell", "Ditto", "Pidgey", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados", "Magikarp"]],
    ["route-14", ["Oddish", "Venonat", "Bellsprout", "Pidgeotto", "Gloom", "Weepinbell", "Pidgey", "Ditto"]],
    ["route-15", ["Oddish", "Venonat", "Bellsprout", "Pidgeotto", "Gloom", "Weepinbell", "Ditto", "Pidgey"]],
    ["fuchsia-city", ["Psyduck", "Slowpoke", "Goldeen", "Seaking", "Poliwag", "Magikarp", "Gyarados"]],
    ["route-16", ["Rattata", "Spearow", "Doduo", "Raticate", "Snorlax"]],
    ["route-17", ["Raticate", "Spearow", "Doduo", "Rattata", "Fearow"]],
    ["route-18", ["Spearow", "Doduo", "Rattata", "Raticate", "Fearow"]],
    ["route-19", ["Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados", "Magikarp"]],
    ["route-20", ["Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados", "Magikarp"]],
    ["cinnabar-island", ["Omanyte", "Kabuto", "Aerodactyl", "Tentacool", "Shellder", "Krabby", "Horsea", "Staryu", "Psyduck", "Slowpoke", "Kingler", "Seadra", "Gyarados", "Magikarp"]],
    ["route-21", ["Tangela", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados", "Magikarp"]],
    ["route-23", ["Fearow", "Mankey", "Arbok", "Sandslash", "Primeape", "Spearow", "Ekans", "Sandshrew", "Psyduck", "Slowpoke", "Poliwag", "Poliwhirl", "Goldeen", "Krabby", "Horsea", "Gyarados", "Magikarp"]],
    ["route-24", ["Oddish", "Bellsprout", "Metapod", "Kakuna", "Caterpie", "Weedle", "Pidgey", "Abra", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Poliwag", "Poliwhirl", "Goldeen", "Gyarados", "Magikarp"]],
    ["route-25", ["Oddish", "Bellsprout", "Metapod", "Kakuna", "Caterpie", "Weedle", "Pidgey", "Abra", "Psyduck", "Slowpoke", "Poliwag", "Poliwhirl", "Goldeen", "Krabby", "Horsea", "Gyarados", "Magikarp"]],
];

export const FireRedLocations: EncounterLocation[] = routeData.map(([key, encounters], gameOrder) => ({
    key,
    name: locationNames[key] ?? `Route ${key.replace("route-", "")}`,
    gameOrder,
    encounters: pokemon(...encounters),
    encounteredPokemon: null,
}));
