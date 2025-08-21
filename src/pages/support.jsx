import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { IconHome, IconBook, IconBriefcase, IconPhone, IconSettings, IconLogout, IconRobot } from "@tabler/icons-react";
import { FloatingDock } from "../components/ui/floating-dock";
import { useMediaQuery } from '@mui/material';

function Support() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [result, setResult] = useState('');

    // Navigation items for sidebar and floating dock
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult('Sending...');
        
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('message', formData.message);
        formDataToSend.append('access_key', '3ea4626a-d69e-4f61-b48f-228e3b05a64f');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formDataToSend
            });

            const data = await response.json();

            if (data.success) {
                setResult('Form Submitted Successfully');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
                // Reset the success message after 5 seconds
                setTimeout(() => {
                    setResult('');
                }, 5000);
            } else {
                console.log('Error', data);
                setResult(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setResult('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar - Only visible on desktop */}
            {!isMobile && (
                <Sidebar>
                    <SidebarBody>
                        {navigationItems.map((item) => (
                            <SidebarLink key={item.title} link={item} />
                        ))}
                    </SidebarBody>
                </Sidebar>
            )}

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-br from-white to-blue-50 pb-20 md:pb-4">
                <div className="w-full h-full flex items-center justify-center px-3 py-6 md:p-6">
                    <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
                        {/* Left Content */}
                        <div className="space-y-4 md:space-y-6">
                            <span className="text-blue-600 font-medium text-sm md:text-base">HAVE A QUESTION?</span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight">
                                We're here to help you succeed in your learning journey.
                            </h1>
                            <p className="text-neutral-600 text-base md:text-lg">
                                Let us know your questions or concerns and our support team will 
                                get back to you as soon as possible.
                            </p>
                        </div>

                        {/* Right Form */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"></div>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl bg-white shadow-lg border border-neutral-200"
                            >
                                <h2 className="text-lg md:text-xl text-neutral-800 mb-4 md:mb-6">
                                    Contact our support team and we'll help you with any questions 
                                    about your courses or account.
                                </h2>
                                {result && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`p-3 md:p-4 ${
                                            result === 'Sending...' 
                                                ? 'bg-blue-100 border-blue-300 text-blue-700'
                                                : result.includes('Success') 
                                                    ? 'bg-green-100 border-green-300 text-green-700'
                                                    : 'bg-red-100 border-red-300 text-red-700'
                                        } border rounded-xl text-center mb-4 text-sm md:text-base`}
                                    >
                                        {result}
                                    </motion.div>
                                )}
                                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                                    <input
                                        type="text"
                                        placeholder="First & Last name"
                                        className="w-full p-3 md:p-4 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-all text-sm md:text-base"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        className="w-full p-3 md:p-4 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-all text-sm md:text-base"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone number"
                                        className="w-full p-3 md:p-4 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-all text-sm md:text-base"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    />
                                    <textarea
                                        rows="4"
                                        placeholder="Write your message"
                                        className="w-full p-3 md:p-4 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-all text-sm md:text-base"
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        required
                                    ></textarea>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3 md:py-4 px-4 md:px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium text-sm md:text-base"
                                    >
                                        Send Message
                                    </motion.button>
                                </form>
                            </motion.div>
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
}

export default Support;