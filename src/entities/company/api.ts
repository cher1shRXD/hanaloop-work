import { fetchCompanies } from "@/shared/libs/api"

export const CompanyApi = {
  async getList() {
    return await fetchCompanies();
  },

  async getById(id: string) {
    return (await fetchCompanies()).find(it => it.id === id);
  }
}