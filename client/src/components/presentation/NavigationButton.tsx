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
        return "inline-block bg-gradient-to-r from-corp-magenta via-corp-cyan to-corp-magenta text-white px-8 sm:px-10 py-4 sm:py-4 rounded-md text-lg sm:text-xl font-bold uppercase tracking-widest transition-all duration-300 border-2 border-corp-magenta/50 backdrop-blur-sm shadow-lg shadow-corp-magenta/40";
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
              : "0 0 40px rgba(255, 0, 245, 0.7), 0 0 20px rgba(0, 255, 255, 0.5)"
      } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      data-variant={variant}
    >
      {variant === "about" ? (
        <motion.span 
          className="relative z-10"
          animate={{
            textShadow: [
              "0 0 5px rgba(255, 255, 255, 0.5)",
              "0 0 15px rgba(255, 0, 245, 0.8)",
              "0 0 5px rgba(0, 255, 255, 0.5)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {children}
        </motion.span>
      ) : (
        <span className="relative z-10">
          {children}
        </span>
      )}
    </motion.button>
  );
}

export default NavigationButton;
