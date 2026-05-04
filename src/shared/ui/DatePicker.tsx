"use client";

import { InputHTMLAttributes, useRef } from "react";
import { CalendarIcon } from "lucide-react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const DatePicker = ({
  label,
  error,
  className = "",
  containerClassName = "",
  ...props
}: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      {label && (
        <label className="text-[11px] font-semibold text-text/40 uppercase tracking-widest ml-1">
          {label}
        </label>
      )}

      <div
        className="relative flex items-center"
        onClick={() => ref.current?.showPicker()}
      >
        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-text/30 pointer-events-none z-10">
          <CalendarIcon size={18} />
        </div>

        <input
          ref={ref}
          type="date"
          className={`
              w-full h-11 bg-surface border border-border rounded-xl px-4 pl-10 text-sm text-text transition-all
              placeholder:text-text/25 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue
              ${error ? "border-red-400 focus:ring-red-400/10 focus:border-red-400" : ""}
              ${className}
            `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs text-red-400 font-medium ml-1">{error}</p>
      )}
    </div>
  );
};

export default DatePicker;
