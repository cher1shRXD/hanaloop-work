import { CompanyApi } from "@/entities/company/api";
import Dashboard from "@/widgets/dashboard/ui/Dashboard";

export default async function HomePage() {
  const companies = await CompanyApi.getList();
  return <Dashboard companies={companies} />;
}
