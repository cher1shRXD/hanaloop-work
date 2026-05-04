"use client";

import Input from "@/shared/ui/Input";
import SuffixText from "./SuffixText";
import { motion } from "framer-motion";
import { fadeUp } from "@/shared/utils/fade-up";
import { FIELD_NAMES } from "../constants/field-names";

const ElectricityInput = () => {
  return (
    <motion.div
      variants={fadeUp(0.05)}
      initial="hidden"
      animate="visible"
    >
      <Input
        label="전기 사용량"
        placeholder="10,000"
        name={FIELD_NAMES.electricityUsage}
        type="number"
        suffix={<SuffixText>kWh</SuffixText>}
        required
      />
    </motion.div>
  );
};

export default ElectricityInput;
