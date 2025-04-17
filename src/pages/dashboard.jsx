import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { IconHome, IconBook, IconBriefcase, IconPhone, IconSettings, IconLogout, IconRobot } from "@tabler/icons-react";
import { AuroraBackground } from "../components/ui/aurora-background";
import { useNavigate } from 'react-router-dom';
import { MultiStepLoader } from "../components/ui/multi-step-loader";
import { FloatingDock } from "../components/ui/floating-dock";
import { useState, useEffect } from 'react';
import LoadingTransition from './loading-transition';
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import styled from 'styled-components';

function Dashboard() {
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = e.target.search.value;
        // Add your search logic here
        console.log("Searching for:", searchQuery);
    };

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
                <div className="fixed inset-0 -z-10 bg-white">
                    <div 
                        className="absolute inset-0 "
                        style={{ mixBlendMode: 'multiply' }}
                    />
                 
                </div>

            

                {/* Replace entire Sidebar section with FloatingDock */}
                <Sidebar>
                    <SidebarBody>
                        {dockItems.map((item) => (
                            <SidebarLink key={item.title} link={item} />
                        ))}
                    </SidebarBody>
                </Sidebar>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto max-w-screen relative">
                    <div className=" mx-auto ">
                        {/* Make the header sticky with blur effect and top margin */}
                        <div className="flex items-center justify-between rounded-md mb-8 sticky top-0 py-3 z-40 w-full" style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            paddingLeft: '1.5rem',
                            paddingRight: '1.5rem',
                            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'gradient-move 10s ease infinite',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
                                <h1 className="text-2xl font-semibold text-neutral-800">
                                    Dashboard
                                </h1>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 max-w-md">
                                        <PlaceholdersAndVanishInput
                                            placeholders={[
                                                "Search for courses...",
                                                "Find tutorials...",
                                                "Explore topics...",
                                                "Discover new skills..."
                                            ]}
                                            onSubmit={handleSearch}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <img 
                                            src={localStorage.getItem('profilePic') || 'https://via.placeholder.com/40'} 
                                            alt="Profile" 
                                            className="w-10 h-10 rounded-full object-cover border-2 border-neutral-700 flex-shrink-0 hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dashboard Content */}

                        <div className="grid  mx-10 grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Course Progress Card */}
                            <div className="group rounded-xl p-6 bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300 border border-gray-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-sm font-medium text-neutral-600">My Current Courses</h3>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-3">
                                    {JSON.parse(localStorage.getItem('myCourses') || '[]').map((course, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-semibold text-neutral-800">{course.title}</p>
                                                <span className="text-xs text-neutral-500">{course.instructor}</span>
                                            </div>
                                            <button 
                                                onClick={() => navigate('/dashboard/courses')}
                                                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    ))}
                                    {JSON.parse(localStorage.getItem('myCourses') || '[]').length === 0 && (
                                        <p className="text-sm text-neutral-500 text-center">No courses added yet</p>
                                    )}
                                </div>
                            </div>

                            {/* Popular Courses Card */}
                            <div className="group rounded-xl p-6 bg-gradient-to-br from-green-50 to-blue-50 hover:shadow-lg transition-all duration-300 border border-gray-200">
                                <h3 className="text-sm font-medium text-neutral-600 mb-4">Popular Courses</h3>
                                <div className="space-y-3">
                                    {['Node.js Mastery', 'Python for AI', 'Web Security'].map((course, index) => (
                                        <div key={index} className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-200">
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-400 animate-pulse"></div>
                                            <span className="text-sm text-neutral-800">{course}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <button 
                                    onClick={() => navigate('/dashboard/courses')} 
                                    className="mt-4 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    View All Courses
                                </button>
                            </div>

                            {/* Achievement Card */}
                            <div className="group rounded-xl p-6 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300 border border-gray-200">
                                <h3 className="text-sm font-medium text-neutral-600 mb-4">Recent Achievements</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-200">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center animate-bounce">
                                            <IconBook className="w-4 h-4 text-purple-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-neutral-800">Course Completed</p>
                                            <p className="text-xs text-neutral-500">JavaScript Basics</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categorized Courses */}

                        <div className="  mx-10 mt-12">
                            <h2 className="text-xl font-semibold text-neutral-800 dark:text-black mb-8">
                                Explore Our Course Categories
                            </h2>

                            {/* Frontend Development */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-black">Frontend Development</h3>
                                    <button 
                                        onClick={() => navigate('/dashboard/my-courses')} 
                                        className="text-sm text-blue-600 hover:text-blue-700"
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
                                        <div key={course.id} className="group rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300 border border-gray-200">
                                            <div className="aspect-video relative overflow-hidden">
                                                <img
                                                    src="https://img.freepik.com/free-vector/brain-with-digital-circuit-programmer-with-laptop-machine-learning-artificial-intelligence-digital-brain-artificial-thinking-process-concept-vector-isolated-illustration_335657-2246.jpg?t=st=1743678912~exp=1743682512~hmac=f83f9a80a29aca93f14eb654d24cc4f6fdc23384eec36138db918796fcf37d23&w=1380"
                                                    alt={course.title}
                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {course.price === "FREE" && (
                                                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                        {course.price}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-4 bg-white/50 backdrop-blur-sm">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-blue-600">{course.category}</span>
                                                    <span className="text-xs text-gray-500">{course.instructor}</span>
                                                </div>
                                                <h3 className="text-gray-800 text-sm font-semibold mt-2 line-clamp-2">
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
                                                    className="inline-block mt-3 text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
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
                                    <h3 className="text-lg font-medium text-black">Backend Development</h3>
                                    <button className="text-sm text-blue-600 hover:text-blue-600">View All</button>
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
                                        <div key={course.id} className="group rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300 border border-gray-200" style={{
                                           
                                        }}>
                                            <div className="aspect-video relative overflow-hidden">
                                                <img
                                                    src="https://img.freepik.com/free-vector/brain-with-digital-circuit-programmer-with-laptop-machine-learning-artificial-intelligence-digital-brain-artificial-thinking-process-concept-vector-isolated-illustration_335657-2246.jpg?t=st=1743678912~exp=1743682512~hmac=f83f9a80a29aca93f14eb654d24cc4f6fdc23384eec36138db918796fcf37d23&w=1380"
                                                    alt={course.title}
                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {course.price === "FREE" && (
                                                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                        {course.price}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-4 bg-white/50 backdrop-blur-sm">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm  text-blue-600">{course.category}</span>
                                                    <span className="text-xs  text-gray-500">{course.instructor}</span>
                                                </div>
                                                <h3 className="text-gray-800 text-sm font-semibold mt-2 line-clamp-2">
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
                                    <h3 className="text-lg font-medium text-black">Full Stack Development</h3>
                                    <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
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
                                        <div key={course.id} className="group rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300 border border-gray-200" style={{
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
                                                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                        {course.price}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-4 bg-white/50 backdrop-blur-sm">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-blue-600">{course.category}</span>
                                                    <span className="text-xs text-gray-500">{course.instructor}</span>
                                                </div>
                                                <h3 className="text-gray-800 text-sm font-semibold mt-2 line-clamp-2">
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

                            
                            
                        </div>
                    </div>
                </main>
                
            </div>

        </>

    );
}

export default Dashboard;

const SettingsIcon = () => {
  return (
    <StyledWrapper>
      <button className="setting-btn">
        <span className="bar bar1" />
        <span className="bar bar2" />
        <span className="bar bar1" />
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .setting-btn {
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background-color: rgb(129, 110, 216);
    border-radius: 8px;
    cursor: pointer;
    border: none;
    box-shadow: 0px 0px 0px 2px rgb(212, 209, 255);
  }
  .bar {
    width: 50%;
    height: 2px;
    background-color: rgb(229, 229, 229);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 2px;
  }
  .bar::before {
    content: "";
    width: 2px;
    height: 2px;
    background-color: rgb(126, 117, 255);
    position: absolute;
    border-radius: 50%;
    border: 2px solid white;
    transition: all 0.3s;
    box-shadow: 0px 0px 5px white;
  }
  .bar1::before {
    transform: translateX(-4px);
  }
  .bar2::before {
    transform: translateX(4px);
  }
  .setting-btn:hover .bar1::before {
    transform: translateX(4px);
  }
  .setting-btn:hover .bar2::before {
    transform: translateX(-4px);
  }
`;
