// import { useState } from "react";

import LocationBox from "../LocationBox/LocationBox";

interface Pokemon {
    name: string;
}

export default function Encounters() {
    const locations = [
        {
            name: "Pallet Town",
            key: "pallet-town",
            encounters: [{ name: "Bulbasaur" }, { name: "Charmander" }, { name: "Squirtle" }],
            encounteredPokemon: null
        },
        {
            name: "Route 1",
            key: "route-1",
            encounters: [{ name: "Pidgey" }, { name: "Rattata" }, { name: "Caterpie" }],
            encounteredPokemon: null
        }
    ]

    let encounters: Pokemon[] = new Array(locations.length).fill({ name: "" });
    console.log("encounters:", encounters);

    return (
        <div>
            <h1>Encounters</h1>

            { locations.map(location => (
                <LocationBox 
                    key={location.key} 
                    name={location.name}
                    possibleEncounters={location.encounters}
                    encounteredPokemon={location.encounteredPokemon}
                />
            )) }

        </div>
    );
}