import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import OpeningSlide from "./presentation/OpeningSlide";
import CombinedSlide from "./presentation/CombinedSlide";
import RevealSlide from "./presentation/RevealSlide";
import AboutUsSlide from "./presentation/AboutUsSlide";
import RevealTransition from "@/components/presentation/RevealTransition";

export default function Home() {
  const { currentSlide, goToSlide } = usePresentationContext();
  const [isRevealing, setIsRevealing] = useState(false);
  const [showRevealTransition, setShowRevealTransition] = useState(false);
  
  // Handle the reveal transition when moving from slide 1 to 2
  useEffect(() => {
    if (currentSlide === 1 && !isRevealing) {
      // Create handler for the next button click
      const handler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const nextButton = target.closest('.next-button') || target.closest('[data-variant="next"]');
        
        if (nextButton) {
          e.preventDefault();
          e.stopPropagation();
          
          console.log("Next button clicked on combined slide - starting transition");
          
          // Show the transition effect
          setShowRevealTransition(true);
          
          // After a short delay, show the reveal slide content
          setTimeout(() => {
            setIsRevealing(true);
            
            // Move to the next slide
            setTimeout(() => {
              setShowRevealTransition(false);
              
              // This actually updates the slide number
              setTimeout(() => {
                // Use the goToSlide from the outer scope
                goToSlide(2);
              }, 100);
            }, 2000);
          }, 300);
        }
      };
      
      // Add click event to the entire document to catch button clicks
      document.addEventListener('click', handler, true);
      return () => document.removeEventListener('click', handler, true);
    }
  }, [currentSlide, isRevealing, goToSlide]);
  
  return (
    <div className="presentation-container relative w-full min-h-screen bg-corp-dark">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {currentSlide === 0 && <OpeningSlide key="opening" />}
          {currentSlide === 1 && <CombinedSlide key="combined" />}
          {(currentSlide === 2 || isRevealing) && <RevealSlide key="reveal" />}
          {currentSlide === 3 && <AboutUsSlide key="about" />}
        </AnimatePresence>
      </div>
      
      <RevealTransition isRevealing={showRevealTransition} />
      
      {/* Music player removed as requested */}
      
      <div className="absolute bottom-6 left-6 text-xs opacity-50">
        J-Tech Industries © 2050
      </div>
    </div>
  );
}
