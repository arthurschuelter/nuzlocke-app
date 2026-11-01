# Encounter Data Modularization Roadmap

## Goal

Organize encounter data so the tracker can support multiple Pokémon games without making the UI depend on one game's data file. Keep the game's encounter catalog separate from a player's saved run: game data describes available locations and Pokémon; run state records which Pokémon the player selected and how many KOs it has.

## Shared Requirements

- Give each game edition a stable ID, such as `firered`, `leafgreen`, or `emerald`.
- Give each location a stable ID unique within its game. Preserve the current location keys where possible, and namespace saved encounter state by both game ID and location ID.
- Store locations in playthrough order rather than relying on alphabetical sorting.
- Represent Pokémon by stable species IDs rather than display names when the catalog expands. Keep display names in a shared species catalog or derive them from IDs.
- Keep encounter methods optional until the UI needs to distinguish grass, surfing, fishing, gifts, fossils, or static encounters.
- Treat FireRed and LeafGreen as distinct game definitions because their available Pokémon can differ.
- Keep components dependent on a selected game definition or registry lookup, rather than importing a specific game's location array.
- Validate that IDs are unique, references point to known species, and each game's locations have valid order values.

## Approach 1: Independent Data File per Game

Use one complete location list for each game edition. This is the simplest structure to understand and ship first, and is recommended for the initial migration.

### Possible Structure

```text
src/data/
  types.ts
  registry.ts
  species.ts
  games/
    firered.ts
    leafgreen.ts
    emerald.ts
```

Each game file exports a `GameDefinition` containing metadata and its ordered locations. `registry.ts` imports those definitions and exposes lookup by game ID. `data/index.ts` can remain a small public entry point that re-exports the registry and shared types.

### Requirements

- Create shared `GameDefinition`, `EncounterLocation`, and `Encounter` types.
- Move the current FireRed locations into `games/firered.ts` without changing their stable keys.
- Add LeafGreen as its own definition, even if it initially shares many encounter lists with FireRed.
- Add a registry mapping game IDs to definitions.
- Update the encounter UI to receive the chosen definition instead of importing `FireRedLocations` directly.
- Keep encountered Pokémon and KO counts in the player's run store, not in the static game catalog.

### Trade-offs

- Each file is straightforward to read and edit.
- Some shared encounter data may be duplicated between similar versions. Accept this until it becomes difficult to maintain.

## Approach 2: Shared Regional Data with Game Overrides

Use a shared base dataset for games with substantial overlap, then apply explicit overrides for edition-specific locations and encounters. This can reduce duplication for pairs such as FireRed and LeafGreen.

### Possible Structure

```text
src/data/
  regions/
    kanto-base.ts
  games/
    firered.ts
    leafgreen.ts
  registry.ts
```

The base dataset contains common locations and encounters. Each game definition refers to that base and describes additions, removals, or replacements.

### Requirements

- Define predictable merge rules for locations and encounter lists.
- Make edition differences explicit and reviewable; avoid hidden conditional logic in UI components.
- Support replacing a location's complete encounter list as well as adding or removing a species.
- Validate the resolved game definition after applying overrides.
- Keep overrides small and specific; if most locations need overrides, use independent game files instead.

### Trade-offs

- Reduces repeated data where games genuinely share encounters.
- Adds merge logic and makes the final data less direct to inspect. Prefer this only when duplication is a real maintenance burden.

## Approach 3: External or Generated Data Catalog

Store game data in JSON or another source format and load or generate TypeScript definitions from it. This is useful if the catalog grows large, needs non-developer editing, or is imported from a maintained dataset.

### Possible Structure

```text
src/data/
  schema.ts
  registry.ts
data/
  games/
    firered.json
    leafgreen.json
```

### Requirements

- Define and enforce a schema for game metadata, locations, species IDs, and encounter methods.
- Add a validation step that reports the game, location, and field for invalid data.
- Record the source and version of imported data, and check its license before redistributing it.
- Decide whether data is loaded at runtime or generated into typed modules during development/build.
- Keep the app's public data API stable so UI components do not depend on JSON file layout.

### Trade-offs

- Makes bulk data editing and importing easier.
- Requires schema, validation, and source maintenance. This is unnecessary overhead for a small hand-maintained catalog.

## Suggested Delivery Sequence

1. Define shared types and a `GameDefinition` shape.
2. Extract the current FireRed catalog into `games/firered.ts`; keep `data/index.ts` as a registry-facing entry point.
3. Change the encounter screen to use a selected game definition.
4. Add LeafGreen as a separate game definition and verify edition-specific encounter data.
5. Namespace saved run state by `{ gameId, locationId }` so the same route key in two games cannot collide.
6. Add species IDs and optional encounter methods as the UI gains features that use them.
7. Consider regional bases/overrides or external data only after duplicated or manually maintained data becomes difficult to manage.
