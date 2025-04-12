import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Context type definition
interface PresentationContextType {
  currentSlide: number;
  goToSlide: (slideIndex: number) => void;
  timerSeconds: number;
  timerSpeed: number;
  startTimer: () => void;
  stopTimer: () => void;
}

// Create context with default values
const PresentationContext = createContext<PresentationContextType>({
  currentSlide: 0,
  goToSlide: () => {},
  timerSeconds: 0,
  timerSpeed: 1000,
  startTimer: () => {},
  stopTimer: () => {},
});

// Provider component
export function PresentationProvider({ children }: { children: ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerSpeed, setTimerSpeed] = useState(1000);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Handle timer updates
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        const newSeconds = prev + 1;

        // Speed up timer based on progress - faster acceleration
        if (currentSlide >= 1) {
          const newSpeed = Math.max(100, 1000 - (newSeconds * 10));
          setTimerSpeed(newSpeed);
        }

        return newSeconds;
      });
    }, timerSpeed);

    setTimerInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSpeed, currentSlide]);

  // Update interval when timer speed changes
  useEffect(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      if (isTimerRunning) {
        const newInterval = setInterval(() => {
          setTimerSeconds(prev => prev + 1);
        }, timerSpeed);
        setTimerInterval(newInterval);
      }
    }
  }, [timerSpeed]);

  // Function to start timer
  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
  };

  // Function to stop timer
  const stopTimer = () => {
    if (isTimerRunning && timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
      setIsTimerRunning(false);
    }
  };

  // Function to navigate to a specific slide
  const goToSlide = (slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex <= 3) { // Updated from 4 to 3 since we removed a slide
      setCurrentSlide(slideIndex);
    }
  };

  return (
    <PresentationContext.Provider
      value={{
        currentSlide,
        goToSlide,
        timerSeconds,
        timerSpeed,
        startTimer,
        stopTimer,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
}

// Hook for using the presentation context
export function usePresentationContext() {
  const context = useContext(PresentationContext);
  if (context === undefined) {
    throw new Error('usePresentationContext must be used within a PresentationProvider');
  }
  return context;
}
