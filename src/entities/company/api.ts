import { fetchCompanies, saveEmission } from "@/shared/libs/api";
import { GhgEmission } from "./types";

export const CompanyApi = {
  async getList() {
    return await fetchCompanies();
  },

  async getById(id: string) {
    return (await fetchCompanies()).find((it) => it.id === id);
  },

  async addEmission(companyId: string, emission: GhgEmission): Promise<void> {
    await saveEmission(companyId, emission);
  },
};