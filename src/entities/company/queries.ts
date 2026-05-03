import { useSuspenseQuery } from "@tanstack/react-query";
import { CompanyApi } from "./api";

export const useGetCompanyListQuery = () => useSuspenseQuery({
  queryKey: ["company", "list"],
  queryFn: CompanyApi.getList
})