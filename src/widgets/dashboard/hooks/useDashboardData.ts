"use client";

import { useMemo } from "react";
import { Company } from "@/entities/company/types";
import { SCOPE_LABELS } from "../constants/scope-labels";
import { getMonthlyData } from "../utils/get-monthly-data";
import { getCompanyData } from "../utils/get-company-data";
import { getSourceData } from "../utils/get-source-data";
import { getScopeData } from "../utils/get-scope-data";
import { getLatestMonthSummary } from "../utils/get-latest-month-summary";

export const useDashboardData = (companies: Company[]) =>
  useMemo(() => {
    const monthlyData = getMonthlyData(companies);
    const companyData = getCompanyData(companies);
    const sourceData  = getSourceData(companies);
    const latestMonth = getLatestMonthSummary(companies);
    const scopeData   = getScopeData(companies).map((d) => ({ ...d, name: SCOPE_LABELS[d.scope] }));

    const grandTotal = companyData.reduce((s, c) => s + c.total, 0);
    const scopeTotal = scopeData.reduce((s, d) => s + d.total, 0);
    const topSource  = sourceData[0];
    const scope1Pct  = scopeTotal > 0
      ? Math.round(((scopeData.find((d) => d.scope === 1)?.total ?? 0) / scopeTotal) * 100)
      : 0;

    return { monthlyData, companyData, sourceData, scopeData, latestMonth, grandTotal, scopeTotal, topSource, scope1Pct };
  }, [companies]);
