// import { useState } from "react";
import * as S from './Encounters.style' 
import LocationBox from "../LocationBox/LocationBox";
import type { Pokemon }  from "../../types";
import { FireRedLocations } from '../../data';

function setEncounteredPokemon(encounter: Pokemon | null, key: string) {
    MyBox[key] = encounter;
    printEncounteredPokemon();
}
function printEncounteredPokemon() {
    console.log("Encountered Pokemon:", MyBox);
}

const MyBox: { [key: string]: Pokemon | null } = {

}

export default function Encounters() {
    // TODO: Refactor to use state and make a builder for each game.
    const locations = FireRedLocations
    
    printEncounteredPokemon();

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
                        encounteredPokemon={location.encounteredPokemon}
                        setEncounteredPokemon={setEncounteredPokemon}
                    />
                )) }
            </S.EncounterList>

        </div>
    );
}