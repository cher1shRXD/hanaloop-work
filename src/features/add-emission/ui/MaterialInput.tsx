"use client";

import Input from "@/shared/ui/Input";
import Select from "@/shared/ui/Select";
import SuffixText from "./SuffixText";
import { motion } from "framer-motion";
import { fadeUp } from "@/shared/utils/fade-up";
import { FIELD_NAMES } from "../constants/field-names";

const MaterialInput = () => {
  return (
    <motion.div
      variants={fadeUp(0.15)}
      initial="hidden"
      animate="visible"
      className="flex gap-4 items-center"
    >
      <Select
        label="원자재 종류"
        options={[
          { label: "철강", value: "철강::2.10" },
          { label: "알루미늄", value: "알루미늄::8.24" },
          { label: "플라스틱", value: "플라스틱::3.40" },
          { label: "종이", value: "종이::1.10" },
          { label: "유리", value: "유리::0.90" },
        ]}
        name={FIELD_NAMES.materialType}
        required
      />
      <Input
        label="원자재 무게"
        placeholder="2,400"
        type="number"
        name={FIELD_NAMES.materialWeight}
        suffix={<SuffixText>kg</SuffixText>}
        min={0}
        required
      />
    </motion.div>
  );
};

export default MaterialInput;
