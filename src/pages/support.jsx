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
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-black to-neutral-950">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
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
    );
}

export default Support;