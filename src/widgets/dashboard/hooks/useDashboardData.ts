"use client";

import { useMemo } from "react";
import { Company } from "@/entities/company/types";
import { processDashboardData } from "../utils/process-dashboard-data";

export const useDashboardData = (companies: Company[], yearMonth?: string) =>
  useMemo(() => processDashboardData(companies, yearMonth), [companies, yearMonth]);
