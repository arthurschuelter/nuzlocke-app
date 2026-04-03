
interface KOComponentProps {
    setKos: (numberKos: number) => void;
    numberKos: number;
}

export default function KOComponent({ setKos, numberKos }: KOComponentProps) {
    return (
        <div>
            <button onClick={() => setKos(numberKos - 1)}>
                -
            </button>
            <span>{numberKos}</span>
            <button onClick={() => setKos(numberKos + 1)}>
                +
            </button>
        </div>  
    );
}