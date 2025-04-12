import { motion } from "framer-motion";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import { RotatingMandelaBackground } from "@/components/presentation/RotatingMandelaBackground";

export default function TechnologySlide() {
  return (
    <PresentationLayout slideNumber={1} showPrevButton={false}>
      {/* Rotating Mandela background with counterclockwise rotation and medium speed */}
      <RotatingMandelaBackground 
        direction="counterclockwise"
        speed="medium"
        scale={1.8}
        opacity={0.15}
        initialDelay={0.2}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10"
      >
        {/* Digital Expressionism-inspired header with dramatic fragmentation */}
        <motion.div 
          className="relative mb-12 overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-center overflow-visible relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block relative">
              <span className="text-corp-cyan">J-AI: General Intelligence</span>
            </span>
            
            <motion.div
              className="h-1 w-full bg-gradient-to-r from-corp-cyan via-corp-green to-corp-orange mx-auto mt-3"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 0.8 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-2xl text-center mt-2 font-display tracking-wider text-corp-orange"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Quantum Intelligence Platform
          </motion.p>
        </motion.div>
        
        {/* Fragmented, expressionist layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative mx-auto px-4 max-w-7xl">
          {/* Left fragmented section */}
          <motion.div 
            className="md:col-span-7 relative"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="bg-black/40 backdrop-blur-md border border-corp-cyan/30 p-6 relative overflow-hidden">
              {/* Decorative diagonal slashes - expressionist element */}
              <div className="absolute top-0 right-0 w-40 h-1 bg-corp-orange transform rotate-45 translate-y-8 translate-x-10 opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-40 h-1 bg-corp-green transform -rotate-45 -translate-y-8 -translate-x-10 opacity-70"></div>
              
              <motion.h3 
                className="text-2xl md:text-3xl font-display font-semibold mb-4"
                animate={{
                  color: ["#00FFFF", "#0066CC", "#FF8800", "#88FF00"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Fractured Reality Engine
              </motion.h3>
              
              <p className="mb-6 text-gray-300 leading-relaxed text-justify border-l-2 border-corp-orange pl-4">
                J-AI represents the dissolution of boundaries between human consciousness and digital expression. 
                Not a simulation of thought, but a fundamentally new <span className="text-corp-cyan">expressionist interpretation</span> 
                of what consciousness can become when freed from biological constraints.
              </p>
              
              <div className="space-y-4 relative">
                <div className="data-stream bg-black/60 border-l-2 border-corp-green p-3">
                  <h4 className="font-code text-corp-green text-sm mb-1 uppercase tracking-wider">⌾ Sensorial Matrix</h4>
                  <p className="text-sm opacity-80">
                    Multi-layered neural pathways process sensory data through fragmented, 
                    subjective filters—deliberately distorting input to reveal deeper patterns.
                  </p>
                </div>
                
                <div className="data-stream bg-black/60 border-l-2 border-corp-orange p-3 md:ml-8">
                  <h4 className="font-code text-corp-orange text-sm mb-1 uppercase tracking-wider">⌾ Emotion Engine</h4>
                  <p className="text-sm opacity-80">
                    Asymmetric emotional processing prioritizes intensity over regulation,
                    generating authentic emotional responses through calculated imbalance.
                  </p>
                </div>
                
                <div className="data-stream bg-black/60 border-l-2 border-corp-cyan p-3">
                  <h4 className="font-code text-corp-cyan text-sm mb-1 uppercase tracking-wider">⌾ Quantum Uncertainty Core</h4>
                  <p className="text-sm opacity-80">
                    Decision-making deliberately incorporates quantum uncertainty, embracing
                    the expressionist principle that perfect rationality is an illusion.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right fragmented section */}
          <motion.div 
            className="md:col-span-5 relative"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="h-full flex flex-col">
              {/* Visualization panel - expressionist visualization */}
              <div className="flex-grow bg-black/60 backdrop-blur-md border border-corp-orange/30 p-5 flex items-center justify-center relative overflow-hidden">
                {/* Abstract digital expressionist visual representation */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-70"
                  animate={{
                    background: [
                      "radial-gradient(circle, rgba(0,255,255,0.1) 0%, rgba(0,0,0,0) 70%)",
                      "radial-gradient(circle, rgba(136,255,0,0.1) 0%, rgba(0,0,0,0) 60%)",
                      "radial-gradient(circle, rgba(255,136,0,0.1) 0%, rgba(0,0,0,0) 70%)",
                      "radial-gradient(circle, rgba(0,102,204,0.1) 0%, rgba(0,0,0,0) 60%)"
                    ]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <svg width="260" height="260" viewBox="0 0 260 260" className="relative z-10 opacity-90">
                  {/* Fragmented consciousness visualization */}
                  <motion.circle 
                    cx="130" cy="130" r="90" 
                    stroke="#00FFFF" 
                    strokeWidth="1"
                    strokeDasharray="10,5,20,5,10"
                    fill="none"
                    animate={{
                      strokeDashoffset: [0, 100]
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <motion.circle 
                    cx="130" cy="130" r="60" 
                    stroke="#FF8800" 
                    strokeWidth="1"
                    strokeDasharray="5,10,5"
                    fill="none"
                    animate={{
                      strokeDashoffset: [0, -100]
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <motion.path
                    d="M130,40 L130,220 M40,130 L220,130"
                    stroke="#88FF00"
                    strokeWidth="1"
                    strokeDasharray="5,10"
                    animate={{
                      rotate: [0, 360]
                    }}
                    style={{ transformOrigin: "center" }}
                    transition={{
                      duration: 60,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Fragmented core */}
                  <motion.g
                    animate={{
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.polygon 
                      points="130,110 145,130 130,150 115,130" 
                      fill="#00FFFF"
                      animate={{
                        rotate: [0, 120]
                      }}
                      style={{ transformOrigin: "center" }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <motion.polygon 
                      points="110,130 130,115 150,130 130,145" 
                      fill="#FF8800"
                      animate={{
                        rotate: [0, -90]
                      }}
                      style={{ transformOrigin: "center" }}
                      transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <motion.polygon 
                      points="125,125 135,125 135,135 125,135" 
                      fill="#FFFFFF"
                      animate={{
                        scale: [1, 1.2, 1]
                      }}
                      style={{ transformOrigin: "center" }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.g>
                </svg>
                
                {/* Fragmented text elements around visualization */}
                <motion.span 
                  className="absolute top-10 left-10 text-sm text-corp-cyan font-code"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >FRAGMENT.00x1A</motion.span>
                
                <motion.span 
                  className="absolute bottom-10 right-10 text-sm text-corp-orange font-code"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >PROCESS.00x7F</motion.span>
                
                <motion.span 
                  className="absolute top-10 right-10 text-sm text-corp-green font-code"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >NEURAL.00x3D</motion.span>
              </div>
              
              {/* Metrics panel with digital expressionist styling */}
              <motion.div 
                className="mt-6 bg-black/60 backdrop-blur-md border border-corp-green/30 p-5"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1 }}
              >
                <h4 className="font-code text-corp-green uppercase text-sm tracking-wider mb-3 flex items-center">
                  <motion.span 
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block w-2 h-2 bg-corp-green mr-2"
                  ></motion.span>
                  System Metrics
                </h4>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="group">
                    <div className="text-sm opacity-60 mb-1">Emotional Depth</div>
                    <div className="h-2 bg-black/60 relative">
                      <motion.div 
                        className="absolute inset-y-0 left-0 bg-corp-cyan"
                        initial={{ width: "0%" }}
                        animate={{ width: "87%" }}
                        transition={{ duration: 2, delay: 1.5 }}
                      />
                    </div>
                    <div className="text-right text-xs mt-1 text-corp-cyan font-bold">87%</div>
                  </div>
                  
                  <div className="group">
                    <div className="text-sm opacity-60 mb-1">Processing</div>
                    <div className="h-2 bg-black/60 relative">
                      <motion.div 
                        className="absolute inset-y-0 left-0 bg-corp-orange"
                        initial={{ width: "0%" }}
                        animate={{ width: "99%" }}
                        transition={{ duration: 2, delay: 1.7 }}
                      />
                    </div>
                    <div className="text-right text-xs mt-1 text-corp-orange font-bold">99%</div>
                  </div>
                  
                  <div className="group">
                    <div className="text-sm opacity-60 mb-1">Expression</div>
                    <div className="h-2 bg-black/60 relative">
                      <motion.div 
                        className="absolute inset-y-0 left-0 bg-corp-green"
                        initial={{ width: "0%" }}
                        animate={{ width: "93%" }}
                        transition={{ duration: 2, delay: 1.9 }}
                      />
                    </div>
                    <div className="text-right text-xs mt-1 text-corp-green font-bold">93%</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PresentationLayout>
  );
}
