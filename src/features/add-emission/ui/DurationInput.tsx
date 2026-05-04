"use client";

import { fadeUp } from "@/shared/utils/fade-up";
import { motion } from "framer-motion";
import { FIELD_NAMES } from "../constants/field-names";
import DatePicker from "@/shared/ui/DatePicker";

const DurationInput = () => {
  return (
    <motion.div 
      variants={fadeUp(0)}
      initial="hidden"
      animate="visible"
    >
      <DatePicker
        label="공정 진행 년-월"
        type="month"
        placeholder="yyyy-mm-dd"
        name={FIELD_NAMES.processingStartDate}
        required
      />
    </motion.div>
  );
};

export default DurationInput;
