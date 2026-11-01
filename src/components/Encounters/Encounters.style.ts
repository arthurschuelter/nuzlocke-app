import styled from "styled-components";

export const EncounterList = styled.div`
    width: 60%;
    margin: 0 auto 3rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;

    @media (max-width: 768px) {
        width: 90%;
        grid-template-columns: 1fr;
    }
`
