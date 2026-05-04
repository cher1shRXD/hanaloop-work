"use client";

import Button from "@/shared/ui/Button";
import { motion } from "framer-motion";
import { fadeUp } from "@/shared/utils/fade-up";

interface Props {
  isLoading?: boolean;
}

const Submit = ({ isLoading }: Props) => {
  return (
    <motion.div
      variants={fadeUp(0.25)}
      initial="hidden"
      animate="visible"
    >
      <Button 
        className="mt-8 w-full" 
        type="submit" 
        isLoading={isLoading}
      >
        추가하기
      </Button>
    </motion.div>
  )
}

export default Submit;