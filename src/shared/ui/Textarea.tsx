"use client";

import { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Textarea = ({
  label,
  error,
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
      
      <textarea
        className={`
          w-full min-h-30 bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text transition-all
          placeholder:text-text/25 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue
          resize-none
          ${error ? "border-red-400 focus:ring-red-400/10 focus:border-red-400" : ""}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-xs text-red-400 font-medium ml-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textarea;
