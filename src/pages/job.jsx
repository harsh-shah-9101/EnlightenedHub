import React, { useState, useEffect } from 'react';
import { IconBriefcase, IconBook, IconPhone, IconSettings, IconHome, IconRobot, IconLogout } from "@tabler/icons-react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconMapPin, IconClock, IconCurrency } from "@tabler/icons-react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { AiIcon } from "../components/ui/ai-icon";

const Job = () => {
  const navigate = useNavigate();
  // Add searchQuery state near other state declarations
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  
  // First, add more jobs to the jobs state array
  const [jobs] = useState([
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "TechCorp Solutions",
        location: "New York, NY",
        type: "Full-time",
        salary: "$120k - $150k",
        description: "We're looking for an experienced software engineer to join our team...",
        tags: ["React", "Node.js", "AWS"]
      },
      {
        id: 2,
        title: "UI/UX Designer",
        company: "Creative Studios",
        location: "Remote",
        type: "Full-time",
        salary: "$90k - $120k",
        description: "Seeking a talented UI/UX designer to create beautiful user experiences...",
        tags: ["Figma", "Adobe XD", "User Research"]
      },
      {
        id: 3,
        title: "Full Stack Developer",
        company: "Innovation Labs",
        location: "San Francisco, CA",
        type: "Contract",
        salary: "$100k - $130k",
        description: "Join our dynamic team building next-generation web applications...",
        tags: ["JavaScript", "Python", "Docker"]
      },
      {
        id: 4,
        title: "DevOps Engineer",
        company: "Cloud Systems Inc",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$110k - $140k",
        description: "Looking for a DevOps engineer to streamline our deployment processes...",
        tags: ["Kubernetes", "AWS", "CI/CD"]
      },
      {
        id: 5,
        title: "Data Scientist",
        company: "Analytics Pro",
        location: "Boston, MA",
        type: "Full-time",
        salary: "$115k - $145k",
        description: "Join our data science team to build predictive models...",
        tags: ["Python", "ML", "SQL"]
      },
      {
        id: 6,
        title: "Mobile Developer",
        company: "App Innovators",
        location: "Seattle, WA",
        type: "Remote",
        salary: "$100k - $130k",
        description: "Create cutting-edge mobile applications for our clients...",
        tags: ["React Native", "iOS", "Android"]
      },
      {
        id: 7,
        title: "Backend Engineer",
        company: "DataFlow Systems",
        location: "Chicago, IL",
        type: "Full-time",
        salary: "$115k - $140k",
        description: "Build scalable backend services and APIs for our enterprise clients...",
        tags: ["Java", "Spring Boot", "MongoDB"]
      },
      {
        id: 8,
        title: "Security Engineer",
        company: "SecureNet",
        location: "Washington, DC",
        type: "Full-time",
        salary: "$130k - $160k",
        description: "Protect our infrastructure and implement security best practices...",
        tags: ["Cybersecurity", "Penetration Testing", "Security+"]
      },
      {
        id: 9,
        title: "Product Manager",
        company: "Tech Innovations",
        location: "Remote",
        type: "Full-time",
        salary: "$125k - $155k",
        description: "Lead product strategy and work with cross-functional teams...",
        tags: ["Agile", "Product Strategy", "Leadership"]
      },
      {
        id: 10,
        title: "ML Engineer",
        company: "AI Solutions",
        location: "San Jose, CA",
        type: "Full-time",
        salary: "$140k - $170k",
        description: "Develop and deploy machine learning models at scale...",
        tags: ["TensorFlow", "PyTorch", "Deep Learning"]
      },
      {
        id: 11,
        title: "Cloud Architect",
        company: "CloudTech",
        location: "Denver, CO",
        type: "Remote",
        salary: "$135k - $165k",
        description: "Design and implement cloud-native solutions...",
        tags: ["AWS", "Azure", "GCP"]
      },
      {
        id: 12,
        title: "Frontend Developer",
        company: "WebCraft",
        location: "Portland, OR",
        type: "Full-time",
        salary: "$95k - $125k",
        description: "Create responsive and accessible web applications...",
        tags: ["React", "TypeScript", "Tailwind"]
      },
      {
        id: 13,
        title: "Blockchain Developer",
        company: "CryptoTech",
        location: "Miami, FL",
        type: "Contract",
        salary: "$120k - $150k",
        description: "Build decentralized applications and smart contracts...",
        tags: ["Solidity", "Web3", "Ethereum"]
      },
      {
        id: 14,
        title: "QA Engineer",
        company: "Quality First",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$85k - $110k",
        description: "Ensure software quality through automated and manual testing...",
        tags: ["Selenium", "Jest", "CI/CD"]
      },
      {
        id: 15,
        title: "Systems Architect",
        company: "Enterprise Solutions",
        location: "Houston, TX",
        type: "Full-time",
        salary: "$130k - $160k",
        description: "Design and implement enterprise-level system architecture...",
        tags: ["Microservices", "Docker", "System Design"]
      },
      {
        id: 16,
        title: "Game Developer",
        company: "GameStudio Pro",
        location: "Los Angeles, CA",
        type: "Full-time",
        salary: "$100k - $130k",
        description: "Create engaging gaming experiences using modern game engines...",
        tags: ["Unity", "C#", "3D Graphics"]
      }
    ]);

  // Create sidebar links matching dashboard format
  const sidebarLinks = [
    {
      href: "/dashboard",
      title: "Dashboard",
      icon: <IconHome className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
    },
    {
      href: "/dashboard/courses",
      title: "My Courses",
      icon: <IconBook className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
    },
    {
      href: "/job",
      title: "Job Portal",
      icon: <IconBriefcase className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
    },
    {
      href: "/dashboard/support",
      title: "Support",
      icon: <IconPhone className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
    },
    {
      href: "/dashboard/setting",
      title: "Settings",
      icon: <IconSettings className="w-5 h-5" />
    },
    {
      href: "/dashboard/ai-chat",
      title: "AI Chat",
      icon: <AiIcon className="w-5 h-5 text-emerald-500" />
    },
    {
      href: "/",
      title: "Logout",
      icon: <IconLogout className="w-5 h-5 text-red-500" />,
      onClick: () => {
        localStorage.removeItem('token');
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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Using the same structure as dashboard */}
      <Sidebar>
        <SidebarBody>
          {sidebarLinks.map((link) => (
            <SidebarLink 
              key={link.title} 
              link={link} 
            />
          ))}
        </SidebarBody>
      </Sidebar>

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
            {/* Main Content */}
            <div className="p-6">
              <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-600 mb-4">
                    Find Your Dream Job
                  </h1>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-8">
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

                {/* Job Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {filteredJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-lg p-4 hover:border-blue-500/50 transition-all shadow-sm"
                    >
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-0.5">{job.title}</h3>
                          <p className="text-blue-600 text-sm">{job.company}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center text-gray-600 text-sm">
                            <IconMapPin size={16} className="mr-1.5" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <IconClock size={16} className="mr-1.5" />
                            {job.type}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <IconCurrency size={16} className="mr-1.5" />
                            {job.salary}
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>

                        <div className="flex flex-wrap gap-1.5">
                          {job.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => console.log(`Applied to ${job.title}`)}
                          className="w-full py-1.5 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                        >
                          Apply Now
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;