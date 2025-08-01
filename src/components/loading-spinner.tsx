"use client";

import { Loader } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export default function LoadingSpinner({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
}: LoadingSpinnerProps) {
  return (
    <motion.div
      className={className}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <Loader size={size} color={color} strokeWidth={strokeWidth} />
    </motion.div>
  );
}
