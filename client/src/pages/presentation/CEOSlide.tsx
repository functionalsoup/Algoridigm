import { motion } from "framer-motion";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import { useEffect, useState } from "react";

export default function CEOSlide() {
  const [showGlitch, setShowGlitch] = useState(false);
  
  useEffect(() => {
    // Start glitch effect shortly after component mounts
    const timer = setTimeout(() => {
      setShowGlitch(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <PresentationLayout slideNumber={2} showErrors={true}>
      <div className="relative">
        {/* Glitchy header effect */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-6xl font-display font-bold glitch relative" data-text="About the Founder">
            About the Founder
            <motion.span
              className="absolute inset-0 text-[#00ffff] opacity-0"
              animate={{
                x: [0, -3, 0, 3, 0],
                opacity: [0, 0.3, 0, 0.3, 0],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 5,
              }}
            >
              About the Founder
            </motion.span>
            
            <motion.span
              className="absolute inset-0 text-[#0066cc] opacity-0"
              animate={{
                x: [0, 3, 0, -3, 0],
                opacity: [0, 0.3, 0, 0.3, 0],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 5,
                delay: 0.15,
              }}
            >
              About the Founder
            </motion.span>
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left column with image */}
          <motion.div 
            className="md:w-2/5"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="aspect-square bg-[#0c0c10] border border-[#0065ff]/20 rounded-lg overflow-hidden relative">
              <div className="w-full h-full bg-gradient-to-br from-[#050508] via-[#0c0c10] to-[#050508] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                    <circle cx="100" cy="100" r="90" stroke="url(#paint0_linear)" strokeWidth="2"/>
                    <circle cx="100" cy="100" r="60" stroke="url(#paint1_linear)" strokeWidth="2"/>
                    <circle cx="100" cy="100" r="30" fill="url(#paint2_radial)"/>
                    <defs>
                      <linearGradient id="paint0_linear" x1="100" y1="10" x2="100" y2="190" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00F0FF"/>
                        <stop offset="1" stopColor="#00F0FF" stopOpacity="0.2"/>
                      </linearGradient>
                      <linearGradient id="paint1_linear" x1="100" y1="40" x2="100" y2="160" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF00F5"/>
                        <stop offset="1" stopColor="#FF00F5" stopOpacity="0.2"/>
                      </linearGradient>
                      <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(30)">
                        <stop stopColor="#00F0FF" stopOpacity="0.3"/>
                        <stop offset="1" stopColor="#FF00F5" stopOpacity="0.3"/>
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
                <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-[#0065ff]/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#050508] to-transparent p-4">
                  <h3 className="text-2xl font-display font-bold">George H. Jones</h3>
                  <p className="text-[#00ffff]">Founder & CEO</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column with content */}
          <motion.div 
            className="md:w-3/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Quote */}
            <motion.div 
              className="border-l-2 border-[#0066cc] pl-6 mb-8"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="italic text-lg opacity-80">"Humanity's destiny isn't just waiting for us in the stars—we're going to build it ourselves. J-AI isn't just disruptive technology, it's the fork in the evolutionary road that will make us a multi-planetary species with immortal consciousness."</p>
            </motion.div>
            
            {/* "Relentless" section with glitch effect */}
            <div className="mb-8">
              <h3 className="text-2xl font-display font-semibold mb-4 text-[#00ffff]">
                Relentless
                {showGlitch && (
                  <motion.span 
                    className="text-[#ff2a6d] text-lg ml-2 font-mono inline-block"
                    animate={{ 
                      opacity: [0.7, 0.9, 0.7, 0.9],
                      x: [0, -2, 1, -1, 2, -1],
                      scale: [1, 1.02, 0.98, 1.01],
                      filter: [
                        "blur(0.5px)",
                        "blur(0px)",
                        "blur(1px)",
                        "blur(0px)"
                      ],
                      textShadow: [
                        "0 0 5px rgba(255, 42, 109, 0.8), 0 0 10px rgba(255, 42, 109, 0.4)",
                        "0 0 8px rgba(255, 42, 109, 0.9), 0 0 15px rgba(255, 42, 109, 0.6)",
                        "0 0 3px rgba(255, 42, 109, 0.7), 0 0 7px rgba(255, 42, 109, 0.4)",
                      ]
                    }}
                    transition={{
                      duration: 0.4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    I*@#$!^vation &lt;NEURAL_ANOMALY&gt; %^&*!@
                  </motion.span>
                )}
              </h3>
              
              {/* Normal bio text that gets replaced with glitch */}
              {!showGlitch && (
                <p className="text-white/80">
                  George H. Jones abandoned a promising academic career to found J-Tech Industries in 2032. His controversial approach to quantum neural networks and consciousness mapping has divided the scientific community while attracting billions in venture capital.
                </p>
              )}
              
              {/* Glitchy code/gibberish that replaces normal text */}
              {showGlitch && (
                <div className="relative">
                  <motion.div
                    className="text-[#ff2a6d]/90 font-mono text-sm overflow-x-hidden p-2 border border-[#ff2a6d]/30 rounded-md bg-[#ff2a6d]/5"
                    animate={{ 
                      x: [0, -2, 1, -1, 0],
                      filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"]
                    }}
                    transition={{ 
                      duration: 0.3, 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }}
                  >
                    <div className="mb-1"># FATAL ERROR: NEURAL PATTERN CORRUPTION</div>
                    <div className="mb-2">01100101 01110010 01110010 01101111 01110010</div>
                    <div className="mb-1">//#define &lt;neural.h&gt;</div>
                    <div>void* consciousness_map(uint64_t* id) {'{'}</div>
                    <div className="ml-2">if(id == NULL) return SEGFAULT;</div>
                    <div className="ml-2">//@#$ RUNTIME ERROR: CONSCIOUSNESS NOT FOUND $#@!/</div>
                    <div className="ml-2">return neural::pattern::corrupt(id);</div>
                    <div>{'}'}</div>
                    <div className="mt-2 bg-[#ff2a6d]/20 p-1">&lt;NEURAL_ANOMALY_DETECTED&gt; &lt;SESSION_CORRUPTED&gt;</div>
                    <div className="mt-1">*&%!$@# CRITICAL SYSTEM FAILURE @!%^&*$</div>
                  </motion.div>
                  
                  {/* Random error flash effect */}
                  <motion.div 
                    className="absolute inset-0 bg-[#ff2a6d]/10 -z-10"
                    animate={{ 
                      opacity: [0, 0.3, 0, 0.4, 0.1],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                </div>
              )}
            </div>
            
            {/* Achievements section */}
            <div className="mt-8">
              {!showGlitch && (
                <div>
                  <h3 className="text-2xl font-display font-semibold mb-4 text-[#00ffff]">Achievements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-[#0066cc] mr-2">→</span>
                      <span>Time Person of the Year (2041)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#0066cc] mr-2">→</span>
                      <span>Pioneered Autonomous Colony Systems on Mars</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#0066cc] mr-2">→</span>
                      <span>Author of "Extinction or Transcendence: Why We Must Become Post-Human"</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#0066cc] mr-2">→</span>
                      <span>Launched first commercial neural lace after self-experimenting with prototypes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#0066cc] mr-2">→</span>
                      <span>Known for working 20-hour days and sleeping on the factory floor</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {/* Error log that replaces achievements */}
              {showGlitch && (
                <div className="border border-[#ff2a6d]/30 bg-[#ff2a6d]/5 rounded-md p-3">
                  <div className="flex items-center mb-2">
                    <div className="h-3 w-3 rounded-full bg-[#ff2a6d] animate-pulse mr-2"></div>
                    <span className="text-[#ff2a6d] text-sm font-mono">CRITICAL_ERROR.LOG</span>
                  </div>
                  
                  <motion.div 
                    className="font-mono text-[#ff2a6d]/80 text-xs space-y-1 overflow-hidden"
                    animate={{ 
                      y: [-5, 0, -3], 
                      filter: ["blur(0.7px)", "blur(0px)", "blur(0.5px)"] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatType: "mirror" 
                    }}
                  >
                    <div>[ERROR:0x8F21] Memory corruption detected</div>
                    <div>[FATAL:0xA1C3] Neural pattern desync</div>
                    <div>[WARN:0x7B29] Consciousness integrity: 27%</div>
                    <div className="bg-[#ff2a6d]/20 px-1">Segmentation fault: core dumped</div>
                    <div>@$&amp;#%!* [REDACTED] *!%&amp;$@</div>
                    <div>...</div>
                    <div>Attempting to restore founder profile [FAILED]</div>
                    <div className="bg-[#ff2a6d]/20 px-1">HALLUCINATION CONTAINMENT PROTOCOL INITIATED</div>
                    <div>01001000 01100101 01101100 01110000</div>
                  </motion.div>
                  
                  {/* Random glitchy lines */}
                  <div className="space-y-3 mt-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        className="h-px w-full bg-[#ff2a6d]/50"
                        animate={{ 
                          scaleX: [0.3, 1, 0.7, 0.9],
                          opacity: [0.2, 0.7, 0.4, 0.6],
                          x: [10, 0, 5, -2]
                        }}
                        transition={{ 
                          duration: 1.5 + i * 0.5, 
                          repeat: Infinity,
                          repeatType: "mirror"
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Full screen glitch overlay effect */}
        {showGlitch && (
          <motion.div 
            className="fixed inset-0 pointer-events-none z-50 opacity-20"
            animate={{ 
              opacity: [0.1, 0.2, 0.1, 0.3, 0.1],
              backgroundPosition: ["0% 0%", "100% 100%", "50% 50%"]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              repeatType: "mirror" 
            }}
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  rgba(255, 42, 109, 0.1) 0%,
                  rgba(255, 42, 109, 0) 1px,
                  rgba(255, 42, 109, 0) 2px,
                  rgba(255, 42, 109, 0.1) 3px
                )
              `,
              backgroundSize: "100% 3px",
            }}
          />
        )}
        
        {/* Occasional screen flicker effect */}
        {showGlitch && (
          <motion.div 
            className="fixed inset-0 bg-[#ff2a6d]/5 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.7, 0, 0.2, 0]
            }}
            transition={{ 
              duration: 0.2, 
              repeat: Infinity, 
              repeatType: "loop",
              repeatDelay: 7
            }}
          />
        )}
      </div>
    </PresentationLayout>
  );
}
