"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: Props) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer";
  
  const variantStyles = {
    primary: "bg-primary-blue text-white hover:bg-primary-blue/90 shadow-sm",
    secondary: "bg-surface border border-border text-text hover:bg-border/30",
    outline: "bg-transparent border border-primary-blue text-primary-blue hover:bg-primary-blue/5",
    ghost: "bg-transparent text-text hover:bg-surface",
  };

  const sizeStyles = {
    sm: "h-9 px-3 text-xs gap-1.5",
    md: "h-11 px-5 text-sm gap-2",
    lg: "h-13 px-7 text-base gap-2.5",
  };

  return (
    <motion.button
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className={`w-5 h-5 border-2 ${variant === 'primary' ? 'border-white/30 border-t-white' : 'border-primary-blue/30 border-t-primary-blue'} rounded-full animate-spin`} />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;
