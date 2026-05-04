"use client";

import Link from "next/link";
import { Company } from "@/entities/company/types";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useDrawerStore } from "../stores/useDrawerStore";
import { colors } from "@/shared/config/tokens";

interface Props {
  data: Company;
}

const CompanyItem = ({ data }: Props) => {
  const { minimized } = useDrawerStore();
  const pathname = usePathname();
  const path = `/companies/${data.id}`;
  const isCurrentPath = pathname === path;

  return (
    <Link href={path} className="w-full h-10">
      <div className="w-full h-full flex items-center p-2 rounded-xl hover:bg-surface group">
        <div 
          className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors overflow-hidden"
          style={{ 
            backgroundColor: isCurrentPath ? `${colors.primaryBlue}15` : `${colors.text}10`,
            border: `1px solid ${isCurrentPath ? `${colors.primaryBlue}30` : `${colors.text}15`}`
          }}
        >
          <span 
            className="text-xl font-bold transition-colors"
            style={{ color: isCurrentPath ? colors.primaryBlue : colors.text }}
          >
            {data.name[0]}
          </span>
        </div>
        <motion.div
          initial={{ width: minimized ? 0 : 200, opacity: minimized ? 0 : 1, paddingLeft: minimized ? 0 : 8 }}
          animate={{ width: minimized ? 0 : 200, opacity: minimized ? 0 : 1, paddingLeft: minimized ? 0 : 8 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden shrink-0"
        >
          <span className={`${isCurrentPath ? "text-primary-blue" : "text-text"} text-nowrap text-sm font-semibold`}>
            {data.name}
          </span>
        </motion.div>
      </div>
    </Link>
  )
}

export default CompanyItem