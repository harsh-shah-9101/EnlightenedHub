import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Support() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
        // Reset the success message after 5 seconds
        setTimeout(() => {
            setIsSubmitted(false);
        }, 5000);
    };

    return (
        <>
            {/* Close Button */}
            <button
                onClick={() => window.history.back()}
                className="group absolute top-6 left-6 flex items-center justify-center z-50 [transition:all_0.5s_ease] rounded-[0.375rem] p-[5px] cursor-pointer border border-[#999] outline-none focus-visible:outline-0 hover:border-white"
            >
                <svg
                    fill="currentColor"
                    stroke="none"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-white overflow-visible [transition:transform_.35s_ease] group-hover:[transition-delay:.25s] [&_path]:[transition:transform_.35s_ease] group-hover:rotate-45"
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
        
            <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-black to-neutral-950">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <span className="text-blue-400 font-medium">HAVE A PROJECT IN MIND?</span>
                        <h1 className="text-5xl font-bold text-white leading-tight">
                            We help you to grow your business faster & easier.
                        </h1>
                        <p className="text-neutral-400 text-lg">
                            Let us know about your project and we will help you
                            take your business to the next level.
                        </p>
                    </div>

                    {/* Right Form */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative p-8 rounded-3xl bg-neutral-900/50 backdrop-blur-xl border border-neutral-800"
                        >
                            {/* Inside motion.div, before the form */}
                            <h2 className="text-xl text-white mb-6">
                                Let us know about your project & we will help you
                                grow your business from scratch.
                            </h2>
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center mb-4"
                                >
                                    Thank you for your message! We'll get back to you soon.
                                </motion.div>
                            ) : null}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="First & Last name"
                                    className="w-full p-4 rounded-xl bg-neutral-800/50 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="w-full p-4 rounded-xl bg-neutral-800/50 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone number"
                                    className="w-full p-4 rounded-xl bg-neutral-800/50 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-all"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                                <textarea
                                    rows="4"
                                    placeholder="Write your message"
                                    className="w-full p-4 rounded-xl bg-neutral-800/50 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-all"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 px-6 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all font-medium"
                                >
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Support;