import { fetchCountries } from "@/shared/libs/api"

export const CountryApi = {
  async getList() {
    return await fetchCountries();
  },

  async getByCode(code: string) {
    return (await fetchCountries()).find(it => it.code === code);
  }
}