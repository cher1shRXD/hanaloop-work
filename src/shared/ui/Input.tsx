"use client";

import { InputHTMLAttributes, ReactNode } from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  containerClassName?: string;
}

const Input = ({
  label,
  error,
  prefix,
  suffix,
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
        {prefix && (
          <div className="absolute left-3 text-text/30 pointer-events-none">
            {prefix}
          </div>
        )}
        
        <input
          className={`
            w-full h-11 bg-surface border border-border rounded-xl px-4 text-sm text-text transition-all
            placeholder:text-text/25 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue
            ${prefix ? "pl-10" : ""}
            ${suffix ? "pr-10" : ""}
            ${error ? "border-red-400 focus:ring-red-400/10 focus:border-red-400" : ""}
            ${className}
          `}
          {...props}
        />
        
        {suffix && (
          <div className="absolute right-3 text-text/30 pointer-events-none">
            {suffix}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-xs text-red-400 font-medium ml-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
