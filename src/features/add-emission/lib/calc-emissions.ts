import { GhgEmission } from "@/entities/company/types";
import { EmissionInput } from "../types/emission-input";

// GHG Protocol / IPCC 2006 default — average HGV road freight, kgCO2eq per tonne·km
export const ROAD_FREIGHT_FACTOR = 0.092;

export const parseEncodedFactor = (encoded: string): { source: string; factor: number } => {
  const [source, factorStr] = encoded?.split("::") ?? [];
  return { source, factor: Number(factorStr) };
};

export const calcEmissions = (input: EmissionInput, gridFactor: number): GhgEmission[] => {
  const round = (n: number) => Math.round(n * 1000) / 1000;

  const candidates: GhgEmission[] = [
    {
      yearMonth: input.yearMonth,
      source: input.fuel.source,
      scope: 1,
      // Scope 1 — 연료 직접 연소: kgCO2eq/L × L ÷ 1000
      emissions: round((input.fuel.usage * input.fuel.factor) / 1000),
    },
    {
      yearMonth: input.yearMonth,
      source: "전력",
      scope: 2,
      // Scope 2 — 구매 전력 (location-based): kgCO2eq/kWh × kWh ÷ 1000
      emissions: round((input.electricity.usage * gridFactor) / 1000),
    },
    {
      yearMonth: input.yearMonth,
      source: input.material.source,
      scope: 3,
      // Scope 3 Cat.1 — 원자재: kgCO2eq/kg × kg ÷ 1000
      emissions: round((input.material.weight * input.material.factor) / 1000),
    },
    {
      yearMonth: input.yearMonth,
      source: "물류·운송",
      scope: 3,
      // Scope 3 Cat.4 — 운송: kgCO2eq/(t·km) × t × km ÷ 1000
      emissions: round(
        (input.transport.weight * input.transport.distance * ROAD_FREIGHT_FACTOR) / 1000,
      ),
    },
  ];

  return candidates.filter((e) => e.emissions > 0);
};