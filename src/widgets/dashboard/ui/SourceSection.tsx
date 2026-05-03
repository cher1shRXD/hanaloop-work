"use client";

import { useInView } from "react-intersection-observer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ChartCard from "./ChartCard";
import { SCOPE_COLORS } from "../constants/scope-colors";
import { SCOPE_LABELS } from "../constants/scope-labels";
import { tooltipStyle, tooltipTextStyle } from "../constants/tooltip-style";
import { colors } from "@/shared/config/tokens";
import type { SourceRow } from "../utils/get-source-data";

interface Props {
  sourceData: SourceRow[];
  hint?: string;
}

const SourceSection = ({ sourceData, hint = "막대 색상 = scope 구분" }: Props) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const coloredData = sourceData.map((d) => ({ ...d, fill: SCOPE_COLORS[d.scope] }));

  return (
    <div ref={ref}>
      <ChartCard title="배출원별 총 배출량" hint={hint} inView={inView} delay={0}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={coloredData} layout="vertical" margin={{ top: 0, right: 16, left: 16, bottom: 0 }} barSize={14}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: colors.text, opacity: 0.5 }} axisLine={false} tickLine={false} unit="t" />
            <YAxis type="category" dataKey="source" tick={{ fontSize: 11, fill: colors.text, opacity: 0.6 }} axisLine={false} tickLine={false} width={64} />
            <Tooltip
              formatter={(v, _, props) =>
                [`${Number(v).toLocaleString()} tCO₂`, SCOPE_LABELS[(props.payload as { scope: number })?.scope ?? 1]]
              }
              cursor={{ fill: colors.border }}
              contentStyle={tooltipStyle}
              itemStyle={tooltipTextStyle}
              labelStyle={tooltipTextStyle}
            />
            <Bar dataKey="total" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default SourceSection;
