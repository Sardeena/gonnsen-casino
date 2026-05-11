import React from "react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className, size = 40 }: LogoProps) {
  return (
    <div className={className} style={{ width: size, height: size }}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Frame */}
        <motion.path
          d="M20 10 L80 10 L90 20 L90 80 L80 90 L20 90 L10 80 L10 20 Z"
          stroke="#39FF14"
          strokeWidth="4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Abstract "G" */}
        <motion.path
          d="M70 35 L40 35 L30 45 L30 65 L40 75 L70 75 L75 70 L75 55 L55 55"
          stroke="#39FF14"
          strokeWidth="8"
          strokeLinecap="square"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Decorative Circuit Lines */}
        <motion.circle
          cx="20" cy="20" r="3"
          fill="#39FF14"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1.5, duration: 0.5 }}
        />
        <motion.circle
          cx="80" cy="80" r="3"
          fill="#39FF14"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1.7, duration: 0.5 }}
        />
        
        {/* Pulsing Core */}
        <motion.path
          d="M50 50 L55 50"
          stroke="#39FF14"
          strokeWidth="2"
          animate={{ 
            opacity: [0.3, 1, 0.3],
            strokeWidth: [2, 4, 2]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}
