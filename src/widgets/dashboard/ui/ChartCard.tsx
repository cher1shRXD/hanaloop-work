"use client";

import { motion } from "framer-motion";
import { fadeUp } from "../utils/fade-up";

interface Props {
  title: string;
  hint?: string;
  total?: number;
  inView: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

const ChartCard = ({ title, hint, total, inView, delay = 0, className = "", children }: Props) => (
  <motion.div
    variants={fadeUp(delay)}
    initial="hidden"
    animate={inView ? "visible" : "hidden"}
    className={`bg-surface border border-border rounded-2xl p-5 ${className}`}
  >
    <div className="mb-4 flex items-start justify-between">
      <div>
        <p className="text-[11px] font-semibold text-text/40 uppercase tracking-widest">{title}</p>
        {hint && <p className="text-[11px] text-text/25 mt-0.5">{hint}</p>}
      </div>
      {total != null && (
        <div className="text-right">
          <p className="text-sm font-bold text-text leading-none">{total.toLocaleString()}</p>
          <p className="text-[10px] text-text/35 mt-1">tCO₂</p>
        </div>
      )}
    </div>
    {children}
  </motion.div>
);

export default ChartCard;
