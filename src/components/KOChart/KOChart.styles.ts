import styled from "styled-components";

export const KOChartContainer = styled.div`
    // dark gray backgound for KO chart
    background-color: #333;

    width: 60%;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 8px;

    @media (max-width: 768px) {
        width: 90%;
    }
    // border: 2px solid #7F77DD;
`

export const KOChartHeader = styled.div`
    width: 60%;
    margin: 0 auto 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        width: 90%;
    }
`

export const KOChartTitle = styled.h1`
    color: red;
    font-weight: bold;
`

export const KOChartToggle = styled.button`
    padding: 0.4rem 0.75rem;
    border: 1px solid #888;
    border-radius: 6px;
    background: #333;
    color: white;
    cursor: pointer;

    &:focus-visible {
        outline: 2px solid #7f77dd;
        outline-offset: 2px;
    }
`
