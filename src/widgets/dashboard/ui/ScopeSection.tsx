"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import ChartCard from "./ChartCard";
import { SCOPE_COLORS } from "../constants/scope-colors";
import { SCOPE_LABELS } from "../constants/scope-labels";
import type { SourceRow } from "../utils/get-source-data";

interface Props {
  sourceData: SourceRow[];
}

const ScopeSection = ({ sourceData }: Props) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref}>
      <ChartCard title="스코프별 배출원 상세" inView={inView} delay={0}>
        <div className="space-y-5">
          {[1, 2, 3].map((s, si) => {
            const sources = sourceData.filter((d) => d.scope === s);
            const total = sources.reduce((sum, d) => sum + d.total, 0);
            return (
              <div key={s}>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: SCOPE_COLORS[s] }} />
                  <span className="text-xs font-semibold text-text">{SCOPE_LABELS[s]}</span>
                  <span className="text-xs text-text/40 ml-auto">{total.toLocaleString()} tCO₂</span>
                </div>
                <div className="space-y-2">
                  {sources.map((d, di) => (
                    <div key={d.source} className="flex items-center gap-3">
                      <span className="text-[11px] text-text/50 w-20 shrink-0">{d.source}</span>
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: SCOPE_COLORS[s] }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${(d.total / total) * 100}%` } : { width: 0 }}
                          transition={{ duration: 0.7, delay: si * 0.1 + di * 0.05, ease: [0.4, 0, 0.2, 1] }}
                        />
                      </div>
                      <span className="text-[11px] text-text/40 w-14 text-right shrink-0">{d.total.toLocaleString()} t</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ChartCard>
    </div>
  );
};

export default ScopeSection;
