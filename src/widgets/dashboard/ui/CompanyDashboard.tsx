"use client";

import { motion } from "framer-motion";
import { Company } from "@/entities/company/types";
import { useDashboardData } from "../hooks/useDashboardData";
import KpiSection from "./KpiSection";
import TrendSection from "./TrendSection";
import SourceSection from "./SourceSection";
import ScopeDonutSection from "./ScopeDonutSection";
import ScopeSection from "./ScopeSection";

interface Props {
  company: Company;
}

const CompanyDashboard = ({ company }: Props) => {
  const data = useDashboardData([company]);

  return (
    <div className="lg:p-8 p-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col lg:flex-row items-start justify-between gap-2 pb-8"
      >
        <div>
          <p className="text-sm font-semibold text-text/35 uppercase tracking-widest mb-1">
            Company Analysis
          </p>
          <h1 className="text-xl lg:text-5xl font-bold text-text">{company.name} 상세 분석</h1>
        </div>
        <span className="text-xs font-medium text-text/40 bg-border/60 rounded-full px-3 py-1.5">
          2024.01 – 2024.06
        </span>
      </motion.div>

      <KpiSection
        grandTotal={data.grandTotal}
        latestMonth={data.latestMonth}
        topSource={data.topSource}
        scope1Pct={data.scope1Pct}
      />
      
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TrendSection 
          data={data.monthlyData} 
          hint={`${company.name} 월별 추이 · tCO₂eq`} 
          className="lg:col-[1/3]" 
        />
        <ScopeDonutSection
          scopeData={data.scopeData}
          scopeTotal={data.scopeTotal}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SourceSection sourceData={data.sourceData} hint={`${company.name} 배출원별 비중`} />
        <ScopeSection sourceData={data.sourceData} />
      </div>
    </div>
  );
};

export default CompanyDashboard;
