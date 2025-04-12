import { useState } from "react";
import { motion } from "framer-motion";
import { usePresentationContext } from "@/lib/presentationContext";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import { RotatingMandelaBackground } from "@/components/presentation/RotatingMandelaBackground";
import { Button } from "@/components/ui/button";
import { HiMail } from "react-icons/hi";

export default function AboutUsSlide() {
  const { goToSlide } = usePresentationContext();
  const [animateOut, setAnimateOut] = useState(false);
  const [showContactTooltip, setShowContactTooltip] = useState(false);
  
  const handleRegisterClick = () => {
    setAnimateOut(true);
    setTimeout(() => {
      window.location.href = "/register";
    }, 500);
  };
  
  return (
    <PresentationLayout slideNumber={4} showNextButton={false}>
      {/* Rotating Mandela background with fast clockwise rotation */}
      <RotatingMandelaBackground 
        direction="clockwise"
        speed="fast"
        scale={1.5}
        opacity={0.08}
        initialDelay={0.3}
      />
      
      <motion.div
        key="about-slide-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={`relative z-10 mx-auto max-w-7xl px-4 py-6 ${animateOut ? 'bg-corp-burnt-orange bg-opacity-10' : ''}`}
      >
        {/* Digital Expressionist Title with fragmentation effects */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Expressionist background elements */}
          <motion.div 
            className="absolute top-0 left-1/4 h-px w-1/2 bg-corp-green opacity-50 transform -rotate-3"
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
          
          <motion.div 
            className="absolute bottom-0 right-1/4 h-px w-1/2 bg-corp-orange opacity-50 transform rotate-3"
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 1.2, delay: 0.7 }}
          />
          
          {/* Main title with digital expressionist treatment */}
          <h2 className="text-4xl md:text-6xl font-display font-bold text-center relative overflow-visible">
            <motion.span
              className="absolute -top-6 -left-4 text-6xl md:text-8xl opacity-10 font-bold text-corp-cyan blur-sm"
              animate={{ opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              f_s
            </motion.span>
            
            <motion.span
              animate={{
                textShadow: [
                  "0 0 15px rgba(0, 255, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.3)",
                  "0 0 15px rgba(136, 255, 0, 0.6), 0 0 30px rgba(136, 255, 0, 0.3)",
                  "0 0 15px rgba(255, 136, 0, 0.6), 0 0 30px rgba(255, 136, 0, 0.3)",
                  "0 0 15px rgba(0, 102, 204, 0.6), 0 0 30px rgba(0, 102, 204, 0.3)"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative inline-block"
            >
              <span className="text-corp-cyan">F</span>
              <span className="text-corp-cyan">u</span>
              <span className="text-corp-cyan">n</span>
              <span className="text-corp-cyan">c</span>
              <span className="text-corp-cyan">t</span>
              <span className="text-corp-cyan">i</span>
              <span className="text-corp-cyan">o</span>
              <span className="text-corp-cyan">n</span>
              <span className="text-corp-cyan">a</span>
              <span className="text-corp-cyan">l</span>
              <span className="text-white"> </span>
              <span className="text-corp-orange">S</span>
              <span className="text-corp-orange">o</span>
              <span className="text-corp-orange">u</span>
              <span className="text-corp-orange">p</span>
            </motion.span>
          </h2>
          
          {/* Fragmented subtitle with digital expressionist styling */}
          <motion.div
            className="relative mt-4 flex justify-center items-center overflow-visible"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div 
              className="h-px w-24 bg-corp-green opacity-60 mr-4"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            
            <motion.p 
              className="text-lg md:text-xl italic font-display tracking-wider"
              animate={{
                color: ["#00FFFF", "#88FF00", "#FF8800", "#0066CC"]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              A Digital Expressionist Collective
            </motion.p>
            
            <motion.div 
              className="h-px w-24 bg-corp-orange opacity-60 ml-4"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.div>
        </motion.div>
        
        {/* Main content with digital expressionism styling */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Background distortion elements */}
          <motion.div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(circle at 20% 30%, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 50%)",
                "radial-gradient(circle at 70% 60%, rgba(136,255,0,0.3) 0%, rgba(0,0,0,0) 50%)",
                "radial-gradient(circle at 40% 80%, rgba(255,136,0,0.3) 0%, rgba(0,0,0,0) 50%)",
                "radial-gradient(circle at 80% 20%, rgba(0,102,204,0.3) 0%, rgba(0,0,0,0) 50%)"
              ]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Introductory quote - expressionist fragmentation */}
          <motion.div 
            className="max-w-4xl mx-auto mb-10 relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-md p-6 border-l-4 border-r-4 border-l-corp-cyan border-r-corp-orange relative overflow-hidden">
              {/* Digital noise line */}
              <motion.div 
                className="absolute top-1/2 left-0 h-0.5 w-full bg-corp-green/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
              
              <p className="text-base md:text-lg italic text-center relative z-10">
                Inspired by the revolutionary spirit of the Bauhaus, the critical engagement of Epic Theatre, 
                and the <span className="text-corp-cyan">digital fragmentation</span> of contemporary media. 
                We distort the expected to reveal the <span className="text-corp-orange">expressive truth</span> beyond reality.
              </p>
            </div>
          </motion.div>
          
          {/* Core principles - Asymmetric digital expressionist layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
            <motion.div 
              className="md:col-span-5 md:row-span-1 bg-black/50 backdrop-blur-sm p-6 border-l-4 border-corp-cyan rounded-tr-md"
              initial={{ x: -20, opacity: 0, skewX: "-1deg" }}
              animate={{ x: 0, opacity: 1, skewX: "0deg" }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <motion.h3 
                className="text-xl md:text-2xl font-display font-semibold mb-4 relative"
                animate={{
                  color: ["#00FFFF", "#0066CC", "#00FFFF"]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Digital Expressionist Principles
                
                <motion.div 
                  className="absolute -bottom-2 left-0 h-0.5 w-20 bg-corp-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: "5rem" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </motion.h3>
              
              <p className="text-sm md:text-base leading-relaxed">
                Our methodology embraces the fragmentation and distortion of traditional forms, 
                allowing the <span className="text-corp-orange">subjective emotional experience</span> to shape both 
                process and presentation. Digital expressionism rejects perfect representation 
                in favor of <span className="text-corp-green">emotional intensity</span> and experiential truth.
              </p>
            </motion.div>
            
            {/* Core principles cards with expressionist styling */}
            <div className="md:col-span-7 md:row-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div 
                className="bg-black/50 backdrop-blur-sm p-5 border-t-2 border-corp-green rounded-br-md transform transition-all duration-300"
                initial={{ y: 15, opacity: 0, skewY: "1deg" }}
                animate={{ y: 0, opacity: 1, skewY: "0deg" }}
                transition={{ duration: 0.7, delay: 0.6 }}
                whileHover={{ skewY: "1deg", translateY: -5 }}
              >
                <h4 className="text-lg font-display font-semibold mb-2 text-corp-green">Fragmentation & Unity</h4>
                <p className="text-sm">
                  We embrace the tensions between fractured media and unified experience, revealing meaning through 
                  deliberate distortion and reconfiguration of form and content.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-black/50 backdrop-blur-sm p-5 border-r-2 border-corp-orange rounded-bl-md transform transition-all duration-300"
                initial={{ y: 15, opacity: 0, skewY: "-1deg" }}
                animate={{ y: 0, opacity: 1, skewY: "0deg" }}
                transition={{ duration: 0.7, delay: 0.7 }}
                whileHover={{ skewY: "-1deg", translateY: -5 }}
              >
                <h4 className="text-lg font-display font-semibold mb-2 text-corp-orange">Radical Accessibility</h4>
                <p className="text-sm">
                  Digital expression democratizes creation, embracing technological disruption and non-traditional entry points
                  for artists of all backgrounds and technical abilities.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-black/50 backdrop-blur-sm p-5 border-l-2 border-corp-cyan rounded-tr-md transform transition-all duration-300"
                initial={{ y: 15, opacity: 0, skewY: "-1deg" }}
                animate={{ y: 0, opacity: 1, skewY: "0deg" }}
                transition={{ duration: 0.7, delay: 0.8 }}
                whileHover={{ skewY: "1deg", translateY: -5 }}
              >
                <h4 className="text-lg font-display font-semibold mb-2 text-corp-cyan">Collective Intelligence</h4>
                <p className="text-sm">
                  Our practice blurs the boundaries between creator and created, merging individual artistic voices
                  into interconnected networks of expressive intelligence.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-black/50 backdrop-blur-sm p-5 border-b-2 border-corp-green rounded-tl-md transform transition-all duration-300"
                initial={{ y: 15, opacity: 0, skewY: "1deg" }}
                animate={{ y: 0, opacity: 1, skewY: "0deg" }}
                transition={{ duration: 0.7, delay: 0.9 }}
                whileHover={{ skewY: "-1deg", translateY: -5 }}
              >
                <h4 className="text-lg font-display font-semibold mb-2 text-corp-green">Digital Materiality</h4>
                <p className="text-sm">
                  We treat digital media as physical material with its own properties and limitations,
                  exploring glitches, latency, and compression as expressive elements rather than errors.
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              className="md:col-span-5 md:row-span-1 bg-black/50 backdrop-blur-sm p-6 border-r-4 border-corp-orange rounded-bl-md mt-auto"
              initial={{ x: 20, opacity: 0, skewX: "1deg" }}
              animate={{ x: 0, opacity: 1, skewX: "0deg" }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              <h3 className="text-xl font-display font-semibold mb-3 text-corp-orange">
                Beyond Representation
                
                <motion.div 
                  className="absolute -bottom-2 right-0 h-0.5 w-20 bg-corp-orange"
                  initial={{ width: 0 }}
                  animate={{ width: "5rem" }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  style={{ transformOrigin: "right" }}
                />
              </h3>
              
              <p className="text-sm md:text-base leading-relaxed">
                Our work exists at the intersection of physical performance and digital abstraction, 
                using technology not to simulate reality but to <span className="text-corp-cyan">expose its limitations</span>.
                We embrace technical "errors" as revelatory moments of expressive truth.
              </p>
            </motion.div>
          </div>
          
          {/* Call to action - expressionist styling */}
          <motion.div 
            className="text-center mt-12 mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {/* Digital expressionist decorative elements */}
            <motion.div 
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle, rgba(0,255,255,0.2) 0%, rgba(0,0,0,0) 70%)",
                  "radial-gradient(circle, rgba(136,255,0,0.2) 0%, rgba(0,0,0,0) 70%)",
                  "radial-gradient(circle, rgba(255,136,0,0.2) 0%, rgba(0,0,0,0) 70%)",
                  "radial-gradient(circle, rgba(0,102,204,0.2) 0%, rgba(0,0,0,0) 70%)"
                ],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.button
              onClick={handleRegisterClick}
              className="relative z-10 bg-transparent border-2 border-corp-cyan hover:border-corp-orange text-white px-10 py-4 rounded-md text-lg font-bold uppercase tracking-widest transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 15px rgba(0, 255, 255, 0.8)",
                boxShadow: "0 0 25px rgba(0, 255, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{
                  color: ["#FFFFFF", "#00FFFF", "#FFFFFF"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Join the Collective
              </motion.span>
            </motion.button>
            
            <motion.p 
              className="mt-4 text-sm opacity-80 font-code relative z-10"
              animate={{
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Participate in the ongoing evolution of digital expressionism
            </motion.p>
          </motion.div>
          
          {/* Contact button with expressionist styling */}
          <div className="absolute bottom-20 sm:bottom-4 right-4 z-20">
            <div className="relative">
              <Button
                size="sm"
                variant="outline"
                className="border-corp-cyan text-corp-cyan hover:bg-corp-cyan/10 rounded-full flex items-center gap-1 shadow-md overflow-hidden"
                onMouseEnter={() => setShowContactTooltip(true)}
                onMouseLeave={() => setShowContactTooltip(false)}
                onClick={() => {
                  window.location.href = "mailto:contact@functionalsoup.com";
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(0,255,255,0.2) 0%, rgba(0,0,0,0) 70%)",
                      "linear-gradient(45deg, rgba(136,255,0,0.2) 0%, rgba(0,0,0,0) 70%)",
                      "linear-gradient(45deg, rgba(255,136,0,0.2) 0%, rgba(0,0,0,0) 70%)"
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <HiMail className="w-4 h-4 relative z-10" />
                <span className="text-xs relative z-10">Contact</span>
              </Button>
              
              {showContactTooltip && (
                <motion.div 
                  className="absolute bottom-full right-0 mb-2 bg-black/70 backdrop-blur-sm border border-corp-cyan text-white p-2 rounded text-xs w-48 font-code"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  <span className="text-corp-cyan">connect</span>@functionalsoup.com
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </PresentationLayout>
  );
}