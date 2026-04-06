import { useState } from "react";
import * as S from './LocationBox.styles';
import type { Pokemon }  from "../../types";

import KOComponent from "../KOComponent/KOComponent";

interface LocationBoxProps {
    name: string;
    route: string;
    possibleEncounters?: { name: string }[];
    encounteredPokemon?: Pokemon | null;
    setEncounteredPokemon: (encounter: Pokemon | null, key: string) => void;
}

export default function LocationBox({ name, route, possibleEncounters, encounteredPokemon, setEncounteredPokemon }: LocationBoxProps) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(encounteredPokemon || null);
    const [numberKos, setNumberKos] = useState(0);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPokemon: Pokemon = { name: e.target.value, killCount: numberKos };
        setPokemon(newPokemon);
        
        setEncounteredPokemon(newPokemon, route);
    }
    
    const handleKoChange = (newKos: number) => {
        if (newKos < 0) newKos = 0;
        setNumberKos(newKos);
        if (pokemon) {
            const updatedPokemon = { ...pokemon, killCount: newKos };
            setPokemon(updatedPokemon);
            setEncounteredPokemon(updatedPokemon, route);
        }
    }
    
    const options = possibleEncounters ? possibleEncounters.map(e => e.name) : ["null"];
    
    return (
        <S.LocationBoxContainer>
            <h2>{name}</h2>

            <select value={pokemon?.name ?? ""} onChange={e => handleSelectChange(e)}>
                <option value="">Select a Pokémon</option>
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            {pokemon?.name && 
                <KOComponent 
                    setKos={handleKoChange} 
                    numberKos={numberKos} />
            }

        </S.LocationBoxContainer>
    );
}