"use client";

import { colors } from "@/shared/config/tokens";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FC } from "react";

interface Props {
  label: string;
  href: string;
  icon: FC<{ color: string, strokeWidth: number }>;
  minimized: boolean;
}

const MenuItem = ({ label, href, icon, minimized }: Props) => {
  const Icon = icon;
  const pathname = usePathname();
  const isCurrentPath = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link href={href} className="w-full h-10">
      <div className="w-full h-full flex items-center p-2 rounded-xl hover:bg-surface">
        <div className="shrink-0">
          <Icon color={isCurrentPath ? colors.primaryBlue : colors.text} strokeWidth={1.5} />
        </div>
        <motion.div
          initial={{ width: minimized ? 0 : 220, opacity: minimized ? 0 : 1, paddingLeft: minimized ? 0 : 8 }}
          animate={{ width: minimized ? 0 : 220, opacity: minimized ? 0 : 1, paddingLeft: minimized ? 0 : 8 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden shrink-0"
        >
          <span className={`${isCurrentPath ? "text-primary-blue" : "text-text"} text-nowrap text-sm font-semibold`}>
            {label}
          </span>
        </motion.div>
      </div>
    </Link>
  );
};

export default MenuItem;
