import { motion } from "framer-motion";
import PresentationLayout from "@/components/presentation/PresentationLayout";
import { RotatingMandelaBackground } from "@/components/presentation/RotatingMandelaBackground";

export default function CombinedSlide() {
  return (
    <PresentationLayout slideNumber={1} showPrevButton={false} showErrors={true}>
      {/* Rotating Mandela background with counterclockwise rotation and medium speed */}
      <RotatingMandelaBackground 
        direction="counterclockwise"
        speed="medium"
        scale={1.8}
        opacity={0.15}
        initialDelay={0.2}
      />
      
      {/* J-AI: General Intelligence Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-2 md:p-0 mb-16"
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 md:mb-8 relative text-corp-cyan" data-text="J-AI: General Intelligence">
          J-AI: General Intelligence
          
          <motion.span
            className="absolute inset-0 text-corp-orange opacity-0"
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
            J-AI: General Intelligence
          </motion.span>
          
          <motion.span
            className="absolute inset-0 text-corp-green opacity-0"
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
            J-AI: General Intelligence
          </motion.span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-4 text-corp-cyan">Redefining Possibility</h3>
            <p className="mb-4">J-AI represents the culmination of three decades of quantum research and neural architecture development at J-Tech Industries. The first truly general intelligence system capable of independent reasoning, emotional comprehension, and creative problem-solving.</p>
            
            <h3 className="text-2xl font-display font-semibold mb-4 mt-8 text-corp-cyan">Key Capabilities</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-corp-orange mr-2 shrink-0">→</span>
                <span className="text-sm sm:text-base">Adaptive Consciousness Matrix with 98.7% human-alignment scoring</span>
              </li>
              <li className="flex items-start">
                <span className="text-corp-green mr-2 shrink-0">→</span>
                <span className="text-sm sm:text-base">Quantum-enabled processing at 450 quadrillion operations per second</span>
              </li>
              <li className="flex items-start">
                <span className="text-corp-orange mr-2 shrink-0">→</span>
                <span className="text-sm sm:text-base">Self-evolving architecture with integrated ethical frameworks</span>
              </li>
              <li className="flex items-start">
                <span className="text-corp-green mr-2 shrink-0">→</span>
                <span className="text-sm sm:text-base">Multimodal interface capabilities across 147 human languages</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 bg-corp-bg/40 backdrop-blur-md rounded-lg p-6 border border-corp-cyan/20"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="aspect-video rounded-md bg-gradient-to-r from-corp-cyan/20 via-corp-green/20 to-corp-orange/20 mb-4 flex items-center justify-center overflow-hidden relative">
              <div className="text-6xl text-corp-cyan/50 font-display absolute opacity-30">J-AI</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                  <circle cx="100" cy="100" r="90" stroke="url(#paint0_linear)" strokeWidth="2"/>
                  <circle cx="100" cy="100" r="60" stroke="url(#paint1_linear)" strokeWidth="2"/>
                  <circle cx="100" cy="100" r="30" fill="url(#paint2_radial)"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="100" y1="10" x2="100" y2="190" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00FFFF"/>
                      <stop offset="1" stopColor="#00FFFF" stopOpacity="0.2"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear" x1="100" y1="40" x2="100" y2="160" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF8800"/>
                      <stop offset="1" stopColor="#FF8800" stopOpacity="0.2"/>
                    </linearGradient>
                    <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(30)">
                      <stop stopColor="#00FFFF" stopOpacity="0.3"/>
                      <stop offset="1" stopColor="#88FF00" stopOpacity="0.3"/>
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
            
            <h4 className="text-xl font-display font-semibold mb-2 text-corp-orange">Technology Integration</h4>
            <p className="text-sm opacity-80 mb-4">J-AI seamlessly integrates with existing infrastructure while expanding capabilities exponentially beyond current limitations. Its unique architecture enables unprecedented learning velocity.</p>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-corp-dark rounded p-2 text-center">
                <div className="text-corp-cyan text-2xl font-bold">99.8%</div>
                <div className="text-xs opacity-70">Accuracy</div>
              </div>
              <div className="bg-corp-dark rounded p-2 text-center">
                <div className="text-corp-orange text-2xl font-bold">0.02ms</div>
                <div className="text-xs opacity-70">Response</div>
              </div>
              <div className="bg-corp-dark rounded p-2 text-center">
                <div className="text-corp-green text-2xl font-bold">∞</div>
                <div className="text-xs opacity-70">Potential</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* About the Founder Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-16 border-t border-corp-cyan/20 pt-16"
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 glitch relative" data-text="About the Founder">
          About the Founder
          <motion.span
            className="absolute inset-0 text-corp-cyan opacity-0"
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
            className="absolute inset-0 text-corp-magenta opacity-0"
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
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-2/5">
            <motion.div 
              className="aspect-square bg-corp-bg border border-corp-blue/20 rounded-lg overflow-hidden relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-corp-dark via-corp-bg to-corp-dark relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Circular background */}
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20 absolute">
                    <circle cx="100" cy="100" r="90" stroke="url(#paint3_linear)" strokeWidth="2"/>
                    <circle cx="100" cy="100" r="60" stroke="url(#paint4_linear)" strokeWidth="2"/>
                    <circle cx="100" cy="100" r="30" fill="url(#paint5_radial)"/>
                    <defs>
                      <linearGradient id="paint3_linear" x1="100" y1="10" x2="100" y2="190" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00F0FF"/>
                        <stop offset="1" stopColor="#00F0FF" stopOpacity="0.2"/>
                      </linearGradient>
                      <linearGradient id="paint4_linear" x1="100" y1="40" x2="100" y2="160" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF00F5"/>
                        <stop offset="1" stopColor="#FF00F5" stopOpacity="0.2"/>
                      </linearGradient>
                      <radialGradient id="paint5_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(30)">
                        <stop stopColor="#00F0FF" stopOpacity="0.3"/>
                        <stop offset="1" stopColor="#FF00F5" stopOpacity="0.3"/>
                      </radialGradient>
                    </defs>
                  </svg>
                  
                  {/* Male silhouette - George H. Jones */}
                  <svg width="140" height="180" viewBox="0 0 140 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80 relative z-10 mt-4">
                    <defs>
                      <linearGradient id="silhouetteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#FF00F5" stopOpacity="0.7" />
                      </linearGradient>
                    </defs>
                    {/* Head */}
                    <circle cx="70" cy="40" r="25" fill="black" />
                    {/* Neck */}
                    <rect x="65" y="65" width="10" height="10" fill="black" />
                    {/* Shoulders */}
                    <rect x="40" y="75" width="60" height="10" fill="black" />
                    {/* Torso */}
                    <rect x="50" y="85" width="40" height="55" fill="black" />
                    {/* Arms */}
                    <rect x="35" y="75" width="5" height="45" fill="black" />
                    <rect x="100" y="75" width="5" height="45" fill="black" />
                    {/* Legs */}
                    <rect x="55" y="140" width="10" height="40" fill="black" />
                    <rect x="75" y="140" width="10" height="40" fill="black" />
                    {/* Overlay gradient for cybernetic effect */}
                    <rect x="35" y="15" width="70" height="165" fill="url(#silhouetteGradient)" fillOpacity="0.2" />
                  </svg>
                </div>
                <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-corp-blue/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-corp-dark to-transparent p-4">
                  <h3 className="text-2xl font-display font-bold">GEORGE H. JON&*S</h3>
                  <p className="text-corp-cyan">FØUND3R // C3Ø</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-3/5">
            <motion.div 
              className="border-l-2 border-corp-magenta pl-6 mb-8"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <p className="italic text-lg opacity-80">"Humanity's destiny isn't just waiting for us in the stars—we're going to build it ourselves. J-AI isn't just disruptive technology, it's the fork in the evolutionary road that will make us a multi-planetary species with immortal consciousness."</p>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <h3 className="text-2xl font-display font-semibold mb-4 text-corp-cyan">Relentless</h3>
              <p className="mb-4 font-mono">GEORGE H. JON&*S AB@//D0N3D @ PRØM!S!NG @C@D£MIC C@R33R TØ FØUND J-T3CH !NDUS%R!3S !N 2032. H!$ CØNTROV3R$!@L APPRØ@CH TØ QU@N%µM N3UR@L N3TWØRK$ @ND CØN$C!ØU$N3$$ M@PP!NG H@$ D!V!D3D +H3 $C!3N%!F!C CØMMUN!%¥ WH!L3 @%%R@C%!NG billions in venture capital.</p>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <h3 className="text-2xl font-display font-semibold mb-4 mt-8 text-corp-cyan">ACH!3V3M3N+$</h3>
              <ul className="space-y-2 font-mono">
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2 shrink-0">→</span>
                  <span>@!M3 P3R$ØN ØF +H3 ¥3@R (2Ø41)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2 shrink-0">→</span>
                  <span>@UHØR ØF "3X!NC!ØN ØR 3VØ1U!ØN: WH¥ W3 MU$ B3CØM3 PØ$-HUM@N"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-corp-magenta mr-2 shrink-0">→</span>
                  <span>KNØWN FØR WØRK!NG 2Ø-HØUR D@¥$ @ND $L33P!NG ØN +H3 F@C+ØR¥ FLØØR</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </PresentationLayout>
  );
}