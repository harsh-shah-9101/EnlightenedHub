import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { IconHome, IconBook, IconBriefcase, IconPhone, IconSettings, IconLogout, IconRobot } from "@tabler/icons-react";
import { AuroraBackground } from "../components/ui/aurora-background";
import { useNavigate } from 'react-router-dom';
import { MultiStepLoader } from "../components/ui/multi-step-loader";
import { FloatingDock } from "../components/ui/floating-dock";
import { useState, useEffect } from 'react';
import LoadingTransition from './loading-transition';

function Dashboard() {
    const navigate = useNavigate();

    // Convert sidebarLinks to dockItems
    const dockItems = [
        {
            href: "/dashboard",
            title: "Dashboard",
            icon: <IconHome className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
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

    return (
        <> 
            
            <div className="flex h-screen overflow-hidden">
                {/* Video Background - Optimized with Loading States */}
                <div className="fixed inset-0 -z-10 bg-neutral-900">
                    <div 
                        className="absolute inset-0 bg-black/50"
                        style={{ mixBlendMode: 'multiply' }}
                    />
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster="/images/video-poster.jpg"
                        className="w-full h-full object-cover opacity-0 transition-opacity duration-1000"
                        onLoadedData={(e) => {
                            e.target.classList.remove('opacity-0');
                            e.target.classList.add('opacity-100');
                        }}
                    >
                        <source 
                            src="/videos/vecteezy_abstract-grey-and-black-professional-motion-background_34700930.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>

                <style jsx global>{`
                    /* Custom Scrollbar Styling */
                    ::-webkit-scrollbar {
                        width: 10px;
                    }
                    
                    ::-webkit-scrollbar-track {
                        background: rgba(15, 15, 15, 0.8);
                        backdrop-filter: blur(10px);
                    }
                    
                    ::-webkit-scrollbar-thumb {
                        background: rgba(30, 30, 30, 0.9);
                        border-radius: 5px;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    
                    ::-webkit-scrollbar-thumb:hover {
                        background: rgba(40, 40, 40, 0.9);
                    }
                `}</style>

                {/* Replace entire Sidebar section with FloatingDock */}
                <FloatingDock 
                    items={dockItems}
                    desktopClassName="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
                    mobileClassName="fixed bottom-8 right-8 z-50"
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto relative">
                    <div className="max-w-7xl mx-auto p-6 pb-32">
                        {/* Make the header sticky with blur effect and top margin */}
                        <div className="flex items-center justify-between rounded-full mb-8 sticky top-4 py-3 z-40" style={{
                            backgroundColor: 'rgba(30, 30, 30, 0.4)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            marginLeft: '-1.5rem',
                            marginRight: '-1.5rem',
                            paddingLeft: '1.5rem',
                            paddingRight: '1.5rem',
                        }}>
                            <h1 className="text-2xl font-semibold text-neutral-800 dark:text-white">Dashboard</h1>
                            <div className="flex items-center gap-4">
                                <img 
                                    src={localStorage.getItem('profilePic') || 'https://via.placeholder.com/40'} 
                                    alt="Profile" 
                                    className="w-10 h-10 rounded-full object-cover border-2 border-neutral-700 flex-shrink-0"
                                />
                            </div>
                        </div>

                        {/* Dashboard Content */}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Course Progress Card */}
                            <div className="rounded-xl p-6 shadow-sm" style={{
                                backgroundColor: 'rgba(30, 30, 30, 0.4)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Current Course</h3>
                                        <p className="text-lg font-semibold text-neutral-800 dark:text-white mt-1">React Fundamentals</p>
                                    </div>
                                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">In Progress</span>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-neutral-600 dark:text-neutral-400">Progress</span>
                                        <span className="text-neutral-800 dark:text-white">65%</span>
                                    </div>
                                    <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full">
                                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Next: Advanced Components</span>
                                    <button className="text-sm text-blue-500 hover:text-blue-600">Continue</button>
                                </div>
                            </div>

                            {/* Popular Courses Card */}
                            <div className="rounded-xl p-6 shadow-sm" style={{
                                backgroundColor: 'rgba(30, 30, 30, 0.4)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-4">Popular Courses</h3>
                                <div className="space-y-3">
                                    {['Node.js Mastery', 'Python for AI', 'Web Security'].map((course, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <span className="text-sm text-neutral-800 dark:text-white">{course}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <button 
                                    onClick={() => navigate('/dashboard/courses')} 
                                    className="mt-4 text-sm text-blue-500 hover:text-blue-600"
                                >
                                    View All Courses
                                </button>
                            </div>

                            {/* Achievement Card */}
                            <div className="rounded-xl p-6 shadow-sm" style={{
                                backgroundColor: 'rgba(30, 30, 30, 0.4)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-4">Recent Achievements</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <IconBook className="w-4 h-4 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-neutral-800 dark:text-white">Course Completed</p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">JavaScript Basics</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categorized Courses */}

                        <div className="mt-12">
                            <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-8">
                                Explore Our Course Categories
                            </h2>

                            {/* Frontend Development */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Frontend Development</h3>
                                    <button 
                                        onClick={() => navigate('/dashboard/my-courses')} 
                                        className="text-sm text-blue-500 hover:text-blue-600"
                                    >
                                        View All
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {[
                                        {
                                            id: "fe1",
                                            title: "React.js Complete Guide",
                                            category: "Frontend",
                                            imageName: "react",
                                            status: "Add to My course",
                                            instructor: "Sarah Miller",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        },
                                        {
                                            id: "fe2",
                                            title: "Vue.js for Beginners",
                                            category: "Frontend",
                                            imageName: "vue",
                                            status: "Add to My course",
                                            instructor: "John Chen",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        },
                                        {
                                            id: "fe3",
                                            title: "Angular Essentials",
                                            category: "Frontend",
                                            imageName: "angular",
                                            status: "Add to My course",
                                            instructor: "Emma Thompson",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        },
                                        {
                                            id: "fe4",
                                            title: "Modern CSS Techniques",
                                            category: "Frontend",
                                            imageName: "css",
                                            status: "Add to My course",
                                            instructor: "Mark Wilson",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        }
                                    ].map((course) => (
                                        <div key={course.id} className="group rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300" style={{
                                            backgroundColor: 'rgba(30, 30, 30, 0.4)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)'
                                        }}>
                                            <div className="aspect-video relative overflow-hidden">
                                                <img
                                                    src="https://img.freepik.com/free-vector/brain-with-digital-circuit-programmer-with-laptop-machine-learning-artificial-intelligence-digital-brain-artificial-thinking-process-concept-vector-isolated-illustration_335657-2246.jpg?t=st=1743678912~exp=1743682512~hmac=f83f9a80a29aca93f14eb654d24cc4f6fdc23384eec36138db918796fcf37d23&w=1380"
                                                    alt={course.title}
                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {course.price === "FREE" && (
                                                    <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                                                        {course.price}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-zinc-400">{course.category}</span>
                                                    <span className="text-xs text-neutral-400">{course.instructor}</span>
                                                </div>
                                                <h3 className="text-white text-sm font-medium mt-2 line-clamp-2">
                                                    {course.title}
                                                </h3>
                                                <button 
                                                    onClick={() => {
                                                        // Store the course in localStorage
                                                        const existingCourses = JSON.parse(localStorage.getItem('myCourses') || '[]');
                                                        const isCourseExists = existingCourses.some(c => c.id === course.id);
                                                        
                                                        if (!isCourseExists) {
                                                            existingCourses.push(course);
                                                            localStorage.setItem('myCourses', JSON.stringify(existingCourses));
                                                            if (window.confirm('Course added successfully! Go to My Courses?')) {
                                                                navigate('/dashboard/courses');
                                                            }
                                                        } else {
                                                            alert('Course already in your list!');
                                                        }
                                                    }} 
                                                    className="inline-block mt-3 text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-900"
                                                >
                                                    {course.status}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Backend Development */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Backend Development</h3>
                                    <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {[
                                        {
                                            id: "be1",
                                            title: "Node.js & Express Masterclass",
                                            category: "Backend",
                                            imageName: "nodejs-express",
                                            status: "Add to My course",
                                            instructor: "Mike Ross",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        },
                                        {
                                            id: "be2",
                                            title: "Python Django Framework",
                                            category: "Backend",
                                            imageName: "django",
                                            status: "Add to My course",
                                            instructor: "Lisa Wang",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        },
                                        {
                                            id: "be3",
                                            title: "Ruby on Rails Development",
                                            category: "Backend",
                                            imageName: "rails",
                                            status: "Add to My course",
                                            instructor: "David Smith",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        },
                                        {
                                            id: "be4",
                                            title: "PHP Laravel Framework",
                                            category: "Backend",
                                            imageName: "laravel",
                                            status: "Add to My course",
                                            instructor: "Anna Brown",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        }
                                    ].map((course) => (
                                        <div key={course.id} className="group rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300" style={{
                                            backgroundColor: 'rgba(30, 30, 30, 0.4)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)'
                                        }}>
                                            <div className="aspect-video relative overflow-hidden">
                                                <img
                                                    src="https://img.freepik.com/free-vector/brain-with-digital-circuit-programmer-with-laptop-machine-learning-artificial-intelligence-digital-brain-artificial-thinking-process-concept-vector-isolated-illustration_335657-2246.jpg?t=st=1743678912~exp=1743682512~hmac=f83f9a80a29aca93f14eb654d24cc4f6fdc23384eec36138db918796fcf37d23&w=1380"
                                                    alt={course.title}
                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {course.price === "FREE" && (
                                                    <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                                                        {course.price}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-zinc-400">{course.category}</span>
                                                    <span className="text-xs text-neutral-400">{course.instructor}</span>
                                                </div>
                                                <h3 className="text-white text-sm font-medium mt-2 line-clamp-2">
                                                    {course.title}
                                                </h3>
                                                <button 
                                                    onClick={() => {
                                                        // Store the course in localStorage
                                                        const existingCourses = JSON.parse(localStorage.getItem('myCourses') || '[]');
                                                        const isCourseExists = existingCourses.some(c => c.id === course.id);
                                                        
                                                        if (!isCourseExists) {
                                                            existingCourses.push(course);
                                                            localStorage.setItem('myCourses', JSON.stringify(existingCourses));
                                                            alert('Course added successfully!');
                                                            navigate('/dashboard/courses');
                                                        } else {
                                                            alert('Course already in your list!');
                                                        }
                                                    }} 
                                                    className="inline-block mt-3 text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-900"
                                                >
                                                    {course.status}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Full Stack Development */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Full Stack Development</h3>
                                    <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {[
                                        {
                                            id: "fs1",
                                            title: "MERN Stack Development",
                                            category: "Full Stack",
                                            imageName: "mern",
                                            status: "Add to My course",
                                            instructor: "David Kumar",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        },
                                        {
                                            id: "fs2",
                                            title: "Java Spring Full Stack",
                                            category: "Full Stack",
                                            imageName: "spring",
                                            status: "Add to My course",
                                            instructor: "Emma Clark",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        },
                                        {
                                            id: "fs3",
                                            title: "Python Full Stack with Flask",
                                            category: "Full Stack",
                                            imageName: "python-flask",
                                            status: "Add to My course",
                                            instructor: "Tom Anderson",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        },
                                        {
                                            id: "fs4",
                                            title: ".NET Core Full Stack",
                                            category: "Full Stack",
                                            imageName: "dotnet",
                                            status: "Add to My course",
                                            instructor: "Jessica Lee",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        }
                                    ].map((course) => (
                                        <div key={course.id} className="group rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300" style={{
                                            backgroundColor: 'rgba(30, 30, 30, 0.4)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)'
                                        }}>
                                            <div className="aspect-video relative overflow-hidden">
                                                <img
                                                    src="https://img.freepik.com/free-vector/brain-with-digital-circuit-programmer-with-laptop-machine-learning-artificial-intelligence-digital-brain-artificial-thinking-process-concept-vector-isolated-illustration_335657-2246.jpg?t=st=1743678912~exp=1743682512~hmac=f83f9a80a29aca93f14eb654d24cc4f6fdc23384eec36138db918796fcf37d23&w=1380"
                                                    alt={course.title}
                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {course.price === "FREE" && (
                                                    <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                                                        {course.price}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-zinc-400">{course.category}</span>
                                                    <span className="text-xs text-neutral-400">{course.instructor}</span>
                                                </div>
                                                <h3 className="text-white text-sm font-medium mt-2 line-clamp-2">
                                                    {course.title}
                                                </h3>
                                                <button 
                                                    onClick={() => {
                                                        // Store the course in localStorage
                                                        const existingCourses = JSON.parse(localStorage.getItem('myCourses') || '[]');
                                                        const isCourseExists = existingCourses.some(c => c.id === course.id);
                                                        
                                                        if (!isCourseExists) {
                                                            existingCourses.push(course);
                                                            localStorage.setItem('myCourses', JSON.stringify(existingCourses));
                                                            alert('Course added successfully!');
                                                            navigate('/dashboard/courses');
                                                        } else {
                                                            alert('Course already in your list!');
                                                        }
                                                    }} 
                                                    className="inline-block mt-3 text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-900"
                                                >
                                                    {course.status}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cyber Security */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Cyber Security</h3>
                                    <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {[
                                        {
                                            id: "cs1",
                                            title: "Ethical Hacking Fundamentals",
                                            category: "Security",
                                            imageName: "ethical-hacking",
                                            status: "Add to My course",
                                            instructor: "Alex Security",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        },
                                        {
                                            id: "cs2",
                                            title: "Network Security Basics",
                                            category: "Security",
                                            imageName: "network-security",
                                            status: "Add to My course",
                                            instructor: "Rachel Shield",
                                            price: "FREE",
                                            videoUrl: "https://youtu.be/E6tAtRi82QY?si=p3K0lhxI2aae4Ctc",
                                        }
                                    ].map((course) => (
                                        <div key={course.id} className="group rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300" style={{
                                            backgroundColor: 'rgba(30, 30, 30, 0.4)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)'
                                        }}>
                                            <div className="aspect-video relative overflow-hidden">
                                                <img
                                                    src="https://img.freepik.com/free-vector/brain-with-digital-circuit-programmer-with-laptop-machine-learning-artificial-intelligence-digital-brain-artificial-thinking-process-concept-vector-isolated-illustration_335657-2246.jpg?t=st=1743678912~exp=1743682512~hmac=f83f9a80a29aca93f14eb654d24cc4f6fdc23384eec36138db918796fcf37d23&w=1380"
                                                    alt={course.title}
                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {course.price === "FREE" && (
                                                    <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                                                        {course.price}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-zinc-400">{course.category}</span>
                                                    <span className="text-xs text-neutral-400">{course.instructor}</span>
                                                </div>
                                                <h3 className="text-white text-sm font-medium mt-2 line-clamp-2">
                                                    {course.title}
                                                </h3>
                                                <button className="inline-block mt-3 text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-900">
                                                    {course.status}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                
            </div>

        </>

    );
}

export default Dashboard;
