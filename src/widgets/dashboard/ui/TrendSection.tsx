"use client";

import { useInView } from "react-intersection-observer";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ChartCard from "./ChartCard";
import { tooltipStyle, tooltipTextStyle } from "../constants/tooltip-style";
import { colors } from "@/shared/config/tokens";
import type { MonthlyRow } from "../utils/get-monthly-data";

interface Props {
  data: MonthlyRow[];
  hint?: string;
  className?: string;
}

const TrendSection = ({ data, hint = "전 회사 합산 · tCO₂eq", className = "" }: Props) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div ref={ref} className={className}>
      <ChartCard title="월별 총 배출량 추이" hint={hint} inView={inView}>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="grad-trend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primaryBlue} stopOpacity={0.2} />
                <stop offset="95%" stopColor={colors.primaryBlue} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: colors.text, opacity: 0.5 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: colors.text, opacity: 0.5 }} axisLine={false} tickLine={false} unit="t" />
            <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} tCO₂`, "배출량"]} contentStyle={tooltipStyle} itemStyle={tooltipTextStyle} labelStyle={tooltipTextStyle} />
            <Area type="monotone" dataKey="total" stroke={colors.primaryBlue} strokeWidth={2.5} fill="url(#grad-trend)"
              dot={{ r: 3, fill: colors.primaryBlue, strokeWidth: 0 }} activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default TrendSection;
