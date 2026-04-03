import styled from 'styled-components';

export const LocationBoxContainer = styled.div`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: black;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    h2 {
        margin-top: 0;
        background: red;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        color: white;
    }
`