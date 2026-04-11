import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine , Cell } from "recharts";


interface KOChartComponentProps {
    data: { name: string; kills: number }[];
}

const KOTooltip = ({ payload, coordinate }: any) => {
  if (!payload?.length) return null;
  return (
    <div style={{'backgroundColor': 'white', width: '120px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', pointerEvents: 'none', position: 'absolute', left: coordinate.x, top: coordinate.y }}>
      <p>{payload[0].payload.name}</p>
      <p>KO count: {payload[0].value}</p>
    </div>
  );
};


export const KOChartComponent = ({ data }: KOChartComponentProps) => {
    const [chartWidth, setChartWidth] = useState(0);
    const maxKills = Math.max(...data.map((p) => p.kills));
    const axisTicks = Array.from({ length: maxKills + 1 }, (_, i) => i);

    return (
        <ResponsiveContainer width="100%" height={data.length * 56 + 80} onResize={(w) => setChartWidth(w)}>
            <BarChart data={data} layout="vertical" barSize={48} style={{ cursor: "pointer" }}>
                {axisTicks.slice(1).map((tick) => (
                    <ReferenceLine key={tick} x={tick} stroke="#fff" strokeDasharray="3 3" />
                ))}
            <XAxis type="number" domain={[0, maxKills]} ticks={axisTicks} />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip 
                formatter={(value) => `${value}`} 
                cursor={{ opacity: 0 }}
                position={{ x: chartWidth }}
                isAnimationActive={false}
                content={<KOTooltip />}
                // wrapperStyle={{ right: 0, left: "auto", transform: "translateY(100%)" }}
 
                />
            <Bar dataKey="kills" radius={4}>
                {data.map((_, i) => (
                    <Cell key={i} fill="#77dd7c" />
                ))}
            </Bar>
            </BarChart>
        </ResponsiveContainer>

    );
};