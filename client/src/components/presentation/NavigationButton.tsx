import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type NavigationButtonProps = {
  onClick: () => void;
  children: ReactNode;
  variant: "prev" | "next" | "begin" | "about";
  disabled?: boolean;
};

export function NavigationButton({ onClick, children, variant, disabled = false }: NavigationButtonProps) {
  const getStyles = () => {
    switch (variant) {
      case "prev":
        return "border border-corp-blue/70 text-corp-blue neo-button bg-corp-blue/10";
      case "next":
        return "border border-corp-cyan/70 text-corp-cyan neo-button bg-corp-cyan/10";
      case "begin":
        return "bg-gradient-to-r from-corp-cyan via-corp-blue to-corp-magenta text-white font-bold px-6 sm:px-12 py-4 sm:py-5 text-xl sm:text-2xl uppercase tracking-wider sm:tracking-[0.5em] letter-spacing-wide text-shadow-glow";
      case "about":
        return "border border-corp-magenta/70 text-corp-magenta neo-button bg-corp-magenta/10 px-8 py-4 text-lg";
      default:
        return "";
    }
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-md font-code tracking-wider backdrop-blur-sm
        transition-all duration-300 ease-in-out
        ${getStyles()} 
        ${variant === "next" ? "next-button" : variant === "prev" ? "prev-button" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
      whileHover={!disabled ? { 
        scale: 1.05, 
        boxShadow: variant === "begin" 
          ? "0 0 30px rgba(255, 0, 245, 0.5)" 
          : variant === "next" 
            ? "0 0 20px rgba(0, 240, 255, 0.4)"
            : variant === "prev"
              ? "0 0 15px rgba(0, 101, 255, 0.3)"
              : "0 0 20px rgba(255, 0, 245, 0.4)"
      } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      data-variant={variant}
    >
      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
}

export default NavigationButton;
