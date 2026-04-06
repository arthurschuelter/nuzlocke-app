// import { useState } from "react";
import * as S from './Encounters.style' 
import LocationBox from "../LocationBox/LocationBox";
import { FireRedLocations } from '../../data';

import { useStore } from "../../store/store";

export default function Encounters() {
    const { encounteredPokemon, setEncounteredPokemon } = useStore();
    // TODO: Refactor to use state and make a builder for each game.
    const locations = FireRedLocations
    
    return (
        <div>
            <h1>Encounters</h1>

            <S.EncounterList>
                { locations.map(location => (
                    <LocationBox 
                        key={location.key} 
                        name={location.name}
                        route={location.key}
                        possibleEncounters={location.encounters}
                        encounteredPokemon={encounteredPokemon[location.key] || null}
                        setEncounteredPokemon={setEncounteredPokemon}
                    />
                )) }
            </S.EncounterList>

        </div>
    );
}