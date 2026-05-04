"use client";

import { TriangleAlertIcon, RotateCcwIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CompanyDetailError({ error, reset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
      <div className="w-12 h-12 rounded-2xl bg-red-400/10 flex items-center justify-center">
        <TriangleAlertIcon size={22} className="text-red-400" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-text">회사 데이터를 불러올 수 없습니다</p>
        <p className="text-xs text-text/40">{error.message || "잠시 후 다시 시도해주세요."}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border text-sm font-semibold text-text hover:border-primaryBlue/40 transition-colors"
        >
          <RotateCcwIcon size={14} />
          다시 시도
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border text-sm font-semibold text-text/60 hover:border-primaryBlue/40 transition-colors"
        >
          <ArrowLeftIcon size={14} />
          대시보드
        </Link>
      </div>
    </div>
  );
}
