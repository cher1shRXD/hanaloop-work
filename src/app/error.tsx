"use client";

import { TriangleAlertIcon, RotateCcwIcon } from "lucide-react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
      <div className="w-12 h-12 rounded-2xl bg-red-400/10 flex items-center justify-center">
        <TriangleAlertIcon size={22} className="text-red-400" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-text">오류가 발생했습니다</p>
        <p className="text-xs text-text/40">{error.message || "알 수 없는 오류입니다."}</p>
      </div>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border text-sm font-semibold text-text hover:border-primaryBlue/40 transition-colors"
      >
        <RotateCcwIcon size={14} />
        다시 시도
      </button>
    </div>
  );
}
