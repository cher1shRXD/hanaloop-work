"use client";

import { SelectHTMLAttributes, ReactNode } from "react";
import { ChevronDownIcon } from "lucide-react";

interface Option {
  label: string;
  value: string | number;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  options: Option[];
  containerClassName?: string;
}

const Select = ({
  label,
  error,
  leftIcon,
  options,
  className = "",
  containerClassName = "",
  ...props
}: Props) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      {label && (
        <label className="text-[11px] font-semibold text-text/40 uppercase tracking-widest ml-1">
          {label}
        </label>
      )}
      
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-text/30 pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <select
          className={`
            w-full h-11 bg-surface border border-border rounded-xl px-4 text-sm text-text transition-all appearance-none cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue
            ${leftIcon ? "pl-10" : ""}
            ${error ? "border-red-400 focus:ring-red-400/10 focus:border-red-400" : ""}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute right-3 text-text/30 pointer-events-none">
          <ChevronDownIcon size={16} />
        </div>
      </div>
      
      {error && (
        <p className="text-xs text-red-400 font-medium ml-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
