import type { EncounterLocation, Pokemon } from "../types";

const pokemon = (...names: string[]): Pokemon[] => names.map(name => ({ name }));

const routeData: Array<[number, string[]]> = [
    [1, ["Pidgey", "Rattata"]],
    [2, ["Pidgey", "Rattata", "Caterpie", "Weedle"]],
    [3, ["Pidgey", "Spearow", "Nidoran♀", "Nidoran♂", "Jigglypuff", "Mankey"]],
    [4, ["Rattata", "Spearow", "Ekans", "Sandshrew", "Mankey", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados"]],
    [5, ["Pidgey", "Oddish", "Meowth", "Bellsprout"]],
    [6, ["Pidgey", "Oddish", "Meowth", "Bellsprout", "Psyduck", "Slowpoke", "Poliwag", "Poliwhirl", "Gyarados"]],
    [7, ["Pidgey", "Meowth", "Vulpix", "Oddish", "Growlithe", "Bellsprout"]],
    [8, ["Pidgey", "Meowth", "Ekans", "Sandshrew", "Vulpix", "Growlithe"]],
    [9, ["Rattata", "Spearow", "Ekans", "Sandshrew"]],
    [10, ["Spearow", "Ekans", "Sandshrew", "Voltorb", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados"]],
    [11, ["Spearow", "Ekans", "Sandshrew", "Drowzee", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados"]],
    [12, ["Pidgey", "Oddish", "Venonat", "Bellsprout", "Gloom", "Weepinbell", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados", "Magikarp", "Snorlax"]],
    [13, ["Oddish", "Venonat", "Bellsprout", "Pidgeotto", "Gloom", "Weepinbell", "Ditto", "Pidgey", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados", "Magikarp"]],
    [14, ["Oddish", "Venonat", "Bellsprout", "Pidgeotto", "Gloom", "Weepinbell", "Pidgey", "Ditto"]],
    [15, ["Oddish", "Venonat", "Bellsprout", "Pidgeotto", "Gloom", "Weepinbell", "Ditto", "Pidgey"]],
    [16, ["Rattata", "Spearow", "Doduo", "Raticate", "Snorlax"]],
    [17, ["Raticate", "Spearow", "Doduo", "Rattata", "Fearow"]],
    [18, ["Spearow", "Doduo", "Rattata", "Raticate", "Fearow"]],
    [19, ["Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados", "Magikarp"]],
    [20, ["Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados", "Magikarp"]],
    [21, ["Tangela", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Gyarados", "Magikarp"]],
    [22, ["Rattata", "Mankey", "Spearow", "Psyduck", "Slowpoke", "Poliwag", "Poliwhirl", "Goldeen", "Gyarados", "Magikarp"]],
    [23, ["Fearow", "Mankey", "Arbok", "Sandslash", "Primeape", "Spearow", "Ekans", "Sandshrew", "Psyduck", "Slowpoke", "Poliwag", "Poliwhirl", "Goldeen", "Krabby", "Horsea", "Gyarados", "Magikarp"]],
    [24, ["Oddish", "Bellsprout", "Metapod", "Kakuna", "Caterpie", "Weedle", "Pidgey", "Abra", "Tentacool", "Krabby", "Horsea", "Psyduck", "Slowpoke", "Poliwag", "Poliwhirl", "Goldeen", "Gyarados", "Magikarp"]],
    [25, ["Oddish", "Bellsprout", "Metapod", "Kakuna", "Caterpie", "Weedle", "Pidgey", "Abra", "Psyduck", "Slowpoke", "Poliwag", "Poliwhirl", "Goldeen", "Krabby", "Horsea", "Gyarados", "Magikarp"]],
];

export const FireRedLocations: EncounterLocation[] = [
    {
        name: "Pallet Town",
        key: "pallet-town",
        gameOrder: 0,
        // The starter is the only catchable Pokémon offered in town.
        encounters: pokemon("Bulbasaur", "Charmander", "Squirtle"),
        encounteredPokemon: null,
    },
    {
        name: "Viridian City",
        key: "viridian-city",
        gameOrder: 1,
        encounters: pokemon("Psyduck", "Slowpoke", "Poliwag", "Poliwhirl", "Goldeen", "Magikarp", "Gyarados"),
        encounteredPokemon: null,
    },
    ...routeData.map(([routeNumber, encounters], index): EncounterLocation => ({
        name: `Route ${routeNumber}`,
        key: `route-${routeNumber}`,
        gameOrder: index + 2,
        encounters: pokemon(...encounters),
        encounteredPokemon: null,
    })),
];
