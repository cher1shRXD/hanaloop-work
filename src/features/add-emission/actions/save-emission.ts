"use server";

import { CompanyApi } from "@/entities/company/api";
import { CountryApi } from "@/entities/country/api";
import { FIELD_NAMES } from "../constants/field-names";
import { redirect } from "next/navigation";
import { EmissionInput } from "../types/emission-input";
import { parseEncodedFactor, calcEmissions } from "../lib/calc-emissions";

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
