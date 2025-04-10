import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DarkAnimatedBackground = ({ children }) => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">


      {/* Animated gradient overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(600px at 0% 0%, rgba(29, 78, 216, 0.15) 0%, transparent 70%)',
              'radial-gradient(600px at 100% 0%, rgba(30, 64, 175, 0.15) 0%, transparent 70%)',
              'radial-gradient(600px at 100% 100%, rgba(17, 24, 39, 0.15) 0%, transparent 70%)',
              'radial-gradient(600px at 0% 100%, rgba(55, 65, 81, 0.15) 0%, transparent 70%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.1), transparent 70%)`,
          }}
        />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, #1e3a8a 1px, transparent 1px),
                           linear-gradient(to bottom, #1e3a8a 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DarkAnimatedBackground;