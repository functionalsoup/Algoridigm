import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import Timer from "./Timer";
import NavigationButton from "./NavigationButton";
import { ErrorMessages } from "./BackgroundElements";

type PresentationLayoutProps = {
  children: React.ReactNode;
  showPrevButton?: boolean;
  showNextButton?: boolean;
  slideNumber?: number;
  showErrors?: boolean;
};

export function PresentationLayout({
  children,
  showPrevButton = true,
  showNextButton = true,
  slideNumber = 0,
  showErrors = false,
}: PresentationLayoutProps) {
  const { currentSlide, goToSlide } = usePresentationContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const isActive = currentSlide === slideNumber;

  return (
    <motion.div
      ref={containerRef}
      className="slide p-6 sm:p-8 md:p-12 lg:p-16 relative w-full h-full overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      exit={{ opacity: 0 }}
      style={{ pointerEvents: isActive ? "all" : "none" }}
    >
      <div className="absolute top-6 sm:top-8 right-6 sm:right-8 z-50">
        <Timer />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Bacteria animation removed as requested */}
        
        {showErrors && (
          <ErrorMessages 
            isActive={isActive && slideNumber === 2} 
            containerRef={containerRef} 
          />
        )}
      </div>

      <div className="max-w-5xl mx-auto z-10 relative">
        {children}
      </div>

      <div className="flex justify-between mt-10 sm:mt-12 md:mt-14 max-w-5xl mx-auto pt-4 sm:pt-6">
        <div className="flex-1">
          {showPrevButton && (
            <NavigationButton
              onClick={() => goToSlide(slideNumber - 1)}
              disabled={slideNumber <= 1}
              variant="prev"
            >
              Previous
            </NavigationButton>
          )}
        </div>
        
        <div className="flex-1 flex justify-end">
          {showNextButton && (
            <NavigationButton
              onClick={() => goToSlide(slideNumber + 1)}
              variant="next"
            >
              Next
            </NavigationButton>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default PresentationLayout;
