import axios from 'axios';
import React, { useState } from 'react';
import { IoCodeSlash, IoSend } from 'react-icons/io5';
import { BiPlanet } from 'react-icons/bi';
import { FaPython } from 'react-icons/fa';
import { TbMessageChatbot } from 'react-icons/tb';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiChat = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const userMessage = { type: "user", content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCnW3-ACsuvQMRZkgZxEjIPOvKsS_kImZs");
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(message);
      const response = await result.response;
      
      const aiMessage = { type: "ai", content: response.text() };
      setMessages(prev => [...prev, aiMessage]);
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

  return (
    <>
      <div className="container w-screen h-screen overflow-x-hidden bg-[#000000] text-white">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative z-10">
          {
            isResponseScreen ?
              <div className='h-[80vh] bg-black'>
                <div className="header pt-[25px] flex items-center justify-between w-[100vw] px-[300px] bg-black">
                  <h2 className='text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                    AssistMe
                  </h2>
                  <button id='newChatBtn' className='bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px] hover:bg-[#202020]' onClick={newChat}>
                    New Chat
                  </button>
                </div>

                <div className="messages px-[300px] py-6 space-y-4 bg-black">
                  {messages?.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'userMsg' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[60%] px-4 py-3 rounded-xl ${
                        msg.type === 'userMsg' 
                          ? 'bg-blue-600 text-white ml-auto' 
                          : 'bg-gray-800 text-gray-100'
                      }`}>
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              :
              <div className="middle h-[80vh] flex items-center flex-col justify-center bg-black">
                <h1 className='text-4xl'>AssistMe</h1>
                <div className="boxes mt-[30px] flex items-center gap-2">
                  <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                    <p className='text-[18px]'>What is coding ? <br />
                      How we can learn it.</p>
                    <i className='absolute right-3 bottom-3 text-[18px]'><IoCodeSlash /></i>
                  </div>
                  <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                    <p className='text-[18px]'>Which is the red <br />
                      planet of solar <br />
                      system </p>
                    <i className='absolute right-3 bottom-3 text-[18px]'><BiPlanet /></i>
                  </div>
                  <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                    <p className='text-[18px]'>In which year python <br />
                      was invented ?</p>
                    <i className='absolute right-3 bottom-3 text-[18px]'><FaPython /></i>
                  </div>
                  <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                    <p className='text-[18px]'>How we can use <br />
                      the AI for adopt ?</p>
                    <i className='absolute right-3 bottom-3 text-[18px]'><TbMessageChatbot /></i>
                  </div>
                </div>
              </div>
          }

          <div className="bottom w-[100%] flex flex-col items-center bg-black">
            <div className="inputBox w-[60%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
              <input 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                type="text" 
                className='p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none' 
                placeholder='Write your message here...' 
                id='messageBox' 
              />
              {message && <i className='text-green-500 text-[20px] mr-5 cursor-pointer' onClick={hitRequest}><IoSend /></i>}
            </div>
            <p className='text-[gray] text-[14px] my-4'>AssistMe is developed by Mo. Mahdi Farooqui. this AI use the gemini API for giving the response</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiChat;
