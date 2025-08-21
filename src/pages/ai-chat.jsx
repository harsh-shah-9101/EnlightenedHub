import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IoCodeSlash } from 'react-icons/io5';
import { BiPlanet } from 'react-icons/bi';
import { FaPython } from 'react-icons/fa';
import { TbMessageChatbot } from 'react-icons/tb';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from 'react-router-dom';
import NewChatButton from '../components/NewChatButton';
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { IconHome, IconBook, IconBriefcase, IconPhone, IconSettings, IconLogout, IconRobot } from "@tabler/icons-react";
import ChatBot from '../components/ChatBot';
import { FloatingDock } from "../components/ui/floating-dock";
import { useMediaQuery } from '@mui/material';

const AiChat = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');

  // Add navigation items
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
  
  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]);
  }

  const handleSend = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    const userMessage = { type: "userMsg", text: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCnW3-ACsuvQMRZkgZxEjIPOvKsS_kImZs");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(message);
      const response = await result.response;
      
      const aiMessage = { type: "responseMsg", text: response.text() };
      setMessages(prev => [...prev, aiMessage]);
      setisResponseScreen(true);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { type: "error", text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Hidden on mobile */}
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
      <div className="flex-1 relative">
        <div className="container h-screen overflow-x-hidden bg-white text-gray-800">
          
          <div className="relative z-10">
            {/* Header */}
            <div className="fixed w-full mx-auto border-b border-gray-200 bg-white z-20">
              <div className="flex items-center justify-between px-3 md:px-6 py-3">
                <div className="flex mx-auto items-center">
                  <h2 className="text-lg font-medium text-gray-800">
                    AssistMe
                  </h2>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="pt-16 pb-32 w-full mx-auto flex flex-col items-center">
              <div className="w-full mx-auto px-2 md:px-4 flex-grow overflow-y-auto">
                {isResponseScreen ? (
                  <div className="space-y-6 py-4">
                    {messages?.map((msg, index) => (
                      <div key={index} className={`group flex ${msg.type === 'userMsg' ? '' : 'bg-gray-50'} py-6`}>
                        <div className="w-full mx-auto flex gap-2 md:gap-4 px-2 md:px-4">
                          <div className={`flex-shrink-0 ${msg.type === 'userMsg' ? 'bg-blue-600' : 'bg-gray-200'} text-white h-8 w-8 rounded-full flex items-center justify-center`}>
                            <span className="text-xs font-medium">{msg.type === 'userMsg' ? 'You' : 'AI'}</span>
                          </div>
                          <div className="flex-grow">
                            <div className="prose prose-sm max-w-none">
                              <p className="whitespace-pre-wrap text-[14px] md:text-[15px] leading-relaxed text-gray-800">{msg.text}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="group flex bg-gray-50 py-6">
                        <div className="w-full mx-auto flex gap-2 md:gap-4 px-2 md:px-4">
                          <div className="flex-shrink-0 bg-gray-200 text-white h-8 w-8 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">AI</span>
                          </div>
                          <div className="flex-grow">
                            <div className="animate-pulse flex space-x-2">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[calc(100vh-14rem)] w-full mx-auto text-center px-4">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">AssistMe</h1>
                    <p className="text-gray-600 mb-8">How can I help you today?</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-xl">
                      {[
                        { 
                          title: "Explain a concept",
                          text: "How does quantum computing work?",
                        },
                        { 
                          title: "Creative writing",
                          text: "Write a short story about a time traveler",
                        },
                        { 
                          title: "Coding help",
                          text: "Help me write a function to find prime numbers in Python",
                        },
                        { 
                          title: "Learning assistance",
                          text: "Create a study plan for machine learning",
                        }
                      ].map((item, index) => (
                        <button 
                          key={index} 
                          onClick={() => setMessage(item.text)}
                          className="p-3 md:p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors text-left"
                        >
                          <h3 className="font-medium text-xs md:text-sm text-gray-700 mb-1">{item.title}</h3>
                          <p className="text-xs text-gray-500">{item.text}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="fixed bottom-0 w-full mx-auto bg-white border-t border-gray-100 z-20 py-2 md:py-4 px-2 md:px-4 pb-4 md:pb-4">
              <div className="w-full max-w-4xl mx-auto">
                <ChatBot 
                  onSend={handleSend} 
                  message={message} 
                  setMessage={setMessage} 
                  isLoading={isLoading} 
                />
                <p className="text-[10px] md:text-xs text-gray-500 mt-2 md:mt-3 text-center">
                  AssistMe is developed by EnlightenedHub using the Gemini API
                </p>
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

export default AiChat;
