"use client";

import { useInView } from "react-intersection-observer";
import KpiCard from "./KpiCard";
import type { SourceRow } from "../utils/get-source-data";
import type { LatestMonthSummary } from "../utils/get-latest-month-summary";

interface Props {
  grandTotal: number;
  latestMonth: LatestMonthSummary;
  topSource: SourceRow | undefined;
  scope1Pct: number;
  scope1Sub?: string;
}

const KpiSection = ({
  grandTotal,
  latestMonth,
  topSource,
  scope1Pct,
  scope1Sub = "diesel · lpg · natural gas",
}: Props) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        label="총 배출량"
        value={grandTotal}
        suffix="t"
        inView={inView}
        delay={0}
      />
      <KpiCard
        label={`${latestMonth.month} 배출량`}
        value={latestMonth.total}
        suffix="t"
        delta={latestMonth.delta}
        inView={inView}
        delay={0.08}
      />
      <KpiCard
        label="최대 배출원"
        value={topSource?.total ?? 0}
        suffix="t"
        sub={topSource?.source}
        inView={inView}
        delay={0.16}
      />
      <KpiCard
        label="Scope 1 직접배출"
        value={scope1Pct}
        suffix="%"
        sub={scope1Sub}
        inView={inView}
        delay={0.24}
      />
    </div>
  );
};

export default KpiSection;
