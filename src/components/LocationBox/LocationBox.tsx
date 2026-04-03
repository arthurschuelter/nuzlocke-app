import { useEffect, useState } from "react";
import * as S from './LocationBox.styles';

import KOComponent from "../KOComponent/KOComponent";

interface LocationBoxProps {
    name: string;
    possibleEncounters?: { name: string }[];
    encounteredPokemon?: { name: string } | null;
}

export default function LocationBox({ name, possibleEncounters, encounteredPokemon }: LocationBoxProps) {

    useEffect(() => {
        if (choice != null) {
            encounteredPokemon = { name: choice };
        }
    }, [encounteredPokemon]);


    const [choice, setChoice] = useState<string | null>(null);
    const [numberKos, setNumberKos] = useState(0);


    const options = possibleEncounters ? possibleEncounters.map(e => e.name) : ["Pidgey", "Rattata", "Caterpie"];

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        encounteredPokemon = { name: e.target.value };
        setChoice(e.target.value);
    }

    return (
        <S.LocationBoxContainer>
            <h2>{name}</h2>

            <select value={choice ?? ""} onChange={e => handleSelectChange(e)}>
                <option value="">Select a Pokémon</option>
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            {choice && 
                <KOComponent 
                    setKos={setNumberKos} 
                    numberKos={numberKos} />
            }

            {/* {choice && 
                <button onClick={() => setChoice(null)}>Trash Icon</button>
            } */}
        </S.LocationBoxContainer>
    );
}