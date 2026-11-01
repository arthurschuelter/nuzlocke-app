import { useState } from 'react';
import { useStore } from "../../store/store";

import { KOChartComponent } from "../KOChartComponent/KOChartComponent";

import * as S from './KOChart.styles';


interface KOChartProps {
}

export default function KOChart({ }: KOChartProps) {
    const [isGraphVisible, setIsGraphVisible] = useState(true);
    const { encounteredPokemon } = useStore();

    const sorted = Object.values(encounteredPokemon)
        .filter(p => p !== null)
        .map(p => ({ name: p.name, kills: p.killCount ?? 0 }))
        .sort((a, b) => b.kills - a.kills)
        .filter(p => p.kills > 0) as any[];

    return (
        <div>
            {sorted.length > 0 ? (
                <>
                    <S.KOChartHeader>
                        <S.KOChartTitle>KO Statistics</S.KOChartTitle>
                        <S.KOChartToggle
                            type="button"
                            aria-expanded={isGraphVisible}
                            aria-controls="ko-statistics-graph"
                            onClick={() => setIsGraphVisible(visible => !visible)}
                        >
                            {isGraphVisible ? 'Hide graph' : 'Show graph'}
                        </S.KOChartToggle>
                    </S.KOChartHeader>
                    {isGraphVisible && (
                        <S.KOChartContainer id="ko-statistics-graph">
                            <KOChartComponent data={sorted} />
                        </S.KOChartContainer>
                    )}
                </>
            ) : null}
        </div>
    );
}
