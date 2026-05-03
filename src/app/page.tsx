import { CompanyApi } from "@/entities/company/api";
import { SCOPE_LABELS } from "@/widgets/dashboard/constants/scope-labels";
import CompanyDonutSection from "@/widgets/dashboard/ui/CompanyDonutSection";
import DashboardHeader from "@/widgets/dashboard/ui/DashboardHeader";
import KpiSection from "@/widgets/dashboard/ui/KpiSection";
import ScopeDonutSection from "@/widgets/dashboard/ui/ScopeDonutSection";
import ScopeSection from "@/widgets/dashboard/ui/ScopeSection";
import SourceSection from "@/widgets/dashboard/ui/SourceSection";
import TrendSection from "@/widgets/dashboard/ui/TrendSection";
import { getCompanyData } from "@/widgets/dashboard/utils/get-company-data";
import { getLatestMonthSummary } from "@/widgets/dashboard/utils/get-latest-month-summary";
import { getMonthlyData } from "@/widgets/dashboard/utils/get-monthly-data";
import { getScopeData } from "@/widgets/dashboard/utils/get-scope-data";
import { getSourceData } from "@/widgets/dashboard/utils/get-source-data";

export default async function HomePage() {
  const companies = await CompanyApi.getList();
  const monthlyData = getMonthlyData(companies);
  const companyData = getCompanyData(companies);
  const sourceData = getSourceData(companies);
  const latestMonth = getLatestMonthSummary(companies);
  const scopeData = getScopeData(companies).map((d) => ({ ...d, name: SCOPE_LABELS[d.scope] }));

  const grandTotal = companyData.reduce((s, c) => s + c.total, 0);
  const scopeTotal = scopeData.reduce((s, d) => s + d.total, 0);
  const topSource = sourceData[0];
  const scope1Pct =
    scopeTotal > 0
      ? Math.round(((scopeData.find((d) => d.scope === 1)?.total ?? 0) / scopeTotal) * 100)
      : 0;

  return (
    <div className="p-4 lg:p-8 space-y-4">
      <DashboardHeader category="Carbon Accounting" title="PCF 배출량 분석" />

      <KpiSection
        grandTotal={grandTotal}
        latestMonth={latestMonth}
        topSource={topSource}
        scope1Pct={scope1Pct}
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
        <TrendSection data={monthlyData} className="lg:col-[1/3]" />
        <ScopeDonutSection scopeData={scopeData} scopeTotal={scopeTotal} />
        <CompanyDonutSection companyData={companyData} grandTotal={grandTotal} />
      </div>

      <SourceSection sourceData={sourceData} />
      <ScopeSection sourceData={sourceData} />
    </div>
  );;
}
