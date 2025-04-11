import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import OpeningSlide from "./presentation/OpeningSlide";
import TechnologySlide from "./presentation/TechnologySlide";
import CEOSlide from "./presentation/CEOSlide";
import RevealSlide from "./presentation/RevealSlide";
import AboutUsSlide from "./presentation/AboutUsSlide";
import RevealTransition from "@/components/presentation/RevealTransition";

export default function Home() {
  const { currentSlide } = usePresentationContext();
  const [isRevealing, setIsRevealing] = useState(false);
  const [showRevealTransition, setShowRevealTransition] = useState(false);
  
  // Handle the reveal transition when moving from slide 2 to 3
  useEffect(() => {
    if (currentSlide === 2 && !isRevealing) {
      const handler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('.next-button')) {
          e.preventDefault();
          setShowRevealTransition(true);
          
          setTimeout(() => {
            setIsRevealing(true);
            setTimeout(() => {
              setShowRevealTransition(false);
            }, 2000);
          }, 0);
        }
      };
      
      document.addEventListener('click', handler);
      return () => document.removeEventListener('click', handler);
    }
  }, [currentSlide, isRevealing]);
  
  return (
    <div className="presentation-container relative w-screen h-screen overflow-hidden bg-corp-dark">
      <AnimatePresence mode="wait">
        {currentSlide === 0 && <OpeningSlide key="opening" />}
        {currentSlide === 1 && <TechnologySlide key="technology" />}
        {currentSlide === 2 && <CEOSlide key="ceo" />}
        {(currentSlide === 3 || isRevealing) && <RevealSlide key="reveal" />}
        {currentSlide === 4 && <AboutUsSlide key="about" />}
      </AnimatePresence>
      
      <RevealTransition isRevealing={showRevealTransition} />
      
      <div className="absolute bottom-6 left-6 text-xs opacity-50">
        J-Tech Industries © 2050
      </div>
    </div>
  );
}
