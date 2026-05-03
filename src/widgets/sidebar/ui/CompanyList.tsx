import { useGetCompanyListQuery } from "../../../entities/company/queries"
import CompanyItem from "./CompanyItem";

const CompanyList = () => {
  const { data } = useGetCompanyListQuery();
  
  return (
    <>
      {data.map((item, index) => <CompanyItem data={item} index={index} key={item.id} />)}
    </>
  )
}

export default CompanyList