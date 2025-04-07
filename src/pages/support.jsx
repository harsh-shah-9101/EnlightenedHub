import React, { useState } from 'react';
import { IconMail, IconPhone, IconBrandDiscord } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { IconX } from '@tabler/icons-react'; // Add this import at the top

function Support() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-900">
            <motion.div 
                className="max-w-6xl mx-auto relative"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Close Button */}
                <button
                    onClick={() => window.history.back()}
                    className="absolute -left-2 -top-2 group flex items-center justify-center relative z-10 transition-all duration-500 ease-in-out rounded-[0.375rem] p-[5px] cursor-pointer border border-neutral-600 outline-none focus-visible:outline-0 hover:border-emerald-500/50"
                >
                    <svg
                        fill="currentColor"
                        stroke="none"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-7 h-7 overflow-visible transition-transform duration-350 ease-in-out group-hover:delay-250 group-hover:rotate-45 text-neutral-400 group-hover:text-emerald-400"
                    >
                        <path
                            className="transition-transform duration-350 ease-in-out group-hover:[transform:rotate(112.5deg)_translate(-27.2%,-80.2%)]"
                            d="m3.45,8.83c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L14.71,2.08c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L3.84,8.75c-.13.05-.25.08-.38.08Z"
                        ></path>
                        <path
                            className="transition-transform duration-350 ease-in-out group-hover:[transform:rotate(22.5deg)_translate(15.5%,-23%)]"
                            d="m2.02,17.13c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L21.6,6.94c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L2.4,17.06c-.13.05-.25.08-.38.08Z"
                        ></path>
                        <path
                            className="transition-transform duration-350 ease-in-out group-hover:[transform:rotate(112.5deg)_translate(-15%,-149.5%)]"
                            d="m8.91,21.99c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31l11.64-4.82c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31l-11.64,4.82c-.13.05-.25.08-.38.08Z"
                        ></path>
                    </svg>
                </button>

                {/* Header */}
                <motion.div 
                    className="text-center mb-12"
                    variants={itemVariants}
                >
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600 mb-4">
                        How can we help you?
                    </h1>
                    <p className="text-neutral-400">Get in touch with our support team</p>
                </motion.div>

                {/* Contact Form */}
                <motion.div 
                    variants={itemVariants}
                    className="max-w-2xl mx-auto p-8 mb-12 rounded-2xl bg-neutral-800/30 backdrop-blur-xl border border-neutral-700/50 shadow-xl"
                >
                    <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600 mb-6">
                        Send us a message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg bg-neutral-800/50 border border-neutral-700 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 rounded-lg bg-neutral-800/50 border border-neutral-700 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg bg-neutral-800/50 border border-neutral-70 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                            <textarea
                                rows="4"
                                className="w-full px-4 py-2 rounded-lg bg-neutral-800/50 border border-neutral-70 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                            ></textarea>
                        </div>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all"
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="text-center mb-8"
                >
                    <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600 mb-4">
                        Other ways to reach us
                    </h2>
                    <p className="text-neutral-400">Choose the most convenient way to get support</p>
                </motion.div>

                {/* Contact Methods */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <IconMail className="w-6 h-6" />,
                            title: "Email Support",
                            description: "support@enlightenedhub.com",
                            action: "Send email",
                            gradient: "from-emerald-500 to-teal-400"
                        },
                        {
                            icon: <IconPhone className="w-6 h-6" />,
                            title: "Phone Support",
                            description: "+1 (555) 123-4567",
                            action: "Call now",
                            gradient: "from-emerald-500 to-teal-400"
                        },
                        {
                            icon: <IconBrandDiscord className="w-6 h-6" />,
                            title: "Discord Community",
                            description: "Join our community",
                            action: "Join Discord",
                            gradient: "from-emerald-500 to-teal-400"
                        }
                    ].map((method, index) => (
                        <motion.div 
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="p-6 rounded-2xl bg-neutral-800/50 backdrop-blur-xl border border-neutral-700/50 shadow-xl"
                        >
                            <div className={`inline-block p-3 rounded-full bg-gradient-to-r ${method.gradient} mb-4`}>
                                {method.icon}
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">{method.title}</h3>
                            <p className="text-gray-400 mb-4">{method.description}</p>
                            <button className={`text-sm bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}>
                                {method.action}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default Support;