import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Base Circle with gradient */}
      <motion.path
        d="M50 5C25.147 5 5 25.147 5 50s20.147 45 45 45 45-20.147 45-45S74.853 5 50 5z"
        fill="url(#gradient-primary)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.g>
        {/* Top curve */}
        <motion.path
          d="M25 35c0 0 15 -8 30 0"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        {/* Right vertical line */}
        <motion.path
          d="M55 35v20"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
        />
        {/* Left vertical line */}
        <motion.path
          d="M25 35v20"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
        />
        {/* Bottom connecting curve */}
        <motion.path
          d="M25 55c0 0 15 8 30 0"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
        />
        {/* Middle horizontal line */}
        <motion.path
          d="M25 45h30"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}
        />
      </motion.g>

      {/* AI Neural Network Nodes */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <circle cx="70" cy="30" r="3" fill="white" />
        <circle cx="70" cy="50" r="3" fill="white" />
        <circle cx="70" cy="70" r="3" fill="white" />
        <circle cx="85" cy="40" r="3" fill="white" />
        <circle cx="85" cy="60" r="3" fill="white" />
      </motion.g>

      {/* Neural Network Connections */}
      <motion.g
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <line x1="70" y1="30" x2="85" y2="40" />
        <line x1="70" y1="50" x2="85" y2="40" />
        <line x1="70" y1="50" x2="85" y2="60" />
        <line x1="70" y1="70" x2="85" y2="60" />
      </motion.g>

      {/* Blockchain Elements */}
      <motion.path
        d="M15 50l10-10h15l10 10-10 10h-15l-10-10z"
        stroke="white"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* AI Pulse Effect */}
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.3"
        fill="none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1.2,
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gradients */}
      <defs>
        <linearGradient
          id="gradient-primary"
          x1="5"
          y1="5"
          x2="95"
          y2="95"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF6B6B" />
          <stop offset="0.5" stopColor="#4ECDC4" />
          <stop offset="1" stopColor="#45B7D1" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}
