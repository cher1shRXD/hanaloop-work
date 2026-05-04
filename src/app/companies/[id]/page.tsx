import { CompanyApi } from "@/entities/company/api";
import { PostApi } from "@/entities/post/api";
import PageHeader from "@/shared/ui/PageHeader";
import KpiSection from "@/widgets/dashboard/ui/KpiSection";
import ScopeCircleChart from "@/widgets/dashboard/ui/ScopeCircleChart";
import ScopeSection from "@/widgets/dashboard/ui/ScopeSection";
import SourceSection from "@/widgets/dashboard/ui/SourceSection";
import TrendSection from "@/widgets/dashboard/ui/TrendSection";
import CompanyPostManagement from "@/features/manage-post/ui/CompanyPostManagement";
import { processDashboardData } from "@/widgets/dashboard/utils/process-dashboard-data";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ yearMonth?: string }>;
}

export default async function CompanyDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { yearMonth } = await searchParams;
  
  const [company, allPosts] = await Promise.all([
    CompanyApi.getById(id),
    PostApi.getList(),
  ]);

  if (!company) {
    notFound();
  }

  const {
    monthlyData,
    sourceData,
    scopeData,
    latestMonth,
    grandTotal,
    scopeTotal,
    topSource,
    scope1Pct,
  } = processDashboardData([company], yearMonth);

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
        <ScopeCircleChart scopeData={scopeData} scopeTotal={scopeTotal} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SourceSection sourceData={sourceData} hint={`${company.name} 배출원별 비중`} />
        <ScopeSection sourceData={sourceData} />
      </div>

      <CompanyPostManagement 
        companyId={id} 
        yearMonth={yearMonth ?? ""} 
        posts={allPosts} 
      />
    </div>
  );
}
