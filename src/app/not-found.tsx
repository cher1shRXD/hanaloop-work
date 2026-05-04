import Link from "next/link";
import { SearchXIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
      <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center">
        <SearchXIcon size={22} className="text-text/40" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-text">페이지를 찾을 수 없습니다</p>
        <p className="text-xs text-text/40">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      </div>
      <Link
        href="/"
        className="px-4 py-2 rounded-xl bg-surface border border-border text-sm font-semibold text-text hover:border-primaryBlue/40 transition-colors"
      >
        대시보드로 돌아가기
      </Link>
    </div>
  );
}
