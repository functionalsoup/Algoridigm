import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CodeGibberishProps {
  scrollPercentage: number; // Value between 0 and 1, representing scroll progress
}

// Random error types that will appear in the gibberish code
const errorTypes = [
  'TypeError',
  'SyntaxError',
  'ReferenceError',
  'RangeError',
  'EvalError',
  'URIError',
  'InternalError',
  'SegmentationFault',
  'StackOverflowError',
  'NullPointerException',
  'OutOfMemoryError',
  'IllegalArgumentException',
  'ConcurrentModificationException',
  'ArithmeticException'
];

// Code-like symbols and keywords to use in the gibberish
const codeSymbols = [
  '{', '}', '[', ']', '(', ')', '<', '>', ';', '=', '==', '===', '!==', '!=', '+', '-', '*', '/', '%',
  '&&', '||', '!', '&', '|', '^', '~', '>>', '<<', '>>>', '+=', '-=', '*=', '/=', '%=', '++', '--',
  '=>', '...', '.', ','
];

const codeKeywords = [
  'function', 'return', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'do', 'switch', 'case',
  'break', 'continue', 'default', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'class',
  'extends', 'implements', 'import', 'export', 'from', 'as', 'async', 'await', 'static', 'get', 'set',
  'interface', 'type', 'enum', 'namespace', 'module', 'package', 'boolean', 'number', 'string', 'null',
  'undefined', 'true', 'false', 'void', 'any', 'never', 'unknown'
];

// Generate a random identifier (variable/function name)
const generateIdentifier = () => {
  const prefixes = ['get', 'set', 'is', 'has', 'create', 'update', 'delete', 'handle', 'process', 'compute', 'calculate', 'render', 'parse', 'format', 'validate', 'fetch', 'load', 'save', 'send', 'receive'];
  const roots = ['User', 'Data', 'Event', 'Component', 'Element', 'Node', 'Item', 'Object', 'Value', 'Config', 'State', 'Prop', 'Action', 'Reducer', 'Store', 'Context', 'Provider', 'Consumer', 'Hook', 'Util'];
  const suffixes = ['Callback', 'Handler', 'Listener', 'Observer', 'Factory', 'Builder', 'Service', 'Manager', 'Controller', 'Helper', 'Wrapper', 'Container', 'Provider', 'Client', 'Server', 'Api', 'Repository', 'Storage', 'Cache', 'Buffer'];
  
  const useCamelCase = Math.random() > 0.5;
  
  if (useCamelCase) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const root = roots[Math.floor(Math.random() * roots.length)];
    return `${prefix}${root}`;
  } else {
    const root = roots[Math.floor(Math.random() * roots.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${root}${suffix}`;
  }
};

// Generate a line of gibberish code
const generateCodeLine = (errorLevel: number) => {
  const errorProbability = Math.min(errorLevel * 0.8, 0.8); // Cap at 80% chance
  const isError = Math.random() < errorProbability;
  
  if (isError) {
    const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    const lineNo = Math.floor(Math.random() * 1000);
    
    // Pick a random error message style
    const messageStyles = [
      `${errorType}: Unexpected token at line ${lineNo}`,
      `${errorType}: Cannot read property of undefined`,
      `${errorType}: ${generateIdentifier()} is not a function`,
      `${errorType}: Invalid or unexpected token`,
      `${errorType}: Unhandled promise rejection at ${generateIdentifier()}`,
      `${errorType}: Illegal operation on ${generateIdentifier()}`,
      `${errorType}: Maximum call stack size exceeded at ${generateIdentifier()}`,
      `Failed to compile: ${errorType} in ${generateIdentifier()}.tsx`
    ];
    
    return {
      text: messageStyles[Math.floor(Math.random() * messageStyles.length)],
      isError: true
    };
  } else {
    // Indent randomly
    const indent = '  '.repeat(Math.floor(Math.random() * 4));
    
    // Generate a random code-like line
    const lineTypes = ['variable', 'function', 'condition', 'return', 'comment', 'bracket'];
    const lineType = lineTypes[Math.floor(Math.random() * lineTypes.length)];
    
    let line = '';
    
    switch (lineType) {
      case 'variable':
        const varType = Math.random() > 0.6 ? 'const' : (Math.random() > 0.5 ? 'let' : 'var');
        const identifier = generateIdentifier();
        const value = Math.random() > 0.7 ? 
          `${Math.random() > 0.5 ? 'new ' : ''}${generateIdentifier()}(${Math.random() > 0.5 ? generateIdentifier() : ''})` : 
          (Math.random() > 0.5 ? `"${generateIdentifier()}"` : Math.floor(Math.random() * 1000));
        line = `${varType} ${identifier} = ${value};`;
        break;
      
      case 'function':
        const funcName = generateIdentifier();
        const paramCount = Math.floor(Math.random() * 4);
        const params = Array(paramCount).fill(0).map(() => generateIdentifier()).join(', ');
        line = `function ${funcName}(${params}) {`;
        break;
      
      case 'condition':
        const condition = Math.random() > 0.5 ? 
          `${generateIdentifier()} ${Math.random() > 0.5 ? '===' : '!=='} ${Math.random() > 0.5 ? generateIdentifier() : 'null'}` :
          `typeof ${generateIdentifier()} ${Math.random() > 0.5 ? '===' : '!=='} "${Math.random() > 0.5 ? 'object' : 'function'}"`;
        line = `if (${condition}) {`;
        break;
      
      case 'return':
        const returnValue = Math.random() > 0.5 ? 
          generateIdentifier() : 
          (Math.random() > 0.5 ? '{ ' + generateIdentifier() + ': ' + generateIdentifier() + ' }' : 'null');
        line = `return ${returnValue};`;
        break;
      
      case 'comment':
        line = `// TODO: Fix ${generateIdentifier()} to prevent ${errorTypes[Math.floor(Math.random() * errorTypes.length)]}`;
        break;
      
      case 'bracket':
        line = `}`;
        break;
    }
    
    return {
      text: indent + line,
      isError: false
    };
  }
};

// Generate multiple lines of code
const generateCodeBlock = (lineCount: number, errorLevel: number) => {
  return Array(lineCount).fill(0).map(() => generateCodeLine(errorLevel));
};

export function CodeGibberish({ scrollPercentage }: CodeGibberishProps) {
  const [codeBlock, setCodeBlock] = useState<Array<{ text: string, isError: boolean }>>([]);
  
  // Regenerate code when scroll percentage changes significantly
  useEffect(() => {
    // Number of lines increases with scroll percentage
    const baseLines = 3;
    const maxExtraLines = 20;
    const lineCount = baseLines + Math.floor(scrollPercentage * maxExtraLines);
    
    // Error level increases with scroll percentage
    const errorLevel = scrollPercentage * 1.5; // Can go above 1 for maximum chaos
    
    setCodeBlock(generateCodeBlock(lineCount, errorLevel));
  }, [scrollPercentage]);
  
  // Add increasing visual glitching based on scroll percentage
  const glitchIntensity = {
    x: Math.max(0, scrollPercentage - 0.3) * 20, // X distortion
    opacity: 1 - (Math.max(0, scrollPercentage - 0.8) * 2), // Fade out at the very end
    filter: `blur(${scrollPercentage * 1.5}px) contrast(${100 + scrollPercentage * 200}%)` // Increasing blur and contrast
  };
  
  return (
    <motion.div 
      className="code-gibberish text-left font-mono text-xs sm:text-sm leading-tight overflow-hidden w-full"
      style={{
        marginTop: `${20 + scrollPercentage * 50}px`,
        maxHeight: `${100 + scrollPercentage * 500}px`,
        opacity: Math.min(scrollPercentage * 3, 1),
      }}
    >
      {codeBlock.map((line, index) => (
        <motion.div 
          key={index}
          className={`code-line ${line.isError ? 'text-red-500 font-bold' : 'text-corp-green'}`}
          initial={{ x: 0 }}
          animate={{ 
            x: line.isError ? [0, -2, 0, 2, 0] : 0,
            filter: line.isError ? 'brightness(1.2)' : 'none'
          }}
          transition={{
            x: {
              duration: 0.1,
              repeat: line.isError ? Infinity : 0,
              repeatType: "mirror"
            }
          }}
          style={{
            transform: `translateX(${line.isError ? Math.random() * glitchIntensity.x - glitchIntensity.x/2 : 0}px)`,
            textShadow: line.isError ? '0 0 5px rgba(255, 0, 0, 0.7)' : 'none',
            filter: !line.isError && scrollPercentage > 0.5 ? glitchIntensity.filter : 'none',
            opacity: Math.min(1, glitchIntensity.opacity + (line.isError ? 0.3 : 0)),
            borderBottom: line.isError && scrollPercentage > 0.7 ? '1px solid rgba(255, 0, 0, 0.3)' : 'none'
          }}
        >
          {line.text}
        </motion.div>
      ))}
    </motion.div>
  );
}