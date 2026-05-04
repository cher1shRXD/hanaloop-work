"use client";

import { useGetCompanyListQuery } from "@/entities/company/queries";
import Select from "@/shared/ui/Select";
import { fadeUp } from "@/shared/utils/fade-up";
import { motion } from "framer-motion";
import { FIELD_NAMES } from "../constants/field-names";

const CompanyInput = () => {
  const { data } = useGetCompanyListQuery();

  const options = data.map((company) => ({ label: company.name, value: company.id }));

  return (
    <motion.div
      variants={fadeUp(0)}
      initial="hidden"
      animate="visible"
    >
      <Select options={options} label="소속 기업" name={FIELD_NAMES.company} />
    </motion.div>
  )
}

export default CompanyInput
