import { CompanyApi } from "@/entities/company/api";
import { notFound } from "next/navigation";
import CompanyDashboard from "@/widgets/dashboard/ui/CompanyDashboard";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CompanyDetailPage({ params }: Props) {
  const { id } = await params;
  const company = await CompanyApi.getById(id);

  if (!company) {
    notFound();
  }

  return <CompanyDashboard company={company} />;
}
