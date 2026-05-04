import { useGetCompanyListQuery } from "@/entities/company/queries"
import CompanyItem from "./CompanyItem";

const CompanyList = () => {
  const { data } = useGetCompanyListQuery();
  
  return data.map((item) => <CompanyItem data={item} key={item.id} />)
}

export default CompanyList