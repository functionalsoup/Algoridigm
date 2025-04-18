import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface RotatingSymbol {
  id: number;
  size: number;
  x: number;
  y: number;
  rotation: number;
  rotationDuration: number;
  direction: "clockwise" | "counterclockwise";
  color: string;
  type: "square" | "circle" | "triangle" | "plus" | "hexagon";
  opacity: number;
}

interface RotatingSymbolsBackgroundProps {
  symbolCount?: number;
  isActive?: boolean;
}

export function RotatingSymbolsBackground({ 
  symbolCount = 15,
  isActive = true
}: RotatingSymbolsBackgroundProps) {
  const [symbols, setSymbols] = useState<RotatingSymbol[]>([]);
  
  useEffect(() => {
    if (!isActive) return;
    
    // Generate random symbols
    const newSymbols: RotatingSymbol[] = [];
    for (let i = 0; i < symbolCount; i++) {
      // Random type
      const types: Array<"square" | "circle" | "triangle" | "plus" | "hexagon"> = ["square", "circle", "triangle", "plus", "hexagon"];
      const type = types[Math.floor(Math.random() * types.length)];
      
      // Random color from our cyberpunk palette
      const colors = [
        "rgba(0, 162, 255, 0.5)",  // cyan
        "rgba(255, 0, 245, 0.3)",  // magenta
        "rgba(128, 255, 0, 0.4)",  // lime green
        "rgba(255, 136, 0, 0.3)",  // orange
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      newSymbols.push({
        id: i,
        size: 20 + Math.random() * 60, // Random size between 20px and 80px
        x: Math.random() * 100, // Random position (percentage)
        y: Math.random() * 100, // Random position (percentage)
        rotation: Math.random() * 360, // Random initial rotation
        rotationDuration: 20 + Math.random() * 80, // Random rotation duration between 20s and 100s
        direction: Math.random() > 0.5 ? "clockwise" : "counterclockwise",
        color,
        type,
        opacity: 0.1 + Math.random() * 0.3 // Random opacity between 0.1 and 0.4
      });
    }
    
    setSymbols(newSymbols);
  }, [isActive, symbolCount]);
  
  if (!isActive || symbols.length === 0) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {symbols.map((symbol) => (
        <motion.div
          key={`symbol-${symbol.id}`}
          className="absolute"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            width: `${symbol.size}px`,
            height: `${symbol.size}px`,
            opacity: symbol.opacity,
          }}
          initial={{ rotate: symbol.rotation }}
          animate={{ 
            rotate: symbol.direction === "clockwise" 
              ? symbol.rotation + 360 
              : symbol.rotation - 360 
          }}
          transition={{
            rotate: {
              duration: symbol.rotationDuration,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
        >
          {renderSymbol(symbol)}
        </motion.div>
      ))}
    </div>
  );
}

// Function to render different types of symbols
function renderSymbol(symbol: RotatingSymbol) {
  const { type, color, size } = symbol;
  
  switch (type) {
    case "square":
      return (
        <div 
          style={{ 
            width: '100%', 
            height: '100%', 
            backgroundColor: color,
            border: `1px solid ${color.replace(/[^,]+\)/, '1)')}`, // Make border more visible by setting opacity to 1
            boxShadow: `0 0 ${size/8}px ${color}`
          }} 
        />
      );
      
    case "circle":
      return (
        <div 
          style={{ 
            width: '100%', 
            height: '100%', 
            backgroundColor: color,
            border: `1px solid ${color.replace(/[^,]+\)/, '1)')}`,
            borderRadius: '50%',
            boxShadow: `0 0 ${size/8}px ${color}`
          }} 
        />
      );
      
    case "triangle":
      return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <div 
            style={{
              width: '100%',
              height: '100%',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              backgroundColor: color,
              border: `1px solid ${color.replace(/[^,]+\)/, '1)')}`,
              boxShadow: `0 0 ${size/8}px ${color}`
            }}
          />
        </div>
      );
      
    case "plus":
      return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <div 
            style={{
              width: '30%',
              height: '100%',
              backgroundColor: color,
              position: 'absolute',
              left: '35%',
              boxShadow: `0 0 ${size/8}px ${color}`
            }}
          />
          <div 
            style={{
              width: '100%',
              height: '30%',
              backgroundColor: color,
              position: 'absolute',
              top: '35%',
              boxShadow: `0 0 ${size/8}px ${color}`
            }}
          />
        </div>
      );
      
    case "hexagon":
      return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <div 
            style={{
              width: '100%',
              height: '100%',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              backgroundColor: color,
              border: `1px solid ${color.replace(/[^,]+\)/, '1)')}`,
              boxShadow: `0 0 ${size/8}px ${color}`
            }}
          />
        </div>
      );
      
    default:
      return null;
  }
}

export default RotatingSymbolsBackground;