import React, { useState, useEffect } from 'react';
import { IconBriefcase, IconBook, IconPhone, IconSettings, IconHome } from "@tabler/icons-react";
import { FloatingDock } from '../components/ui/floating-dock';
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Job = () => {
  const navigate = useNavigate();

  const navigationItems = [
    {
      title: "Home",
      href: "/dashboard",
      onClick: () => navigate('/dashboard'),
      icon: <IconHome className="text-neutral-500 dark:text-neutral-400" />,
    },

    {
      title: "Resources",
      href: "/resources",
      onClick: () => navigate('/resources'),
      icon: <IconBook className="text-neutral-500 dark:text-neutral-400" />,
    },
    {
      title: "Contact",
      href: "/contact",
      onClick: () => navigate('/contact'),
      icon: <IconPhone className="text-neutral-500 dark:text-neutral-400" />,
    },
    {
      title: "Setting",
      href: "/dashboard/setting",  // Update path to match your route structure
      onClick: () => navigate('/dashboard/setting'),  // Update navigation path
      icon: <IconSettings className="text-neutral-500 dark:text-neutral-400" />,
    }
  ];

  const searchPlaceholders = [
    "Search for Software Engineer jobs...",
    "Find Data Scientist positions...",
    "Looking for UI/UX Designer roles?",
    "Search Full Stack Developer jobs...",
    "Find Remote Work opportunities...",
  ];

  const handleSearchChange = (e) => {
    console.log('Search value:', e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted');
  };

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
      {/* Close Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute top-6 left-6 z-20 group flex items-center justify-center [transition:all_0.5s_ease] rounded-[0.375rem] p-[5px] cursor-pointer border border-white/30 outline-none focus-visible:outline-0 text-white hover:border-white/60"
      >
        <svg
          fill="currentColor"
          stroke="none"
          strokeWidth="0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 overflow-visible [transition:transform_.35s_ease] group-hover:[transition-delay:.25s] [&_path]:[transition:transform_.35s_ease] group-hover:rotate-45"
        >
          <path
            className="group-hover:[transform:rotate(112.5deg)_translate(-27.2%,-80.2%)]"
            d="m3.45,8.83c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L14.71,2.08c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L3.84,8.75c-.13.05-.25.08-.38.08Z"
          ></path>
          <path
            className="group-hover:[transform:rotate(22.5deg)_translate(15.5%,-23%)]"
            d="m2.02,17.13c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L21.6,6.94c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L2.4,17.06c-.13.05-.25.08-.38.08Z"
          ></path>
          <path
            className="group-hover:[transform:rotate(112.5deg)_translate(-15%,-149.5%)]"
            d="m8.91,21.99c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31l11.64-4.82c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31l-11.64,4.82c-.13.05-.25.08-.38.08Z"
          ></path>
        </svg>
      </button>

      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(600px at 0% 0%, rgb(16 185 129 / 0.15) 0%, transparent 80%)',
              'radial-gradient(600px at 100% 0%, rgb(16 185 129 / 0.15) 0%, transparent 80%)',
              'radial-gradient(600px at 100% 100%, rgb(16 185 129 / 0.15) 0%, transparent 80%)',
              'radial-gradient(600px at 0% 100%, rgb(16 185 129 / 0.15) 0%, transparent 80%)',
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
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgb(16 185 129 / 0.15), transparent 80%)`,
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(16 185 129 / 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgb(16 185 129 / 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10">
        {/* Main Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600 mb-4">
                Find Your Dream Job
              </h1>
              <p className="text-neutral-400 max-w-2xl mx-auto mb-8">
                Discover opportunities that match your skills and aspirations
              </p>
            </div>

            {/* Search Section */}
            <div className="max-w-3xl mx-auto px-4">
              <PlaceholdersAndVanishInput
                placeholders={searchPlaceholders}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
              />
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add your job cards here */}
            </div>
          </div>
        </div>

        {/* Floating Navigation */}
        <FloatingDock
          items={navigationItems}
          desktopClassName="fixed bottom-8 left-1/2 -translate-x-1/2 shadow-lg shadow-black/20"
          mobileClassName="fixed bottom-8 right-8 shadow-lg shadow-black/20"
        />
      </div>
    </div>
  );
};

export default Job;