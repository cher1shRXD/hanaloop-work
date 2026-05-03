"use client";

import { BatteryPlusIcon, LayoutDashboardIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";
import { transition } from "../constants/transition";
import HamburgerButton from "./HamburgerButton";
import Divider from "@/shared/ui/Divider";

const ROUTES = [
  { label: "탄소 회계 대시보드", href: "/", icon: LayoutDashboardIcon },
  { label: "이달의 탄소 배출량 추가", href: "/input", icon: BatteryPlusIcon },
];

const Sidebar = () => {
  const [minimized, setMinimized] = useState(true);

  return (
    <aside className="fixed top-0 left-0 h-screen p-4">
      <motion.div
        animate={{ width: minimized ? 56 : 280 }}
        transition={transition}
        className="h-full bg-surface/50 rounded-2xl p-2 flex flex-col gap-2 items-start overflow-hidden"
      >
        <HamburgerButton
          open={!minimized}
          onClick={() => setMinimized((prev) => !prev)}
        />
        <Divider />
        <div className="w-full flex flex-col">
          {ROUTES.map((item) => (
            <MenuItem {...item} minimized={minimized} key={item.href} />
          ))}
        </div>
      </motion.div>
    </aside>
  );
};

export default Sidebar;
