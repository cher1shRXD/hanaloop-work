import { CompanyApi } from "@/entities/company/api";
import PageHeader from "@/shared/ui/PageHeader";
import KpiSection from "@/widgets/dashboard/ui/KpiSection";
import ScopeCircleChart from "@/widgets/dashboard/ui/ScopeCircleChart";
import ScopeSection from "@/widgets/dashboard/ui/ScopeSection";
import SourceSection from "@/widgets/dashboard/ui/SourceSection";
import TrendSection from "@/widgets/dashboard/ui/TrendSection";
import CompanyCircleChart from "@/widgets/dashboard/ui/CompanyCircleChart";
import { processDashboardData } from "@/widgets/dashboard/utils/process-dashboard-data";

interface Props {
  searchParams: Promise<{ yearMonth?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { yearMonth } = await searchParams;
  const companies = await CompanyApi.getList();

  const {
    monthlyData,
    companyData,
    sourceData,
    scopeData,
    latestMonth,
    grandTotal,
    scopeTotal,
    topSource,
    scope1Pct,
    scope1Sub,
  } = processDashboardData(companies, yearMonth);

  return (
    <div className="p-4 lg:p-8 space-y-4">
      <PageHeader category="Carbon Accounting" title="PCF 배출량 분석" />

      <KpiSection
        grandTotal={grandTotal}
        latestMonth={latestMonth}
        topSource={topSource}
        scope1Pct={scope1Pct}
        scope1Sub={scope1Sub}
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
        <TrendSection data={monthlyData} className="lg:col-[1/3]" />
        <ScopeCircleChart scopeData={scopeData} scopeTotal={scopeTotal} />
        <CompanyCircleChart companyData={companyData} grandTotal={grandTotal} />
      </div>

      <SourceSection sourceData={sourceData} />
      <ScopeSection sourceData={sourceData} />
    </div>
  );
}
