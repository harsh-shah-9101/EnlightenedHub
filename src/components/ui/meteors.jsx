"use client";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const Meteors = ({
  number,
  className
}) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      {meteors.map((el, idx) => {
        const meteorCount = number || 20;
        const position = idx * (800 / meteorCount) - 400;

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-blue-400 shadow-[0_0_0_1px_#4299e1]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#60a5fa] before:to-transparent before:content-['']",
              className
            )}
            style={{
              top: "-40px",
              left: position + "px",
              animationDelay: Math.random() * 5 + "s",
              animationDuration: Math.floor(Math.random() * (10 - 5) + 5) + "s",
            }}></span>
        );
      })}
    </motion.div>
  );
};
