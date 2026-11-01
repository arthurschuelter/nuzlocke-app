# Playthrough Features Roadmap

## Goal

Expand the tracker from a location-based encounter and KO log into a complete Nuzlocke playthrough manager. The app should let a player track major fights, manage living and fainted Pokémon, record evolutions, and keep multiple runs separate. Game rules and catalogs should stay distinct from player-owned run state, and each feature should work with the selected game and playthrough.

## Shared Requirements

- Give every playthrough a stable ID and associate its game edition, rules, and progress with that ID.
- Keep game reference data (locations, boss definitions, evolution requirements) separate from data the player changes during a run.
- Identify Pokémon by a stable per-run ID, separately from species ID and nickname. This allows a Pokémon to evolve or change names without losing its history.
- Store a Pokémon's current species and status in one canonical roster. The Box, active party, and Graveyard should be views of that roster, not independently maintained copies.
- Define clear run-state migration and validation rules before expanding persisted data, so existing encounter selections remain intact.
- Make important actions reversible where practical, especially fainting, evolving, and moving Pokémon between roster views.
- Scope all reads and writes by the selected playthrough; changing runs must never leak or overwrite another run's data.

## Feature 1: Boss Fights

Track major trainer battles as structured milestones in a playthrough.

### Requirements

- Define a stable boss ID, display name, game, and progression order. Optionally group bosses by region or chapter.
- Track each boss's status per playthrough, such as upcoming, in progress, and defeated.
- Allow the player to record the team used and the outcome. Keep notes and optional loss details available without requiring them for a basic completion.
- Support game-specific boss rosters as optional reference data; don't make the fight tracker depend on complete roster data.
- Show upcoming and completed fights in progression order and allow the player to correct a mistaken result.

### Initial Scope

Start with a manually maintained boss list for one game and a simple status/outcome record. Add full opponent teams, level caps, and configurable boss rules after the basic run flow is established.

## Feature 2: Box

Provide a page for Pokémon the player currently owns but has not placed in the active party.

### Requirements

- Model each owned Pokémon as a run-scoped record with a stable ID, species, nickname, and relevant capture/encounter reference.
- Track current placement (party or box) and allow moving Pokémon between them.
- Retain useful details such as level, held item, nature, ability, and notes as optional fields; avoid making empty fields mandatory.
- Enforce any party-size limit in the shared roster logic rather than only in page controls.
- Show the Box as a filtered view of living, boxed roster members and preserve identity/history when moving them.

### Initial Scope

Add a roster model and a Box page with add, edit, and move-to-party actions. Defer box-slot layouts and multiple named boxes until there is a need to organize a large roster.

## Feature 3: Graveyard

Keep a permanent record of Pokémon that have fainted or otherwise left the active run.

### Requirements

- Store fainted Pokémon in the same roster with a terminal status and a fainted-at event, rather than deleting them or maintaining a disconnected copy.
- Record when and where the loss happened, with optional cause and notes.
- Keep the Pokémon's earlier species, nickname, encounter, and evolution history visible.
- Make accidental losses reversible through an explicit restore/undo action, while retaining an audit event if the record was corrected.
- Distinguish fainted Pokémon from released, traded, or otherwise retired Pokémon if those statuses are added later.

### Initial Scope

Provide a Graveyard view of fainted roster members and a flow to mark a party or boxed Pokémon as fainted, with location and optional notes.

## Feature 4: Evolution

Let the player update a roster member's species when it evolves while preserving its identity and run history.

### Requirements

- Model evolution as an event on a Pokémon's history and update its current species in the roster.
- Preserve the original encounter species and encounter location; evolution must not create a new encounter or consume another location.
- Support manual evolution first, since Nuzlocke rules and game conditions vary. Record the date/level and optional method or note.
- Provide a path to validate the target species against game-specific evolution data when that catalog is available, without blocking manual entries.
- Keep evolution history visible in the roster, Box, and Graveyard.

### Initial Scope

Allow choosing a new species and recording an evolution event. Add an evolution catalog and prompts for level, item, trade, friendship, or other conditions later.

## Feature 5: Concurrent Playthrough Saves

Allow multiple independent runs, including runs of the same game, and let the player switch between them.

### Approach A: Browser-Local Saves

Keep all run saves in browser storage and add a run selector with create, rename, duplicate, and delete actions.

#### Requirements

- Use a stable playthrough ID as the root key for all encounters, roster data, boss progress, and settings.
- Include a run name, game ID, creation/last-played timestamps, and schema version.
- Persist saves locally and handle malformed or older save data with validation and migration.
- Confirm destructive deletion and provide export/import so players can back up or move runs.

#### Trade-offs

- Fastest path and works offline without accounts or a server.
- Saves are limited to one browser profile/device unless exported; browser data can be cleared.

### Approach B: Account-Backed Saves

Store playthroughs under a user account and synchronize them across devices.

#### Requirements

- Establish authentication, authorization, and a server-side save schema before building sync UI.
- Define conflict behavior for edits made on multiple devices, plus offline handling and recovery.
- Preserve the same stable playthrough IDs and migration rules used by local saves.

#### Trade-offs

- Enables cross-device access and recovery.
- Adds backend, account, privacy, and synchronization work. Defer until local multi-save management is useful and proven.

## Suggested Delivery Sequence

1. Define the playthrough and roster data model, stable IDs, schema versioning, and migration path from the current encounter state.
2. Persist one playthrough locally and scope existing encounter selections to it.
3. Add create, select, rename, duplicate, export/import, and delete flows for multiple local playthroughs.
4. Build the canonical roster and party/Box views, including links from a roster Pokémon to its encounter.
5. Add the fainted status and Graveyard view, preserving roster identity and history.
6. Add manual evolution events and current species updates to the roster.
7. Add ordered boss milestones and per-playthrough progress, then expand optional opponent data as needed.
8. Consider account-backed synchronization only after local save behavior and schema migrations are stable.

## Data Model Direction

Keep the run as the ownership boundary, with normalized records for events and entities:

```text
Playthrough
  id, name, gameId, createdAt, updatedAt, schemaVersion
  encounterSelections
  pokemon[]
  bossProgress[]

Pokemon
  id, originalSpeciesId, currentSpeciesId, nickname
  encounterLocationId, status, placement
  history[]
```

The exact storage format can evolve, but UI pages should read and update this shared playthrough model instead of maintaining separate Box, Graveyard, or evolution state.
