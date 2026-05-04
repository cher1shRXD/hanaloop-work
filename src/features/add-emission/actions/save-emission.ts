"use server";

import { CompanyApi } from "@/entities/company/api";
import { CountryApi } from "@/entities/country/api";
import { FIELD_NAMES } from "../constants/field-names";
import { redirect } from "next/navigation";

// GHG Protocol / IPCC 2006 default — average HGV road freight, kgCO2eq per tonne·km
const ROAD_FREIGHT_FACTOR = 0.092;

export const saveEmission = async (_: unknown, formData: FormData) => {
  const companyId = formData.get(FIELD_NAMES.company) as string;
  const materialType = formData.get(FIELD_NAMES.materialType) as string;
  const fuelType = formData.get(FIELD_NAMES.fuelType) as string;

  const materialWeight = Number(formData.get(FIELD_NAMES.materialWeight)); // kg
  const fuelUsage = Number(formData.get(FIELD_NAMES.fuelUsage)); // L (or m³ for natural gas)
  const electricityUsage = Number(formData.get(FIELD_NAMES.electricityUsage)); // kWh
  const transportDistance = Number(formData.get(FIELD_NAMES.transportDistance)); // km
  const transportWeight = Number(formData.get(FIELD_NAMES.transportWeight)); // t
  const startDate = formData.get(FIELD_NAMES.processingStartDate) as string; // "YYYY-MM-DD"

  // Select option values encode the emission factor: "source::kgCO2eq_per_unit"
  const [materialSource, materialFactorStr] = materialType?.split("::") ?? [];
  const [fuelSource, fuelFactorStr] = fuelType?.split("::") ?? [];
  const materialFactor = Number(materialFactorStr); // kgCO2eq / kg
  const fuelFactor = Number(fuelFactorStr); // kgCO2eq / L

  // Resolve country-specific Scope 2 electricity grid emission factor
  const company = await CompanyApi.getById(companyId);
  const country = company ? await CountryApi.getByCode(company.country) : undefined;
  const gridFactor = country?.gridEmissionFactor ?? 0; // kgCO2eq / kWh

  // ─── tCO2eq = Σ(quantity × factor) ÷ 1000 ──────────────────────────────

  // Scope 1 — 연료 직접 연소 (IPCC 2006 Vol.2, Tier 1)
  const scope1Tco2eq = Math.round((fuelUsage * fuelFactor) / 1000 * 1000) / 1000;

  // Scope 2 — 구매 전력 (location-based, 국가 평균 계통 배출계수)
  const scope2Tco2eq = Math.round((electricityUsage * gridFactor) / 1000 * 1000) / 1000;

  // Scope 3 Cat.1 — 구매한 원자재
  const scope3MaterialTco2eq = Math.round((materialWeight * materialFactor) / 1000 * 1000) / 1000;

  // Scope 3 Cat.4 — 물류·운송
  const scope3TransportTco2eq =
    Math.round((transportWeight * transportDistance * ROAD_FREIGHT_FACTOR) / 1000 * 1000) / 1000;

  // yearMonth 파싱: "YYYY-MM-DD" → "YYYY-MM"
  const yearMonth = startDate?.slice(0, 7) ?? "";

  await Promise.all([
    scope1Tco2eq > 0 &&
      CompanyApi.addEmission(companyId, {
        yearMonth,
        source: fuelSource,
        scope: 1,
        emissions: scope1Tco2eq,
      }),
    scope2Tco2eq > 0 &&
      CompanyApi.addEmission(companyId, {
        yearMonth,
        source: "전력",
        scope: 2,
        emissions: scope2Tco2eq,
      }),
    scope3MaterialTco2eq > 0 &&
      CompanyApi.addEmission(companyId, {
        yearMonth,
        source: materialSource,
        scope: 3,
        emissions: scope3MaterialTco2eq,
      }),
    scope3TransportTco2eq > 0 &&
      CompanyApi.addEmission(companyId, {
        yearMonth,
        source: "물류·운송",
        scope: 3,
        emissions: scope3TransportTco2eq,
      }),
  ]);

  redirect("/");
};
