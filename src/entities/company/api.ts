import { fetchCompanies } from "@/shared/libs/api"

export const CompanyApi = {
  async getList() {
    return await fetchCompanies();
  }
}