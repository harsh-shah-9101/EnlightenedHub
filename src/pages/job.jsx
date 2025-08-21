import React, { useState, useEffect } from 'react';
import { IconBriefcase, IconBook, IconPhone, IconSettings, IconHome, IconRobot, IconLogout } from "@tabler/icons-react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconMapPin, IconClock, IconCurrency } from "@tabler/icons-react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { AiIcon } from "../components/ui/ai-icon";
import CustomNotification from '../components/ui/custom-notification';
import { FloatingDock } from "../components/ui/floating-dock";
import { useMediaQuery } from '@mui/material';

const Job = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');
  // Add notification state
  const [notification, setNotification] = useState(null);
  
  const [showNotification, setShowNotification] = useState(false);
  // Add searchQuery state near other state declarations
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  
  // First, add more jobs to the jobs state array
  const [jobs] = useState([
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "TechCorp Solutions",
        location: "Mumbai, India",
        type: "Full-time",
        salary: "₹3.5L - ₹5LPA",
        description: "We're looking for an experienced software engineer to join our team...",
        tags: ["React", "Node.js", "AWS"]
      },
      {
        id: 2,
        title: "UI/UX Designer",
        company: "Creative Studios",
        location: "Bengaluru, India",
        type: "Full-time",
        salary: "₹2.8L - ₹4.2LPA",
        description: "Seeking a talented UI/UX designer to create beautiful user experiences...",
        tags: ["Figma", "Adobe XD", "User Research"]
      },
      {
        id: 3,
        title: "Full Stack Developer",
        company: "Innovation Labs",
        location: "Delhi, India",
        type: "Contract",
        salary: "₹3L - ₹4.5L PA",
        description: "Join our dynamic team building next-generation web applications...",
        tags: ["JavaScript", "Python", "Docker"]
      },
      {
        id: 4,
        title: "DevOps Engineer",
        company: "Cloud Systems Inc",
        location: "Pune, India",
        type: "Full-time",
        salary: "₹3.2L - ₹4.8L PA",
        description: "Looking for a DevOps engineer to streamline our deployment processes...",
        tags: ["Kubernetes", "AWS", "CI/CD"]
      },
      {
        id: 5,
        title: "Data Scientist",
        company: "Analytics Pro",
        location: "Mumbai, India",
        type: "Full-time",
        salary: "₹3.5L - ₹4.8L PA",
        description: "Join our data science team to build predictive models...",
        tags: ["Python", "ML", "SQL"]
      },
      {
        id: 6,
        title: "Mobile Developer", 
        company: "App Innovators",
        location: "Ahmedabad, India",
        type: "Remote",
        salary: "₹3L - ₹4.5L PA",
        description: "Create cutting-edge mobile applications for our clients...",
        tags: ["React Native", "iOS", "Android"]
      },
      {
        id: 7,
        title: "Backend Engineer",
        company: "DataFlow Systems",
        location: "Chennai, India",
        type: "Full-time",
        salary: "₹3.5L - ₹4.8L PA",
        description: "Build scalable backend services and APIs for our enterprise clients...",
        tags: ["Java", "Spring Boot", "MongoDB"]
      },
      {
        id: 8,
        title: "Security Engineer",
        company: "SecureNet",
        location: "Delhi, India",
        type: "Full-time",
        salary: "₹4L - ₹4.9L PA",
        description: "Protect our infrastructure and implement security best practices...",
        tags: ["Cybersecurity", "Penetration Testing", "Security+"]
      },
      {
        id: 9,
        title: "Product Manager",
        company: "Tech Innovations",
        location: "Remote",
        type: "Full-time",
        salary: "₹3.8L - ₹4.7L PA",
        description: "Lead product strategy and work with cross-functional teams...",
        tags: ["Agile", "Product Strategy", "Leadership"]
      },
    
      {
        id: 10,
        title: "ML Engineer",
        company: "AI Solutions",
        location: "Hyderabad, India",
        type: "Full-time",
        salary: "₹4L - ₹5L PA",
        description: "Develop and deploy machine learning models at scale...",
        tags: ["TensorFlow", "PyTorch", "Deep Learning"]
      },
      {
        id: 11,
        title: "Cloud Architect",
        company: "CloudTech",
        location: "Pune, India",
        type: "Remote",
        salary: "₹4.2L - ₹4.9L PA",
        description: "Design and implement cloud-native solutions...",
        tags: ["AWS", "Azure", "GCP"]
      },
      {
        id: 12,
        title: "Frontend Developer",
        company: "WebCraft",
        location: "Gurgaon, India",
        type: "Full-time",
        salary: "₹2.8L - ₹4L PA",
        description: "Create responsive and accessible web applications...",
        tags: ["React", "TypeScript", "Tailwind"]
      },
      {
        id: 13,
        title: "Blockchain Developer",
        company: "CryptoTech",
        location: "Bangalore, India",
        type: "Contract",
        salary: "₹3.6L - ₹4.8L PA",
        description: "Build decentralized applications and smart contracts...",
        tags: ["Solidity", "Web3", "Ethereum"]
      },
      {
        id: 14,
        title: "QA Engineer",
        company: "Quality First",
        location: "Chennai, India",
        type: "Full-time",
        salary: "₹2.5L - ₹3.8L PA",
        description: "Ensure software quality through automated and manual testing...",
        tags: ["Selenium", "Jest", "CI/CD"]
      },
      {
        id: 15,
        title: "Systems Architect",
        company: "Enterprise Solutions",
        location: "Delhi, India",
        type: "Full-time",
        salary: "₹4L - ₹5L PA",
        description: "Design and implement enterprise-level system architecture...",
        tags: ["Microservices", "Docker", "System Design"]
      },
      {
        id: 16,
        title: "Game Developer",
        company: "GameStudio Pro",
        location: "Mumbai, India",
        type: "Full-time",
        salary: "₹2.5L - ₹4L PA",
        description: "Create engaging gaming experiences using modern game engines...",
        tags: ["Unity", "C#", "3D Graphics"]
      }
    ]);

  // Create navigation items for sidebar and floating dock
  const navigationItems = [
    {
      href: "/dashboard",
      title: "Dashboard",
      icon: <IconHome className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => navigate('/dashboard')
    },
    {
      href: "/dashboard/courses",
      title: "My Courses",
      icon: <IconBook className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => navigate('/dashboard/courses')
    },
    {
      href: "/job",
      title: "Job Portal",
      icon: <IconBriefcase className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => navigate('/job')
    },
    {
      href: "/dashboard/support",
      title: "Support",
      icon: <IconPhone className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => navigate('/dashboard/support')
    },
    {
      href: "/dashboard/setting",
      title: "Settings",
      icon: <IconSettings className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => navigate('/dashboard/setting')
    },
    {
      href: "/dashboard/ai-chat",
      title: "AI Chat",
      icon: <IconRobot className="w-5 h-5 text-emerald-500" />,
      onClick: () => navigate('/dashboard/ai-chat')
    },
    {
      href: "/",
      title: "Logout",
      icon: <IconLogout className="w-5 h-5 text-red-500" />,
      onClick: () => {
        localStorage.clear();
        navigate('/');
      }
    }
  ];

  const searchPlaceholders = [
    "Search for Software Engineer jobs...",
    "Find Data Scientist positions...",
    "Looking for UI/UX Designer roles?",
    "Search Full Stack Developer jobs...",
    "Find Remote Work opportunities...",
  ];

  // Update handleSearchChange to use the search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Add a function to filter jobs
  const filteredJobs = jobs.filter(job => {
    if (!searchQuery) return true;
    
    return (
      job.title.toLowerCase().includes(searchQuery) ||
      job.company.toLowerCase().includes(searchQuery) ||
      job.description.toLowerCase().includes(searchQuery) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
      job.location.toLowerCase().includes(searchQuery)
    );
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted');
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Add handleApply function
  const handleApply = (job) => {
    setNotification({
      type: 'success',
      title: 'Application Submitted!',
      message: `Your application for ${job.title} at ${job.company} has been submitted.`
    });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Add notification component at the top level */}
      {notification && (
        <CustomNotification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Sidebar - Only visible on desktop */}
      {!isMobile && (
        <Sidebar>
          <SidebarBody>
            {navigationItems.map((link) => (
              <SidebarLink 
                key={link.title} 
                link={link} 
              />
            ))}
          </SidebarBody>
        </Sidebar>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative">
        <div className="min-h-screen bg-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  'radial-gradient(600px at 0% 0%, rgb(59 130 246 / 0.15) 0%, transparent 80%)',
                  'radial-gradient(600px at 100% 0%, rgb(59 130 246 / 0.15) 0%, transparent 80%)',
                  'radial-gradient(600px at 100% 100%, rgb(59 130 246 / 0.15) 0%, transparent 80%)',
                  'radial-gradient(600px at 0% 100%, rgb(59 130 246 / 0.15) 0%, transparent 80%)',
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
                background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgb(59 130 246 / 0.15), transparent 80%)`,
              }}
            />
          </div>

          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, rgb(59 130 246 / 0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgb(59 130 246 / 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />

          <div className="relative z-10">
            {/* Header with fixed search bar */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 pt-3 md:pt-6 pb-2 md:pb-4 px-3 md:px-6 border-b border-gray-100 shadow-sm">
              <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-3 md:mb-6">
                  <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-600 mb-2 md:mb-4">
                    Find Your Dream Job
                  </h1>
                  <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                    Discover opportunities that match your skills and aspirations
                  </p>
                </div>

                {/* Search Section - Fixed with enhanced styling */}
                <div className="max-w-3xl mx-auto px-2 md:px-4">
                  <div className="bg-white rounded-xl p-2 shadow-md border border-gray-100">
                    <PlaceholdersAndVanishInput
                      placeholders={searchPlaceholders}
                      onChange={handleSearchChange}
                      onSubmit={handleSearchSubmit}
                    />
                    <div className="flex flex-wrap gap-2 mt-2 justify-center">
                      <button 
                        onClick={() => setSearchQuery("remote")}
                        className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full text-xs transition-colors"
                      >
                        Remote
                      </button>
                      <button 
                        onClick={() => setSearchQuery("full-time")}
                        className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full text-xs transition-colors"
                      >
                        Full-time
                      </button>
                      <button 
                        onClick={() => setSearchQuery("developer")}
                        className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full text-xs transition-colors"
                      >
                        Developer
                      </button>
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-full text-xs transition-colors"
                      >
                        All Jobs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Job Listings */}
            <div className="p-3 md:p-6 pt-4">
              <div className="max-w-7xl mx-auto">
                {/* Results count */}
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-medium text-gray-700">{filteredJobs.length}</span> job{filteredJobs.length !== 1 ? 's' : ''}
                    {searchQuery && <span> for "<span className="text-blue-600">{searchQuery}</span>"</span>}
                  </p>
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-gray-500 hover:text-gray-800 underline"
                    >
                      Clear search
                    </button>
                  )}
                </div>
                
                {/* Job Cards */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pb-20 md:pb-6"
                  layout
                >
                  {filteredJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      layout
                      className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-lg p-3 md:p-4 hover:border-blue-500/50 transition-all shadow-sm"
                    >
                      <div className="space-y-2 md:space-y-3">
                        <div>
                          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-0.5">{job.title}</h3>
                          <p className="text-blue-600 text-xs md:text-sm">{job.company}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center text-gray-600 text-xs md:text-sm">
                            <IconMapPin size={16} className="mr-1.5" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-gray-600 text-xs md:text-sm">
                            <IconClock size={16} className="mr-1.5" />
                            {job.type}
                          </div>
                          <div className="flex items-center text-gray-600 text-xs md:text-sm">
                            <IconCurrency size={16} className="mr-1.5" />
                            {job.salary}
                          </div>
                        </div>

                        <p className="text-gray-600 text-xs md:text-sm line-clamp-2">{job.description}</p>

                        <div className="flex flex-wrap gap-1 md:gap-1.5">
                          {job.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-1.5 md:px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-[10px] md:text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => handleApply(job)}
                          className="w-full py-1 md:py-1.5 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-xs md:text-sm"
                        >
                          Apply Now
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Dock - Only visible on mobile */}
      {isMobile && (
        <FloatingDock
          items={navigationItems}
          mobileClassName="fixed bottom-4 right-4 z-50"
          desktopClassName="hidden" // Hide on desktop
        />
      )}
    </div>
  );
};

export default Job;