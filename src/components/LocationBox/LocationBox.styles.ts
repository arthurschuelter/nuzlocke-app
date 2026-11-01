import styled from 'styled-components';

export const LocationBoxContainer = styled.div`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 0.65rem;
    min-width: 0;
    background-color: black;

    display: grid;
    grid-template-columns: 7rem minmax(0, 1fr) auto;
    align-items: center;
    column-gap: 1.5rem;
    row-gap: 0.5rem;

    h2 {
        margin-top: 0;
        margin-bottom: 0;
        background: red;
        padding: 0.3rem 0.5rem;
        border-radius: 4px;
        color: white;
        font-size: 0.70rem;
        letter-spacing: 0;
        overflow-wrap: anywhere;
        width: 7rem;
        box-sizing: border-box;
        text-align: left;
    }

    select {
        width: 10rem;
        min-width: 0;
        max-width: 100%;
        justify-self: center;
        text-align: left;
        text-align-last: left;
    }

    & > div {
        justify-self: end;
    }

    @media (max-width: 420px) {
        grid-template-columns: 7rem minmax(0, 1fr);

        & > div {
            grid-column: 2;
        }
    }
`
