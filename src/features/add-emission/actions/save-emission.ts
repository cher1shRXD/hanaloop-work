"use server";

import { CompanyApi } from "@/entities/company/api";
import { CountryApi } from "@/entities/country/api";
import { GhgEmission } from "@/entities/company/types";
import { FIELD_NAMES } from "../constants/field-names";
import { redirect } from "next/navigation";
import { EmissionInput } from "../types/emission-input";

// GHG Protocol / IPCC 2006 default — average HGV road freight, kgCO2eq per tonne·km
const ROAD_FREIGHT_FACTOR = 0.092;

const parseEncodedFactor = (encoded: string): { source: string; factor: number } => {
  const [source, factorStr] = encoded?.split("::") ?? [];
  return { source, factor: Number(factorStr) };
};

const parseForm = (formData: FormData): EmissionInput => {
  const fuel = parseEncodedFactor(formData.get(FIELD_NAMES.fuelType) as string);
  const material = parseEncodedFactor(formData.get(FIELD_NAMES.materialType) as string);
  const startDate = formData.get(FIELD_NAMES.processingStartDate) as string;

  return {
    companyId: formData.get(FIELD_NAMES.company) as string,
    yearMonth: startDate?.slice(0, 7) ?? "",
    fuel: { ...fuel, usage: Number(formData.get(FIELD_NAMES.fuelUsage)) },
    electricity: { usage: Number(formData.get(FIELD_NAMES.electricityUsage)) },
    material: { ...material, weight: Number(formData.get(FIELD_NAMES.materialWeight)) },
    transport: {
      weight: Number(formData.get(FIELD_NAMES.transportWeight)),
      distance: Number(formData.get(FIELD_NAMES.transportDistance)),
    },
  };
};

const calcEmissions = (input: EmissionInput, gridFactor: number): GhgEmission[] => {
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

type ActionState = { error: string } | null;

export const saveEmission = async (_: ActionState, formData: FormData): Promise<ActionState> => {
  const input = parseForm(formData);

  try {
    const company = await CompanyApi.getById(input.companyId);
    if (!company) return { error: "선택한 회사를 찾을 수 없습니다." };

    const country = await CountryApi.getByCode(company.country);
    const gridFactor = country?.gridEmissionFactor ?? 0;

    const emissions = calcEmissions(input, gridFactor);
    await Promise.all(emissions.map((e) => CompanyApi.addEmission(input.companyId, e)));
  } catch {
    return { error: "저장에 실패했습니다. 다시 시도해주세요." };
  }

  redirect("/");
};
