import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import videoSource from "@assets/Video.mp4";
import { RotatingSymbolsBackground } from "./RotatingSymbolsBackground";

interface VideoBackgroundProps {
  children?: React.ReactNode;
  symbolsOpacity?: number;
  symbolCount?: number;
}

export function VideoBackground({ 
  children, 
  symbolsOpacity = 0.3, // Default 30% opacity for rotating symbols
  symbolCount = 20
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  // Handle video loading
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleVideoLoaded = () => {
        setIsVideoLoaded(true);
      };
      
      videoElement.addEventListener('loadeddata', handleVideoLoaded);
      
      return () => {
        videoElement.removeEventListener('loadeddata', handleVideoLoaded);
      };
    }
  }, []);
  
  // Start playing the video once it's loaded
  useEffect(() => {
    if (isVideoLoaded && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error playing video:", error);
      });
    }
  }, [isVideoLoaded]);
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Video Background - Fullscreen */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
      
      {/* Rotating Symbols with custom opacity */}
      <div className="absolute inset-0 z-10">
        <RotatingSymbolsBackground 
          symbolCount={symbolCount} 
          isActive={true} 
          customOpacity={symbolsOpacity}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}