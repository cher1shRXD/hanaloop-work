"use client";

import { useInView } from "react-intersection-observer";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ChartCard from "./ChartCard";
import { SCOPE_COLORS } from "../constants/scope-colors";
import { tooltipStyle, tooltipTextStyle } from "../constants/tooltip-style";
import { colors } from "@/shared/config/tokens";
import type { ScopeRow } from "../utils/get-scope-data";

interface Props {
  scopeData: (ScopeRow & { name: string })[];
  scopeTotal: number;
}

const ScopeDonutSection = ({ scopeData, scopeTotal }: Props) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const coloredData = scopeData.map((d) => ({ ...d, fill: SCOPE_COLORS[d.scope] }));

  return (
    <div ref={ref}>
      <ChartCard title="스코프별 비교" total={scopeTotal} inView={inView} delay={0}>
        <ResponsiveContainer width="100%" height={242}>
          <PieChart>
            <Pie data={coloredData} dataKey="total" nameKey="name" cx="50%" cy="50%"
            outerRadius={80} strokeWidth={0} />
            <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} tCO₂`, "배출량"]} contentStyle={tooltipStyle} itemStyle={tooltipTextStyle} labelStyle={tooltipTextStyle} />
            <Legend formatter={(v) => <span style={{ fontSize: 11, color: colors.text }}>{v}</span>} iconType="circle" iconSize={8} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default ScopeDonutSection;
