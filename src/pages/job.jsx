import React, { useState, useEffect } from 'react';
import { IconBriefcase, IconBook, IconPhone, IconSettings, IconHome } from "@tabler/icons-react";
import { FloatingDock } from '../components/ui/floating-dock';
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconMapPin, IconClock, IconCurrency } from "@tabler/icons-react";

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
        className="absolute inset-0 z-0 opacity-20"
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
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-500 mb-4">
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

            {/* Update the Content Area to use filteredJobs instead of jobs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-lg p-4 hover:border-blue-500/50 transition-all"
                >
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-0.5">{job.title}</h3>
                      <p className="text-blue-400 text-sm">{job.company}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center text-neutral-400 text-sm">
                        <IconMapPin size={16} className="mr-1.5" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-neutral-400 text-sm">
                        <IconClock size={16} className="mr-1.5" />
                        {job.type}
                      </div>
                      <div className="flex items-center text-neutral-400 text-sm">
                        <IconCurrency size={16} className="mr-1.5" />
                        {job.salary}
                      </div>
                    </div>

                    <p className="text-neutral-400 text-sm line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {job.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full text-xs"
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