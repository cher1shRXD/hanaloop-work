import { fetchCountries } from "@/shared/libs/api"

export const CountryApi = {
  async getList() {
    return await fetchCountries();
  }
}