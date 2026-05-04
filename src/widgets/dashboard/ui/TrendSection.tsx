"use client";

import { useInView } from "react-intersection-observer";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, MouseHandlerDataParam } from "recharts";
import SectionCard from "@/shared/ui/SectionCard";
import { tooltipStyle, tooltipTextStyle } from "../constants/tooltip-style";
import { colors } from "@/shared/config/tokens";
import type { MonthlyRow } from "../utils/get-monthly-data";
import { useSearchParams } from "next/navigation";
import { RotateCcwIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  data: MonthlyRow[];
  hint?: string;
  className?: string;
}

const TrendSection = ({ data, hint = "전 회사 합산 · tCO₂eq", className = "" }: Props) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYearMonth = searchParams.get("yearMonth");

  const handlePointClick = (state: MouseHandlerDataParam) => {
    if (!state || !state.activeLabel) return;

    const clickedData = data.find((d) => d.label === state.activeLabel);
    if (clickedData) {
      const { yearMonth } = clickedData;
      const params = new URLSearchParams(searchParams.toString());
      params.set("yearMonth", yearMonth);
      router.push(`?${params.toString()}`);
    }
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("yearMonth");
    router.push(`?${params.toString()}`);
  };

  return (
    <div ref={ref} className={className}>
      <SectionCard 
        title={currentYearMonth ? `${currentYearMonth} 분석 데이터` : "월별 총 배출량 추이"} 
        hint={currentYearMonth ? "전체 분석을 누르면 모든 기간 데이터를 봅니다" : hint} 
        inView={inView}
        action={currentYearMonth ? (
          <button 
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg  text-white text-xs font-bold cursor-pointer"
          >
            <RotateCcwIcon size={12} />
            전체 분석
          </button>
        ) : undefined}
      >
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart 
            data={data} 
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            onClick={handlePointClick}
            style={{ cursor: "pointer", pointerEvents: "auto" }}
          >
            <defs>
              <linearGradient id="grad-trend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primaryBlue} stopOpacity={0.2} />
                <stop offset="95%" stopColor={colors.primaryBlue} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: colors.text, opacity: 0.5 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: colors.text, opacity: 0.5 }} axisLine={false} tickLine={false} unit="t" />
            <Tooltip 
              formatter={(v) => [`${Number(v).toLocaleString()} tCO₂ - 클릭하여 상세 분석`, "배출량"]} 
              contentStyle={tooltipStyle} 
              itemStyle={tooltipTextStyle} 
              labelStyle={tooltipTextStyle}
              cursor={{ stroke: colors.primaryBlue, strokeWidth: 1, strokeDasharray: "4 4" }}
            />
            <Area 
              type="monotone" 
              dataKey="total" 
              stroke={colors.primaryBlue} 
              strokeWidth={2.5} 
              fill="url(#grad-trend)"
              isAnimationActive={false}
              dot={{ 
                r: 4, 
                fill: colors.primaryBlue, 
                strokeWidth: 2, 
                stroke: colors.surface,
              }} 
              activeDot={{ 
                r: 6, 
                stroke: colors.primaryBlue, 
                strokeWidth: 2, 
                fill: colors.surface,
                cursor: "pointer"
              }} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  );
};

export default TrendSection;

