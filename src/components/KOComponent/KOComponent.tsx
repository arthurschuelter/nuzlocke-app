import * as S from "./KOComponent.style";
interface KOComponentProps {
    setKos: (numberKos: number) => void;
    numberKos: number;
}

export default function KOComponent({ setKos, numberKos }: KOComponentProps) {
    return (
        <S.KOContainer>
            <S.KOTitle>KOs:</S.KOTitle>
            <S.KOButton onClick={() => setKos(numberKos - 1)}>
                -
            </S.KOButton>
            <S.KoCount>{numberKos}</S.KoCount>
            <S.KOButton onClick={() => setKos(numberKos + 1)}>
                +
            </S.KOButton>
        </S.KOContainer>  
    );
}