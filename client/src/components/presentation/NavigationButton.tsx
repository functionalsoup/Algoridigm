import { Button } from "@/components/ui/button";
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
        return "border-2 border-corp-blue text-corp-blue hover:bg-corp-blue hover:text-corp-dark";
      case "next":
        return "border-2 border-corp-cyan text-corp-cyan hover:bg-corp-cyan hover:text-corp-dark";
      case "begin":
        return "border-2 border-corp-cyan text-corp-cyan hover:bg-corp-cyan hover:text-corp-dark px-8 py-6 text-lg transform hover:scale-105";
      case "about":
        return "border-2 border-corp-magenta text-corp-magenta hover:bg-corp-magenta hover:text-corp-dark px-8 py-6 text-lg transform hover:scale-105";
      default:
        return "";
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`bg-transparent transition-all ${getStyles()}`}
      variant="ghost"
    >
      {children}
    </Button>
  );
}

export default NavigationButton;
