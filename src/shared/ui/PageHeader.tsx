"use client";

import { motion } from "framer-motion";

interface Props {
  category: string;
  title: string;
  period?: string;
}

const PageHeader = ({ category, title, period }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    className="flex flex-col lg:flex-row items-start justify-between gap-2 pb-8"
  >
    <div>
      <p className="text-sm font-semibold text-text/35 uppercase tracking-widest mb-1">
        {category}
      </p>
      <h1 className="text-xl lg:text-5xl font-bold text-text">{title}</h1>
    </div>
    {period && (
      <span className="text-xs font-medium text-text/40 bg-border/60 rounded-full px-3 py-1.5">
        {period}
      </span>
    )}
  </motion.div>
);

export default PageHeader;
