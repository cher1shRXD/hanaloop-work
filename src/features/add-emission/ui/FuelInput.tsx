"use client";

import Input from "@/shared/ui/Input";
import Select from "@/shared/ui/Select";
import SuffixText from "./SuffixText";
import { motion } from "framer-motion";
import { fadeUp } from "@/shared/utils/fade-up";
import { FIELD_NAMES } from "../constants/field-names";

const FuelInput = () => {
  return (
    <motion.div
      variants={fadeUp(0.1)}
      initial="hidden"
      animate="visible"
      className="flex gap-4 items-center"
    >
      <Select
        label="연료 종류"
        // Scope 1 factors — IPCC 2006 Guidelines, Volume 2 (Energy), AR6 GWP100
        // 디젤/휘발유: EPA GHG Factor Hub 2024 (g/gal ÷ 3.785)
        // 천연가스: IPCC 2006 Table 2.2 (56.1 kgCO2/GJ × 34.2 MJ/m³); UI의 단위 "L"는 m³ 입력 기준으로 사용
        // LPG: IPCC 2006 Table 2.2 (63.1 kgCO2/GJ × 24.1 MJ/L × density)
        options={[
          { label: "디젤",    value: "디젤::2.688" },
          { label: "천연가스", value: "천연가스::2.040" },
          { label: "휘발유",  value: "휘발유::2.348" },
          { label: "LPG",    value: "LPG::1.519" },
        ]}
        name={FIELD_NAMES.fuelType}
        required
      />
      <Input
        label="연료 사용량"
        placeholder="500"
        type="number"
        suffix={<SuffixText>L</SuffixText>}
        name={FIELD_NAMES.fuelUsage}
        required
      />
    </motion.div>
  );
};

export default FuelInput;
