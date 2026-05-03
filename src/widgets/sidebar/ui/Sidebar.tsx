"use client";

import { BatteryPlusIcon, LayoutDashboardIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useDrawerStore } from "../stores/useDrawerStore";
import { transition } from "../constants/transition";
import HamburgerButton from "./HamburgerButton";
import Divider from "@/shared/ui/Divider";
import MenuItem from "./MenuItem";
import CompanyList from "./CompanyList";

import { useMatchMedia } from "@/shared/hooks/useMatchMedia";
import { AnimatePresence } from "framer-motion";

const ROUTES = [
  { label: "PCF 배출량 분", href: "/", icon: LayoutDashboardIcon },
  { label: "이달의 탄소 배출량 추가", href: "/input", icon: BatteryPlusIcon },
];

import { MenuIcon } from "lucide-react";

const Sidebar = () => {
  const isMobile = useMatchMedia(768);
  const { minimized, toggleMinimized, setMinimized } = useDrawerStore();

  const sidebarContent = (
    <motion.div
      animate={{ width: isMobile ? 280 : (minimized ? 56 : 280) }}
      transition={transition}
      className={`h-full bg-surface/80 backdrop-blur-md rounded-2xl p-2 flex flex-col gap-2 items-start overflow-hidden border border-border/50 shadow-xl`}
    >
      <HamburgerButton
        open={isMobile ? true : !minimized}
        onClick={toggleMinimized}
      />
      <Divider />
      <div className="w-full flex flex-col">
        {ROUTES.map((item) => (
          <MenuItem {...item} minimized={isMobile ? false : minimized} key={item.href} />
        ))}
      </div>
      <Divider />
      <div className="w-full flex flex-col overflow-y-auto">
        <CompanyList />
      </div>
    </motion.div>
  );

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setMinimized(false)}
          className="fixed bottom-2 left-2 w-14 h-14 bg-surface border border-border text-white rounded-full shadow-2xl flex items-center justify-center z-40 active:scale-95 transition-transform"
        >
          <MenuIcon size={24} />
        </button>
      )}

      <AnimatePresence>
        {isMobile ? (
          !minimized && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMinimized(true)}
                className="fixed inset-0 bg-background/40 backdrop-blur-sm z-40"
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 h-screen p-4 z-50"
              >
                {sidebarContent}
              </motion.aside>
            </>
          )
        ) : (
          <aside className="fixed top-0 left-0 h-screen p-4 z-30">
            {sidebarContent}
          </aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
