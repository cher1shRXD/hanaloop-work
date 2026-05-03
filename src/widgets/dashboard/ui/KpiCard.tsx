"use client";

import { motion } from "framer-motion";
import { fadeUp } from "../utils/fade-up";
import { useCountUp } from "../hooks/useCountUp";

interface Props {
  label: string;
  value: number;
  suffix?: string;
  sub?: string;
  delta?: number | null;
  inView: boolean;
  delay?: number;
}

const KpiCard = ({ label, value, suffix = "", sub, delta, inView, delay = 0 }: Props) => {
  const count = useCountUp(value, inView);

  return (
    <motion.div
      variants={fadeUp(delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-surface border border-border rounded-2xl overflow-hidden cursor-default"
    >
      <div className="p-5">
        <p className="text-[11px] font-semibold text-text/40 uppercase tracking-widest">{label}</p>
        <p className="text-[28px] font-bold text-text mt-2 leading-none">
          {count.toLocaleString()}
          <span className="text-base font-medium text-text/50 ml-1">{suffix}</span>
        </p>
        {delta != null && (
          <p className={`text-xs mt-2.5 font-semibold ${delta < 0 ? "text-emerald-500" : "text-red-400"}`}>
            {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}% 전월 대비
          </p>
        )}
        {sub && <p className="text-[11px] text-text/35 mt-1.5">{sub}</p>}
      </div>
    </motion.div>
  );
};

export default KpiCard;
