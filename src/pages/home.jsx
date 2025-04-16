import { Spotlight } from "../components/ui/spotlight-new"
import { CardSpotlight } from "../components/ui/card-spotlight";
import { FeatureCard } from "../components/ui/feature-card";
import { useState, useEffect } from "react";
import CountUp from 'react-countup';
import '../styles/scroll-animation.css';
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { Meteors } from "../components/ui/meteors";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const people = [
    {
        id: 1,
        name: "John Doe",
        designation: "Web Developer",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
        id: 2,
        name: "Sarah Smith",
        designation: "Data Scientist",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
        id: 3,
        name: "Michael Chen",
        designation: "Mobile Developer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
        id: 4,
        name: "Emily Johnson",
        designation: "UI/UX Designer",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=461&q=80"
    },
    {
        id: 5,
        name: "David Wilson",
        designation: "Cloud Expert",
        image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80"
    }
];

function Home() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <>
            <div className="h-screen w-[100vw] flex flex-col bg-white relative overflow-hidden">
                <nav className={`w-full px-4 md:px-6 py-2 flex flex-col md:flex-row items-center justify-between border-b border-white/10 fixed top-0 z-50 bg-white backdrop-blur-sm transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
                    }`}>
                    <div className="text-black font-bold text-xl mb-4 md:mb-0">Enlightenedhub</div>

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 flex-1">
                            <a href="/login" className="text-black/80 hover:text-black transition-colors">Home</a>
                            <a href="/login" className="text-black/80 hover:text-black transition-colors">Courses</a>
                            <a href="/login" className="text-black/80 hover:text-black transition-colors">Job Portal</a>
                            <a href="/login" className="text-black/80 hover:text-black transition-colors">Request Callback</a>
                        </div>
                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                            <div className="group relative w-[131px] h-[45px] rounded-[15px] bg-gradient-to-br from-[#2e8eff] via-transparent/30 to-transparent p-px transition-all hover:bg-[#2e8eff]/70 hover:shadow-[0_0_10px_#2e8eff80]">
                                <div className="w-full h-full bg-gray-900 rounded-[13px] flex items-center justify-center gap-3 px-4 py-2 transition-colors group-hover:bg-opacity-50">
                                    <svg
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6 text-white"
                                    >
                                        <g id="Layer_2">
                                            <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z"
                                                fill="currentColor" />
                                        </g>
                                    </svg>
                                    <span className="text-white font-semibold">Log In</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Add the scrolling banner */}


                <div className="flex-1 flex-1 flex flex-col items-center justify-center px-4">
                    <Spotlight
                        className="absolute -top-40 left-0 md:left-60 md:-top-20"
                        fill="white"
                    />

                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <span className="text-sm text-gray-600">Beginners-dreams</span>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
                        ✨ Empower Your Learning Journey,<br />
                        Unlock Success with Expert-Guided Courses!

                    </h1>

                    <p className="text-gray-600 text-center max-w-2xl mb-8">
                        Explore top-quality study material and courses with StudySprint — your path to smarter learning and success.
                    </p>

                    <div className="relative inline-flex items-center justify-center gap-4 group">
                        <div className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
                        <button
                            onClick={() => navigate('/login')}
                            className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30 cursor-pointer"
                        >
                            Get Started For Free
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 10 10"
                                height="10"
                                width="10"
                                fill="none"
                                className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                            >
                                <path d="M0 5h7" className="transition opacity-0 group-hover:opacity-100" />
                                <path d="M1 1l4 4-4 4" className="transition group-hover:translate-x-[3px]" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                        <span className="text-sm text-gray-600">🧠 Cancel or pause anytime. No stress, just progress.</span>
                    </div>
                    <div className="absolute top-180 w-full overflow-hidden bg-gray-50/50 py-3">
                        <div className="scrolling-wrapper">
                            <div className="animate-scroll">
                                <div className="logo-container">
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-react-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-5-pack-logos-icons-3032300.png?f=webp&w=512" alt="React" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-python-logo-icon-download-in-svg-png-gif-file-formats--brand-development-tools-pack-logos-icons-226051.png?f=webp&w=512" alt="Python" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-javascript-logo-icon-download-in-svg-png-gif-file-formats--brand-development-tools-pack-logos-icons-225993.png?f=webp&w=512" alt="JavaScript" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-java-logo-icon-download-in-svg-png-gif-file-formats--wordmark-programming-language-pack-logos-icons-1174953.png?f=webp&w=512" alt="Java" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-c-logo-icon-download-in-svg-png-gif-file-formats--brand-development-tools-pack-logos-icons-226082.png?f=webp&w=512" alt="C++" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-c-logo-icon-download-in-svg-png-gif-file-formats--programming-coding-relate-pack-logos-icons-1982846.png?f=webp&w=512" alt="C#" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-ruby-logo-icon-download-in-svg-png-gif-file-formats--programming-langugae-freebies-pack-logos-icons-1175101.png?f=webp&w=512" alt="Ruby" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-swift-icon-download-in-svg-png-gif-file-formats--brand-company-logo-world-logos-vol-3-pack-icons-282412.png?f=webp&w=512" alt="Swift" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-kotlin-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-11-pack-icons-283155.png?f=webp&w=512" alt="Kotlin" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-go-logo-icon-download-in-svg-png-gif-file-formats--brand-company-business-brands-pack-logos-icons-2284995.png?f=webp&w=512" alt="Go" />
                                </div>
                                <div className="logo-container">
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-react-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-5-pack-logos-icons-3032300.png?f=webp&w=512" alt="React" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-python-logo-icon-download-in-svg-png-gif-file-formats--brand-development-tools-pack-logos-icons-226051.png?f=webp&w=512" alt="Python" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-javascript-logo-icon-download-in-svg-png-gif-file-formats--brand-development-tools-pack-logos-icons-225993.png?f=webp&w=512" alt="JavaScript" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-java-logo-icon-download-in-svg-png-gif-file-formats--wordmark-programming-language-pack-logos-icons-1174953.png?f=webp&w=512" alt="Java" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-c-logo-icon-download-in-svg-png-gif-file-formats--brand-development-tools-pack-logos-icons-226082.png?f=webp&w=512" alt="C++" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-c-logo-icon-download-in-svg-png-gif-file-formats--programming-coding-relate-pack-logos-icons-1982846.png?f=webp&w=512" alt="C#" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-ruby-logo-icon-download-in-svg-png-gif-file-formats--programming-langugae-freebies-pack-logos-icons-1175101.png?f=webp&w=512" alt="Ruby" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-swift-icon-download-in-svg-png-gif-file-formats--brand-company-logo-world-logos-vol-3-pack-icons-282412.png?f=webp&w=512" alt="Swift" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-kotlin-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-11-pack-icons-283155.png?f=webp&w=512" alt="Kotlin" />
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/free-go-logo-icon-download-in-svg-png-gif-file-formats--brand-company-business-brands-pack-logos-icons-2284995.png?f=webp&w=512" alt="Go" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Page */}
            <div className="min-h-screen w-[100vw] mt-40 flex flex-col bg-white">
                <div className="max-w-7xl mx-auto px-4 py-20 w-full">
                    <div className="flex flex-col md:flex-row gap-20">
                        {/* Left Section */}
                        <div className="flex-1">
                            <TextGenerateEffect
                                words="Together, let's make learning accessible! with free educational courses for everyone!"
                                className="text-5xl font-bold mb-6"
                            />
                            <TextGenerateEffect
                                words="Our commitment to providing free, high-quality educational content makes learning accessible to all. Get ready to explore a world of knowledge with our expertly crafted courses, designed to help you succeed without any financial barriers."
                                className="text-gray-600 mb-8"
                                duration={0.8}
                            />
                            <div className="relative group">
                                <button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800  cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

                                    <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                                        <div className="relative z-10 flex items-center space-x-2">
                                            <span className="transition-all duration-500 group-hover:translate-x-1">Let's get started</span>
                                            <svg
                                                className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                                data-slot="icon"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    clipRule="evenodd"
                                                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                                    fillRule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex-1">
                            <div className="bg-[#e8f3ea] rounded-3xl p-8">
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="flex">
                                        <AnimatedTooltip items={people} />
                                    </div>
                                    <span className="text-gray-600">_Join 5000+ learners</span>
                                </div>
                                <h3 className="text-2xl font-semibold mb-2">New courses added weekly</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <h4 className="text-3xl font-bold">Learn Web Development</h4>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                        </svg>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <h4 className="text-2xl font-bold">Data Science & Analytics</h4>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 3v18h18" />
                                            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                                        </svg>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <h4 className="text-2xl font-bold">Mobile App Development</h4>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                            <path d="M12 18h.01" />
                                        </svg>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <h4 className="text-2xl font-bold">Cloud Computing</h4>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-600">with industry experts</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="min-h-screen w-[100vw] flex flex-col bg-white py-20">
                    <div className="max-w-7xl mx-auto px-4 w-full">
                        <div className="text-center  mt-20 mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Students Say</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">Hear from our successful students who have transformed their careers through our platform.</p>
                        </div>

                        <div className="grid mt-30 grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Testimonial 1 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                                <Meteors number={10} className="opacity-30" />
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                                        alt="Student"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold">Jessica Chen</h4>
                                        <p className="text-gray-600 text-sm">Web Development Graduate</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">"The web development course was exactly what I needed to transition into tech. Within 3 months of completing the course, I landed my dream job as a frontend developer!"</p>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial 2 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                                <Meteors number={10} className="opacity-30" />
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                                        alt="Student"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold">Marcus Thompson</h4>
                                        <p className="text-gray-600 text-sm">Data Science Expert</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">"The practical projects and mentorship in the data science course were invaluable. I'm now working as a Data Analyst at a Fortune 500 company."</p>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial 3 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                                <Meteors number={10} className="opacity-30" />
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                                        alt="Student"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold">Sofia Rodriguez</h4>
                                        <p className="text-gray-600 text-sm">Mobile App Developer</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">"The mobile development course gave me the confidence to start my own app development company. The instructors were incredibly supportive throughout my journey."</p>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Student Testimonials Section */}


            {/* AI Features Section */}
            <div className="w-full bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Learning Experience</h2>
                        <p className="text-gray-600">Enhance your learning journey with cutting-edge AI features</p>
                    </div>

                    <BentoGrid>
                        {/* AI Learning Assistant */}
                        <BentoGridItem
                            title="AI Learning Assistant"
                            description="Get personalized learning recommendations and instant help with your programming questions."
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                            }
                            className="col-span-1"
                        />

                        {/* Rest of the BentoGridItems remain the same, just updating their icon colors */}
                        <BentoGridItem
                            title="Smart Code Review"
                            description="Get instant feedback on your code with AI-powered code analysis and suggestions for improvement."
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                                </svg>
                            }
                            className="col-span-1"
                        />

                        {/* Progress Analytics */}
                        <BentoGridItem
                            title="Progress Analytics"
                            description="Track your learning progress with AI-driven analytics and personalized improvement suggestions."
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 3v18h18M18 8l-4 4-3-3-5 5" />
                                </svg>
                            }
                            className="col-span-1"
                        />

                        {/* Interactive Exercises */}
                        <BentoGridItem
                            title="Interactive Exercises"
                            description="Practice with AI-generated coding exercises tailored to your skill level and learning goals."
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            }
                            className="col-span-1 md:col-span-2"
                        />

                        {/* Community Learning */}
                        <BentoGridItem
                            title="Community Learning"
                            description="Connect with fellow learners and share knowledge through AI-facilitated study groups and discussions."
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 4v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            }
                            className="col-span-1"
                        />
                    </BentoGrid>
                </div>
            </div>

            {/* Large Logo Section */}
           

            {/* Footer Section */}
            <div className="w-full bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Interested in working together,</h2>
                        <p className="text-2xl text-gray-600">trying our platform or simply learning more?</p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-600">Contact us at:</p>
                            <a href="mailto:contact@enlightenedhub.com" className="text-black hover:text-blue-600 transition-colors flex items-center gap-2">
                                contact@enlightenedhub.com
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>

                        <div className="flex gap-12">
                            <a href="#" className="text-black/80 hover:text-black transition-colors">How It Works</a>
                            <a href="#" className="text-black/80 hover:text-black transition-colors">Benefits</a>
                            <a href="#" className="text-black/80 hover:text-black transition-colors">Features</a>
                            <a href="#" className="text-black/80 hover:text-black transition-colors">Team</a>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
                       
                       
                        <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-center">
                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.2,
                                                ease: [0, 0.71, 0.2, 1.01]
                                            }}
                                            className="text-[150px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient"
                                        >
                                            EnlightenedHub
                                        </motion.h1>
                    </div>
                </div>


                
                        
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default Home;
