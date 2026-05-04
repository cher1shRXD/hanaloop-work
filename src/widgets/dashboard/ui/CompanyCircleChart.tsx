"use client";

import { useInView } from "react-intersection-observer";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import SectionCard from "../../../shared/ui/SectionCard";
import { COMPANY_COLORS } from "../constants/company-colors";
import { tooltipStyle, tooltipTextStyle } from "../constants/tooltip-style";
import { colors } from "@/shared/config/tokens";
import type { CompanyRow } from "../utils/get-company-data";

interface Props {
  companyData: CompanyRow[];
  grandTotal: number;
}

const CompanyCircleChart = ({ companyData, grandTotal }: Props) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const coloredData = companyData.map((d, i) => ({ ...d, fill: COMPANY_COLORS[i % COMPANY_COLORS.length] }));

  return (
    <div ref={ref}>
      <SectionCard title="기업별 배출량" total={grandTotal} inView={inView} delay={0}>
        <ResponsiveContainer width="100%" height={242}>
          <PieChart>
            <Pie data={coloredData} dataKey="total" nameKey="name" cx="50%" cy="50%"
              outerRadius={80} strokeWidth={0} />
            <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} tCO₂`, "배출량"]} contentStyle={tooltipStyle} itemStyle={tooltipTextStyle} labelStyle={tooltipTextStyle} />
            <Legend formatter={(v) => <span style={{ fontSize: 12, color: colors.text }}>{v}</span>} iconType="circle" iconSize={8} />
          </PieChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  );
};

export default CompanyCircleChart;
