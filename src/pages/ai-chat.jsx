import axios from 'axios';
import React, { useState } from 'react';
import { IoCodeSlash, IoSend } from 'react-icons/io5';
import { BiPlanet } from 'react-icons/bi';
import { FaPython } from 'react-icons/fa';
import { TbMessageChatbot } from 'react-icons/tb';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import NewChatButton from '../components/NewChatButton';
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { IconHome, IconBook, IconBriefcase, IconPhone, IconSettings, IconLogout, IconRobot } from "@tabler/icons-react";

const AiChat = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Add sidebar items
  const sidebarItems = [
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

  // Remove navigate constant and handleClose function
  
  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    }
    else {
      alert("You must write something...!");
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;
    
    const genAI = new GoogleGenerativeAI("AIzaSyCnW3-ACsuvQMRZkgZxEjIPOvKsS_kImZs");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
    
    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];
    
    setMessages(newMessages);
    setisResponseScreen(true);
    setMessage("");
    console.log(result.response.text());
  };

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
      setMessages(prev => [...prev, { type: "error", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Add Sidebar */}
      <Sidebar>
        <SidebarBody>
          {sidebarItems.map((item) => (
            <SidebarLink key={item.title} link={item} />
          ))}
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 relative">
        <div className="container h-screen overflow-x-hidden bg-white text-gray-800">
          <div className="absolute inset-0 bg-white"></div>
          <div className="relative z-10">
            {/* Header */}
            <div className="fixed md:left-[300px] right-0 border-b border-gray-200 bg-white z-20">
              <div className="flex items-center justify-between px-6 py-3">
                <h2 className="text-xl font-medium  text-center flex-1">AssistMe</h2>
                
                {isResponseScreen && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMessages([])}
                      className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                    >
                      Clear chat
                    </button>
                    <NewChatButton onClick={newChat} />
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="pt-16 ml-[10%] pb-24 flex items-center justify-center">
              {isResponseScreen ? (
                <div className="max-w-3xl w-full mx-auto px-4">
                  <div className="space-y-6 py-4">
                    {messages?.map((msg, index) => (
                      <div key={index} className={`flex ${msg.type === 'userMsg' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                          msg.type === 'userMsg' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="whitespace-pre-wrap text-[15px]">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-2xl px-4 py-3">
                          <div className="animate-pulse flex space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] max-w-4xl mx-auto px-4">
                  <h1 className="text-4xl font-medium text-gray-800 mb-8">AssistMe</h1>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                    {[
                      { 
                        icon: <IoCodeSlash />, 
                        text: "How to get started\nwith software\ndevelopment?",
                        category: "Programming"
                      },
                      { 
                        icon: <BiPlanet />, 
                        text: "Explain recent\nadvancements in\nspace technology",
                        category: "Science"
                      },
                      { 
                        icon: <FaPython />, 
                        text: "Best practices for\nPython development\nin 2024",
                        category: "Development"
                      },
                      { 
                        icon: <TbMessageChatbot />, 
                        text: "How to implement\nAI in business\noperations?",
                        category: "AI & Business"
                      }
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        onClick={() => setMessage(item.text.replace(/\n/g, ' '))}
                        className="p-6 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors relative group flex flex-col h-full"
                      >
                        <div className="text-xs text-gray-500 mb-2">{item.category}</div>
                        <p className="text-sm text-gray-800 whitespace-pre-line font-medium flex-grow">{item.text}</p>
                        <div className="text-gray-600 text-lg group-hover:text-blue-600 transition-colors mt-4">
                          {item.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="fixed bottom-0 md:left-[300px] right-70 bg-white border-t border-gray-200">
              <div className="max-w-3xl mx-auto px-4 py-4">
                <div className="relative flex items-center">
                  <input 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    onKeyDown={handleKeyPress}
                    type="text" 
                    className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white text-gray-800" 
                    placeholder="Message AssistMe..." 
                  />
                  <button
                    onClick={handleSend}
                    disabled={!message.trim() || isLoading}
                    className={`absolute right-3 ${message.trim() ? 'text-blue-600 hover:text-blue-700' : 'text-gray-400'}`}
                  >
                    <IoSend className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  AssistMe is developed by EnlightenedHub using the Gemini API
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
