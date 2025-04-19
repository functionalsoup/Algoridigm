import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Mail, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GeometricBackground } from "@/components/presentation/GeometricBackground";

// Force React Router to recognize this is a route component
export const routeComponent = true;

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#060c18] text-white">
      {/* Floating background */}
      <GeometricBackground 
        direction="clockwise"
        speed="slow"
        scale={1.5}
        opacity={0.12}
        initialDelay={0.3}
      />
      
      {/* Moving glow effect */}
      <motion.div 
        className="fixed -inset-40 bg-[#00a2ff] opacity-5 rounded-full blur-3xl pointer-events-none"
        animate={{ 
          x: [40, -40, 40],
          y: [-40, 40, -40],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      />
      
      <div className="max-w-5xl mx-auto px-4 py-10 relative z-10">
        {/* Back button */}
        <div className="mb-8">
          <button
            onClick={() => window.close()}
            className="font-display text-[#00a2ff] hover:text-white hover:bg-[#00a2ff]/20 transition-all px-4 py-2 rounded flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Close and Return
          </button>
        </div>
        
        {/* Header with animated title */}
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold mb-4"
            animate={{ 
              color: ["#00FFFF", "#88FF00", "#FF8800", "#00FFFF"],
              textShadow: [
                "0 0 15px rgba(0, 255, 255, 0.5)",
                "0 0 15px rgba(136, 255, 0, 0.5)", 
                "0 0 15px rgba(255, 136, 0, 0.5)",
                "0 0 15px rgba(0, 255, 255, 0.5)"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Stuart Campbell
          </motion.h1>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-white/80">
            <div className="flex items-center">
              <MapPin size={16} className="mr-1 text-[#ff2a6d]" />
              <span>Longview, TX</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-1 text-[#ff2a6d]" />
              <span>functional_soup@outlook.com</span>
            </div>
            <div className="flex items-center">
              <Globe size={16} className="mr-1 text-[#ff2a6d]" />
              <a 
                href="https://functionalsoup.replit.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#00a2ff] transition-colors"
              >
                functionalsoup.replit.app
              </a>
            </div>
          </div>
        </motion.header>
        
        {/* Main content */}
        <div className="space-y-8">
          {/* Professional Summary */}
          <motion.section
            className="bg-[#0c1623]/80 border border-[#1a3a59] rounded-2xl p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-display font-semibold mb-4 flex items-center text-[#00a2ff]">
              <span className="text-[#ff2a6d] mr-2">🎭</span> Professional Summary
            </h2>
            <div className="border-t border-[#1a3a59] pt-4">
              <p className="text-white/90">
                Theatre director and collaborative artist with a focus on devised performance, ensemble-generated work, and interdisciplinary storytelling. Founder of Functional Soup Productions, dedicated to exploring empathy, identity, and technology through experimental performance. Experienced in directing, design, and ensemble development across regional and academic settings.
              </p>
            </div>
          </motion.section>
          
          {/* Theatre Experience */}
          <motion.section
            className="bg-[#0c1623]/80 border border-[#1a3a59] rounded-2xl p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-display font-semibold mb-4 flex items-center text-[#00a2ff]">
              <span className="text-[#ff2a6d] mr-2">💼</span> Theatre Experience
            </h2>
            <div className="border-t border-[#1a3a59] pt-4 space-y-6">
              {/* Experience 1 */}
              <div>
                <div className="flex flex-wrap justify-between mb-2">
                  <h3 className="text-xl font-semibold text-[#80ff00]">The Vortex Theatre – Austin, TX</h3>
                  <span className="text-white/60 text-sm">2015–2016</span>
                </div>
                <div className="text-white/80 font-medium mb-2">Role: Deviser</div>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-start">
                    <span className="text-[#00a2ff] mr-2">•</span>
                    <span>Production: <em>Privacy Settings</em> (Workshop)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00a2ff] mr-2">•</span>
                    <span>Contributed to devising structure and narrative elements for original production</span>
                  </li>
                </ul>
              </div>
              
              {/* Experience 2 */}
              <div>
                <div className="flex flex-wrap justify-between mb-2">
                  <h3 className="text-xl font-semibold text-[#80ff00]">Plethora Theatre Company – Ft. Smith, AR</h3>
                  <span className="text-white/60 text-sm">2014–2015</span>
                </div>
                <div className="text-white/80 font-medium mb-2">Role: Director</div>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-start">
                    <span className="text-[#00a2ff] mr-2">•</span>
                    <span>Production: <em>The Woman in Black</em></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00a2ff] mr-2">•</span>
                    <span>Directed and designed production at the historic Van Buren Theatre</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00a2ff] mr-2">•</span>
                    <span className="font-medium">Outreach:</span>
                  </li>
                  <li className="flex items-start pl-6">
                    <span className="text-[#ff2a6d] mr-2">-</span>
                    <span>Led workshop on Devised Performance and Movement at Northwestern Oklahoma State University (Spring 2014)</span>
                  </li>
                </ul>
              </div>
              
              {/* Experience 3 */}
              <div>
                <div className="flex flex-wrap justify-between mb-2">
                  <h3 className="text-xl font-semibold text-[#80ff00]">University of Arkansas – Fort Smith Theatre</h3>
                  <span className="text-white/60 text-sm">2011–2014</span>
                </div>
                <div className="text-white/80 font-medium mb-2">Role: Student Director/Performer</div>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-start">
                    <span className="text-[#00a2ff] mr-2">•</span>
                    <span className="font-medium">Directed Productions:</span>
                  </li>
                  <li className="flex items-start pl-6">
                    <span className="text-[#ff2a6d] mr-2">-</span>
                    <span><em>God of Carnage</em></span>
                  </li>
                  <li className="flex items-start pl-6">
                    <span className="text-[#ff2a6d] mr-2">-</span>
                    <span><em>Memorandum of Love Lost</em> (Original devised piece)</span>
                  </li>
                  <li className="flex items-start pl-6">
                    <span className="text-[#ff2a6d] mr-2">-</span>
                    <span><em>Lend Me a Tenor</em> (Cast 2 Director)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00a2ff] mr-2">•</span>
                    <span className="font-medium">Other Creative Roles:</span>
                  </li>
                  <li className="flex items-start pl-6">
                    <span className="text-[#ff2a6d] mr-2">-</span>
                    <span><em>Dromnium</em> (Writer/Performer – Winner of KCACTF Regional & National Selection)</span>
                  </li>
                  <li className="flex items-start pl-6">
                    <span className="text-[#ff2a6d] mr-2">-</span>
                    <span><em>Aqua Vita</em> (Devised Movement Work)</span>
                  </li>
                  <li className="flex items-start pl-6">
                    <span className="text-[#ff2a6d] mr-2">-</span>
                    <span><em>Midsummer Night's Dream</em> (Actor – Bottom)</span>
                  </li>
                  <li className="flex items-start pl-6">
                    <span className="text-[#ff2a6d] mr-2">-</span>
                    <span><em>Three Sisters</em>, One-Act Series, Publicity & Scenic Design Team</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>
          
          {/* Education */}
          <motion.section
            className="bg-[#0c1623]/80 border border-[#1a3a59] rounded-2xl p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-display font-semibold mb-4 flex items-center text-[#00a2ff]">
              <span className="text-[#ff2a6d] mr-2">🎓</span> Education & Training
            </h2>
            <div className="border-t border-[#1a3a59] pt-4 space-y-6">
              {/* Education 1 */}
              <div>
                <div className="flex flex-wrap justify-between mb-2">
                  <h3 className="text-xl font-semibold text-[#80ff00]">University of Arkansas – Fort Smith</h3>
                  <span className="text-white/60 text-sm">2011–2014</span>
                </div>
                <div className="text-white/80 font-medium mb-2">B.A. Theatre: Acting & Directing</div>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-start">
                    <span className="text-[#00a2ff] mr-2">•</span>
                    <span>Graduated with Academic Achievement in Theatre</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00a2ff] mr-2">•</span>
                    <span>Focused on ensemble training, direction, and interdisciplinary collaboration</span>
                  </li>
                </ul>
              </div>
              
              {/* Education 2 */}
              <div>
                <div className="flex flex-wrap justify-between mb-2">
                  <h3 className="text-xl font-semibold text-[#80ff00]">Northwestern Oklahoma State University</h3>
                  <span className="text-white/60 text-sm">2009–2011</span>
                </div>
                <div className="text-white/80 font-medium mb-2">Theatre Program</div>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-start">
                    <span className="text-[#00a2ff] mr-2">•</span>
                    <span>KCACTF Region 6 – Student Director for 10-Minute Play Festival</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00a2ff] mr-2">•</span>
                    <span>Theatre Shop Assistant and Technical Support</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>
          
          {/* Skills */}
          <motion.section
            className="bg-[#0c1623]/80 border border-[#1a3a59] rounded-2xl p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-display font-semibold mb-4 flex items-center text-[#00a2ff]">
              <span className="text-[#ff2a6d] mr-2">🛠️</span> Skills
            </h2>
            <div className="border-t border-[#1a3a59] pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <span className="text-[#80ff00] mr-2">•</span>
                  <span>Devised Theatre & Ensemble Collaboration</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#80ff00] mr-2">•</span>
                  <span>Directing (Contemporary, Classical, Devised Works)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#80ff00] mr-2">•</span>
                  <span>Improvisation & Physical Theatre</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#80ff00] mr-2">•</span>
                  <span>Script Development & Adaptation</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#80ff00] mr-2">•</span>
                  <span>Scenic and Lighting Design (basic/intermediate)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#80ff00] mr-2">•</span>
                  <span>Stage Management & Production Support</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#80ff00] mr-2">•</span>
                  <span>Multimedia and Experimental Integration</span>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}