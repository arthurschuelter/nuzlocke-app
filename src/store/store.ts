import { create } from "zustand";
import type { Pokemon } from "../types";

interface StoreState {
    encounteredPokemon: { [key: string]: Pokemon | null };
    setEncounteredPokemon: (encounter: Pokemon | null, key: string) => void;
}


export const useStore = create<StoreState>((set) => ({
    encounteredPokemon: {} as { [key: string]: Pokemon | null },
    setEncounteredPokemon: (encounter: Pokemon | null, key: string) => set((state: any) => {
        const updatedEncounters = { ...state.encounteredPokemon, [key]: encounter };
        
        const sizeInKB = new Blob([JSON.stringify(updatedEncounters)]).size / 1024;
        console.log("Size:", sizeInKB.toFixed(2), "KB");
        console.log("Updated Encountered Pokemon:", updatedEncounters);
        
        return { encounteredPokemon: updatedEncounters };
    }),
}));