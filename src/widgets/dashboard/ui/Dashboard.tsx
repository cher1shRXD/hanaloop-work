"use client";

import { motion } from "framer-motion";
import { Company } from "@/entities/company/types";
import { useDashboardData } from "../hooks/useDashboardData";
import KpiSection from "./KpiSection";
import TrendSection from "./TrendSection";
import CompanyDonutSection from "./CompanyDonutSection";
import SourceSection from "./SourceSection";
import ScopeDonutSection from "./ScopeDonutSection";
import ScopeSection from "./ScopeSection";

interface Props {
  companies: Company[];
}

const Dashboard = ({ companies }: Props) => {
  const data = useDashboardData(companies);

  return (
    <div className="p-8 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="flex items-end justify-between pb-8"
      >
        <div>
          <p className="text-sm font-semibold text-text/35 uppercase tracking-widest mb-1">
            Carbon Accounting
          </p>
          <h1 className="text-5xl font-bold text-text">PCF 배출량 분석</h1>
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
      <div className="w-full grid grid-cols-4 gap-4">
        <TrendSection data={data.monthlyData} className="col-[1/3]" />
        <ScopeDonutSection
          scopeData={data.scopeData}
          scopeTotal={data.scopeTotal}
        />
        <CompanyDonutSection
          companyData={data.companyData}
          grandTotal={data.grandTotal}
        />
      </div>
      <SourceSection sourceData={data.sourceData} />
      <ScopeSection sourceData={data.sourceData} />
    </div>
  );
};

export default Dashboard;
