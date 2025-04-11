import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import Timer from "./Timer";
import NavigationButton from "./NavigationButton";
import { Bacteria, ErrorMessages } from "./BackgroundElements";

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
  const { currentSlide, goToSlide, timerSeconds, timerSpeed } = usePresentationContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const isActive = currentSlide === slideNumber;

  const maxBacteria = 500;
  const bacteriaCount = Math.min(timerSeconds * 5, maxBacteria);

  return (
    <motion.div
      ref={containerRef}
      className="slide p-16 relative w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      exit={{ opacity: 0 }}
      style={{ pointerEvents: isActive ? "all" : "none" }}
    >
      <div className="absolute top-6 right-6">
        <Timer />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Bacteria 
          count={bacteriaCount} 
          maxBacteria={maxBacteria} 
          containerRef={containerRef}
          isActive={isActive && slideNumber > 0}
        />
        
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

      <div className="flex justify-between mt-12 max-w-5xl mx-auto">
        {showPrevButton && (
          <NavigationButton
            onClick={() => goToSlide(slideNumber - 1)}
            disabled={slideNumber <= 1}
            variant="prev"
          >
            Previous
          </NavigationButton>
        )}
        
        {/* Spacer for when there's only one button */}
        {showPrevButton && !showNextButton && <div></div>}
        
        {showNextButton && (
          <NavigationButton
            onClick={() => goToSlide(slideNumber + 1)}
            variant="next"
          >
            Next
          </NavigationButton>
        )}
      </div>
    </motion.div>
  );
}

export default PresentationLayout;
