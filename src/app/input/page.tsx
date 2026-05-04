"use client";

import DurationInput from "@/features/add-emission/ui/DurationInput";
import ElectricityInput from "@/features/add-emission/ui/ElectricityInput";
import FuelInput from "@/features/add-emission/ui/FuelInput";
import MaterialInput from "@/features/add-emission/ui/MaterialInput";
import TransportInput from "@/features/add-emission/ui/TransportInput";
import Submit from "@/features/add-emission/ui/Submit";
import PageHeader from "@/shared/ui/PageHeader";
import { useActionState } from "react";
import { saveEmission } from "@/features/add-emission/actions/save-emission";
import CompanyInput from "@/features/add-emission/ui/CompanyInput";

export default function InputPage() {
  const [state, action, isPending] = useActionState(saveEmission, null);
  
  return (
    <form action={action} className="w-full max-w-lg mx-auto md:h-svh flex flex-col gap-6 justify-center">
      <PageHeader category="Add Emission" title="이달의 탄소 배출량 추가" />
      <CompanyInput />
      <MaterialInput />
      <FuelInput />
      <ElectricityInput />
      <TransportInput />
      <DurationInput />
      <Submit isLoading={isPending} />
    </form>
  );
}
