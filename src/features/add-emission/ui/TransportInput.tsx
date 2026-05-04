"use client";

import Input from "@/shared/ui/Input";
import SuffixText from "./SuffixText";
import { motion } from "framer-motion";
import { fadeUp } from "@/shared/utils/fade-up";
import { FIELD_NAMES } from "../constants/field-names";

const TransportInput = () => {
  return (
    <motion.div
      variants={fadeUp(0.2)}
      initial="hidden"
      animate="visible"
      className="flex gap-4 items-center"
    >
      <Input
        label="운송 거리"
        placeholder="100,000"
        type="number"
        suffix={<SuffixText>km</SuffixText>}
        name={FIELD_NAMES.transportDistance}
        min={0}
        required
      />
      <Input
        label="운송 중량"
        placeholder="2.4"
        type="number"
        step="any"
        suffix={<SuffixText>t</SuffixText>}
        name={FIELD_NAMES.transportWeight}
        min={0}
        required
      />
    </motion.div>
  );
};

export default TransportInput;
