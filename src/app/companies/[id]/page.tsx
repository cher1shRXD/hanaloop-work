import { CompanyApi } from "@/entities/company/api";
import { SCOPE_LABELS } from "@/widgets/dashboard/constants/scope-labels";
import PageHeader from "@/shared/ui/PageHeader";
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
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CompanyDetailPage({ params }: Props) {
  const { id } = await params;
  const company = await CompanyApi.getById(id);

  if (!company) {
    notFound();
  }

  const companies = [company];
  const monthlyData = getMonthlyData(companies);
  const sourceData = getSourceData(companies);
  const latestMonth = getLatestMonthSummary(companies);
  const scopeData = getScopeData(companies).map((d) => ({ ...d, name: SCOPE_LABELS[d.scope] }));
  const companyData = getCompanyData(companies);

  const grandTotal = companyData.reduce((s, c) => s + c.total, 0);
  const scopeTotal = scopeData.reduce((s, d) => s + d.total, 0);
  const topSource = sourceData[0];
  const scope1Pct =
    scopeTotal > 0
      ? Math.round(((scopeData.find((d) => d.scope === 1)?.total ?? 0) / scopeTotal) * 100)
      : 0;

  return (
    <div className="lg:p-8 p-4 space-y-4">
      <PageHeader category="Company Analysis" title={`${company.name} 상세 분석`} />

      <KpiSection
        grandTotal={grandTotal}
        latestMonth={latestMonth}
        topSource={topSource}
        scope1Pct={scope1Pct}
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TrendSection
          data={monthlyData}
          hint={`${company.name} 월별 추이 · tCO₂eq`}
          className="lg:col-[1/3]"
        />
        <ScopeDonutSection scopeData={scopeData} scopeTotal={scopeTotal} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SourceSection sourceData={sourceData} hint={`${company.name} 배출원별 비중`} />
        <ScopeSection sourceData={sourceData} />
      </div>
    </div>
  );;
}
