import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div
      className="relative w-[200px] h-[200px] mb-12"
      animate={{ y: [0, -10, 0] }}
      transition={{ 
        y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
      }}
    >
      <motion.div 
        className="absolute w-full h-full border-2 border-corp-cyan rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      />
      <motion.div 
        className="absolute w-[80%] h-[80%] top-[10%] left-[10%] border-2 border-corp-magenta rounded-full"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />
      <div className="absolute w-[60%] h-[60%] top-[20%] left-[20%] bg-gradient-radial from-corp-cyan/30 to-corp-magenta/30 rounded-full flex items-center justify-center font-bold text-white text-3xl shadow-[0_0_10px_rgba(0,240,255,0.8)]">
        J-AI
      </div>
    </motion.div>
  );
}

export default Logo;
