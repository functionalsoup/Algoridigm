import { motion } from "framer-motion";

export function JTechLogo({ size = 'medium', animated = true }) {
  // Define size classes
  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-20 h-20",
    large: "w-32 h-32"
  };
  
  // Define animation variants
  const logoVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };
  
  const pulseVariants = {
    pulse: {
      scale: [1, 1.02, 1],
      opacity: [1, 0.9, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };
  
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size as keyof typeof sizeClasses]}`}
      initial={animated ? "hidden" : "visible"}
      animate={animated ? "visible" : "visible"}
      variants={logoVariants}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="absolute inset-0 bg-corp-magenta/20 rounded-full blur-xl"
        animate="pulse"
        variants={pulseVariants}
      />
      
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circle */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke="rgba(0, 255, 255, 0.7)" 
          strokeWidth="2"
          variants={pathVariants}
          initial={animated ? "hidden" : "visible"}
          animate={animated ? "visible" : "visible"}
        />
        
        {/* Inner Hexagon */}
        <motion.path 
          d="M50,20 L75,32.5 L75,67.5 L50,80 L25,67.5 L25,32.5 Z" 
          fill="none" 
          stroke="#ff00ff" 
          strokeWidth="2"
          variants={pathVariants}
          initial={animated ? "hidden" : "visible"}
          animate={animated ? "visible" : "visible"}
        />
        
        {/* Central Eye Element */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="15" 
          fill="rgba(0, 0, 0, 0.7)"
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="1"
          variants={pathVariants}
          initial={animated ? "hidden" : "visible"}
          animate={animated ? "visible" : "visible"}
        />
        
        {/* Iris */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="8" 
          fill="rgba(0, 255, 255, 0.9)"
          variants={pathVariants}
          initial={animated ? "hidden" : "visible"}
          animate={animated ? "visible" : "visible"}
        />
        
        {/* Pupil */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="3" 
          fill="#000"
          variants={pathVariants}
          initial={animated ? "hidden" : "visible"}
          animate={animated ? "visible" : "visible"}
        />
        
        {/* Rays/Data Lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
          <motion.line
            key={`ray-${index}`}
            x1="50"
            y1="50"
            x2={50 + 30 * Math.cos(angle * Math.PI / 180)}
            y2={50 + 30 * Math.sin(angle * Math.PI / 180)}
            stroke={index % 2 === 0 ? "#ff00ff" : "rgba(0, 255, 255, 0.7)"}
            strokeWidth="1"
            strokeDasharray="2 3"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { 
                pathLength: 1, 
                opacity: 0.7,
                transition: { 
                  delay: 0.8 + index * 0.05,
                  duration: 0.5
                }
              }
            }}
            initial={animated ? "hidden" : "visible"}
            animate={animated ? "visible" : "visible"}
          />
        ))}
        
        {/* Text */}
        <text
          x="50"
          y="95"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="monospace"
          fontSize="8"
          fontWeight="bold"
        >
          J-TECH
        </text>
      </svg>
    </motion.div>
  );
}