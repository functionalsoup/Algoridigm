import { useState } from "react";
import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import NavigationButton from "@/components/presentation/NavigationButton";
import { RotatingMandelaBackground } from "@/components/presentation/RotatingMandelaBackground";
import { Button } from "@/components/ui/button";

export default function RevealSlide() {
  const { goToSlide } = usePresentationContext();
  const [animateOut, setAnimateOut] = useState(false);
  
  const handleAboutClick = () => {
    setAnimateOut(true);
    setTimeout(() => {
      goToSlide(4);
    }, 800);
  };

  return (
    <PresentationLayout slideNumber={3} showNextButton={false}>
      {/* Rotating Mandela background with counterclockwise rotation */}
      <RotatingMandelaBackground 
        direction="counterclockwise"
        speed="slow"
        scale={2}
        opacity={0.1}
        initialDelay={0.5}
      />
      
      <motion.div
        id="reveal-slide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-7xl px-4 py-6"
      >
        {/* Digital Expressionism title with distortion and fragmentation */}
        <motion.div
          className="relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-display font-bold text-center relative"
            initial={{ letterSpacing: "0.05em" }}
            animate={{ letterSpacing: "0.1em" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <motion.span
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-8xl opacity-20 font-bold text-corp-orange blur-sm"
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              FUNCTIONAL
            </motion.span>
            
            <motion.div className="overflow-hidden inline-block">
              <motion.span 
                className="inline-block glitch text-corp-cyan"
                data-text="functional_soup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                functional_soup
              </motion.span>
            </motion.div>
            
            {/* Expressionist slashes - diagonal lines that cut across */}
            <motion.div 
              className="absolute left-1/4 top-1/2 w-1/2 h-px bg-corp-orange opacity-80"
              initial={{ rotate: 0, width: 0 }}
              animate={{ rotate: -15, width: "50%" }}
              transition={{ duration: 1, delay: 1 }}
            />
            
            <motion.div 
              className="absolute right-1/4 top-1/3 w-1/2 h-px bg-corp-cyan opacity-60"
              initial={{ rotate: 0, width: 0 }}
              animate={{ rotate: 20, width: "40%" }}
              transition={{ duration: 1.2, delay: 1.2 }}
            />
          </motion.h2>
          
          <motion.h3 
            className="text-xl md:text-3xl font-display text-center mt-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.span
              animate={{
                color: ["#00FFFF", "#88FF00", "#FF8800", "#0066CC"],
                textShadow: [
                  "0 0 8px rgba(0, 255, 255, 0.7)",
                  "0 0 8px rgba(136, 255, 0, 0.7)",
                  "0 0 8px rgba(255, 136, 0, 0.7)",
                  "0 0 8px rgba(0, 102, 204, 0.7)"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Summer Devised Theatre Workshop
            </motion.span>
          </motion.h3>
        </motion.div>
        
        {/* Workshop panel with digital expressionism style */}
        <motion.div 
          className="relative mt-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Background distortion elements */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 30% 20%, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 70%)",
                "radial-gradient(circle at 70% 80%, rgba(136,255,0,0.3) 0%, rgba(0,0,0,0) 70%)",
                "radial-gradient(circle at 20% 80%, rgba(255,136,0,0.3) 0%, rgba(0,0,0,0) 70%)",
                "radial-gradient(circle at 80% 30%, rgba(0,102,204,0.3) 0%, rgba(0,0,0,0) 70%)"
              ]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
            {/* Left panel - Expressionist asymmetrical layout */}
            <motion.div 
              className="md:col-span-8 md:row-span-2 bg-black/60 backdrop-blur-md rounded-lg border-l-4 border-corp-cyan border p-6 shadow-lg"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                <motion.h3 
                  className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-wider"
                  animate={{
                    color: ["#00FFFF", "#0066CC", "#FF8800"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ALGORIDIGM // MACHINAL
                </motion.h3>
                
                {/* Digital noise line */}
                <motion.div 
                  className="h-0.5 bg-corp-orange/60 w-40 mb-6"
                  initial={{ width: 0 }}
                  animate={{ width: "8rem" }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-base md:text-lg leading-relaxed border-l-2 border-corp-green pl-4 mb-6">
                    We're beginning the process of devising an <span className="text-corp-cyan font-semibold">expressionist adaptation</span> of 
                    Sophie Treadwell's masterpiece MACHINAL. This project explores the <span className="text-corp-orange">fragmentation of self</span> and 
                    the <span className="text-corp-green">distortion of reality</span> through digital and physical performance.
                  </p>
                  
                  <p className="text-base leading-relaxed mb-4">
                    Our approach combines classic expressionist techniques with emerging digital technologies to 
                    create a unique theatrical language. The workshop embraces the principles of 
                    <span className="text-corp-cyan font-semibold"> Digital Expressionism</span> — subjective distortion, 
                    exaggeration, and abstraction in digital space.
                  </p>
                </div>
                
                {/* Contributors sections - Asymmetrical expressionist layout */}
                <div className="mt-6 relative">
                  <h4 className="text-xl font-display font-semibold mb-4 text-corp-cyan">Who We Need</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative overflow-hidden">
                    {/* Digital fragmentation lines */}
                    <motion.div 
                      className="absolute top-1/3 left-0 h-px w-full bg-corp-orange/40 transform -rotate-3"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                    
                    <motion.div 
                      className="absolute top-2/3 left-0 h-px w-full bg-corp-green/40 transform rotate-2"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, delay: 1.2 }}
                    />
                    
                    <div className="md:col-span-2 bg-black/40 backdrop-blur-sm p-4">
                      <h5 className="text-corp-orange font-bold mb-2 uppercase tracking-wider text-sm">Performers</h5>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <span className="text-corp-orange mr-2">→</span>
                          <span>Actors willing to explore digital identity</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-corp-orange mr-2">→</span>
                          <span>Movement artists & dancers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-corp-orange mr-2">→</span>
                          <span>Voice performers & vocalists</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="md:col-span-3 bg-black/40 backdrop-blur-sm p-4 md:ml-4">
                      <h5 className="text-corp-cyan font-bold mb-2 uppercase tracking-wider text-sm">Creators & Technicians</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <ul className="space-y-1">
                          <li className="flex items-start">
                            <span className="text-corp-cyan mr-2">→</span>
                            <span>Digital designers</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-corp-cyan mr-2">→</span>
                            <span>Sound artists</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-corp-cyan mr-2">→</span>
                            <span>Visual artists</span>
                          </li>
                        </ul>
                        <ul className="space-y-1">
                          <li className="flex items-start">
                            <span className="text-corp-cyan mr-2">→</span>
                            <span>Projection specialists</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-corp-cyan mr-2">→</span>
                            <span>Writers & dramaturgs</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-corp-cyan mr-2">→</span>
                            <span>Technical crew</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right panel split into two */}
            <motion.div 
              className="md:col-span-4 bg-black/60 backdrop-blur-md rounded-lg border-l-4 border-corp-orange border p-6 shadow-lg"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="text-lg font-display font-semibold mb-3 text-corp-orange tracking-wider">Important Details</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-corp-orange mr-2 font-bold">→</span>
                  <span>18+ only due to mature themes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-orange mr-2 font-bold">→</span>
                  <span>All experience levels welcome</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-orange mr-2 font-bold">→</span>
                  <span>Multiple roles available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-orange mr-2 font-bold">→</span>
                  <span>Flexible scheduling to accommodate work/life</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="md:col-span-4 bg-black/60 backdrop-blur-md rounded-lg border-l-4 border-corp-green border p-6 shadow-lg"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="text-center">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(0, 255, 255, 0.3)",
                      "0 0 20px rgba(136, 255, 0, 0.3)",
                      "0 0 20px rgba(255, 136, 0, 0.3)",
                      "0 0 20px rgba(0, 102, 204, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="rounded-md overflow-hidden"
                >
                  <Button 
                    id="register-button"
                    onClick={() => window.location.href = "/register"}
                    className="w-full bg-gradient-to-r from-corp-cyan via-corp-green to-corp-orange hover:opacity-90 text-white font-bold py-4 px-6 text-xl uppercase tracking-widest"
                    size="lg"
                  >
                    <motion.span
                      animate={{
                        textShadow: [
                          "0 0 8px rgba(0, 255, 255, 0.7)",
                          "0 0 8px rgba(136, 255, 0, 0.7)",
                          "0 0 8px rgba(255, 136, 0, 0.7)"
                        ]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Register Now
                    </motion.span>
                  </Button>
                </motion.div>
                <p className="mt-4 text-sm opacity-80 font-code">
                  Join our collaborative expressionist process
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* About button with expressionist styling */}
        <motion.div 
          className="text-center mt-12 mb-8 relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {/* Expressionist line */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-corp-cyan opacity-60"
            animate={{ width: ["8rem", "12rem", "8rem"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <NavigationButton onClick={handleAboutClick} variant="about">
            <motion.span
              animate={{
                textShadow: [
                  "0 0 8px rgba(0, 255, 255, 0.5)",
                  "0 0 8px rgba(136, 255, 0, 0.5)",
                  "0 0 8px rgba(255, 136, 0, 0.5)",
                  "0 0 8px rgba(0, 102, 204, 0.5)"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              About functional_soup
            </motion.span>
          </NavigationButton>
        </motion.div>
      </motion.div>
    </PresentationLayout>
  );
}
