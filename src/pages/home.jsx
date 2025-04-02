import { Spotlight } from "../components/ui/spotlight-new"
import { CardSpotlight } from "../components/ui/card-spotlight";
import { FeatureCard } from "../components/ui/feature-card";

function Home() {
    return (
        <>
        <div className="h-screen w-[100vw] flex flex-col bg-black">
            <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10">
                <div className="text-white font-bold text-xl">logo</div>
                
                <div className="flex items-center gap-12">
                    <a href="/" className="text-white/80 hover:text-white transition-colors">Home</a>
                    <a href="/courses" className="text-white/80 hover:text-white transition-colors">Courses</a>
                    <a href="/courses" className="text-white/80 hover:text-white transition-colors">Job Portal</a>
                    <a href="/callback" className="text-white/80 hover:text-white transition-colors">Request Callback</a>
                    <div className="flex items-center gap-3">
                        <button className="group relative dark:bg-neutral-800 bg-neutral-200 rounded-full p-px overflow-hidden">
                            <span className="absolute inset-0 rounded-full overflow-hidden">
                                <span className="inset-0 absolute pointer-events-none select-none">
                                    <span
                                        className="block -translate-x-1/2 -translate-y-1/3 size-24 blur-xl"
                                        style={{background: "linear-gradient(135deg, rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63))"}}
                                    ></span>
                                </span>
                            </span>

                            <span
                                className="inset-0 absolute pointer-events-none select-none"
                                style={{animation: "10s ease-in-out 0s infinite alternate none running border-glow-translate"}}
                            >
                                <span
                                    className="block z-0 h-full w-12 blur-xl -translate-x-1/2 rounded-full"
                                    style={{
                                        animation: "10s ease-in-out 0s infinite alternate none running border-glow-scale",
                                        background: "linear-gradient(135deg, rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63))"
                                    }}
                                ></span>
                            </span>

                            <span className="flex items-center justify-center gap-1 relative z-[1] dark:bg-neutral-950/90 bg-neutral-50/90 rounded-full py-2 px-4 pl-2 w-full">
                                <span className="relative group-hover:scale-105 transition-transform group-hover:rotate-[360deg] duration-500">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="opacity-80 dark:opacity-100"
                                        style={{animation: "14s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s infinite alternate none running star-rotate"}}
                                    >
                                        <path
                                            d="M11.5268 2.29489C11.5706 2.20635 11.6383 2.13183 11.7223 2.07972C11.8062 2.02761 11.903 2 12.0018 2C12.1006 2 12.1974 2.02761 12.2813 2.07972C12.3653 2.13183 12.433 2.20635 12.4768 2.29489L14.7868 6.97389C14.939 7.28186 15.1636 7.5483 15.4414 7.75035C15.7192 7.95239 16.0419 8.08401 16.3818 8.13389L21.5478 8.88989C21.6457 8.90408 21.7376 8.94537 21.8133 9.00909C21.8889 9.07282 21.9452 9.15644 21.9758 9.2505C22.0064 9.34456 22.0101 9.4453 21.9864 9.54133C21.9627 9.63736 21.9126 9.72485 21.8418 9.79389L18.1058 13.4319C17.8594 13.672 17.6751 13.9684 17.5686 14.2955C17.4622 14.6227 17.4369 14.9708 17.4948 15.3099L18.3768 20.4499C18.3941 20.5477 18.3835 20.6485 18.3463 20.7406C18.3091 20.8327 18.2467 20.9125 18.1663 20.9709C18.086 21.0293 17.9908 21.0639 17.8917 21.0708C17.7926 21.0777 17.6935 21.0566 17.6058 21.0099L12.9878 18.5819C12.6835 18.4221 12.345 18.3386 12.0013 18.3386C11.6576 18.3386 11.3191 18.4221 11.0148 18.5819L6.3978 21.0099C6.31013 21.0563 6.2112 21.0772 6.11225 21.0701C6.0133 21.0631 5.91832 21.0285 5.83809 20.9701C5.75787 20.9118 5.69563 20.8321 5.65846 20.7401C5.62128 20.6482 5.61066 20.5476 5.6278 20.4499L6.5088 15.3109C6.567 14.9716 6.54178 14.6233 6.43534 14.2959C6.32889 13.9686 6.14441 13.672 5.8978 13.4319L2.1618 9.79489C2.09039 9.72593 2.03979 9.63829 2.01576 9.54197C1.99173 9.44565 1.99524 9.34451 2.02588 9.25008C2.05652 9.15566 2.11307 9.07174 2.18908 9.00788C2.26509 8.94402 2.3575 8.90279 2.4558 8.88889L7.6208 8.13389C7.96106 8.08439 8.28419 7.95295 8.56238 7.75088C8.84058 7.54881 9.0655 7.28216 9.2178 6.97389L11.5268 2.29489Z"
                                            fill="url(#paint0_linear_171_8212)"
                                            stroke="url(#paint1_linear_171_8212)"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_171_8212"
                                                x1="-0.5"
                                                y1="9"
                                                x2="15.5"
                                                y2="-1.5"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop stopColor="#7A69F9"></stop>
                                                <stop offset="0.575" stopColor="#F26378"></stop>
                                                <stop offset="1" stopColor="#F5833F"></stop>
                                            </linearGradient>
                                            <linearGradient
                                                id="paint1_linear_171_8212"
                                                x1="-0.5"
                                                y1="9"
                                                x2="15.5"
                                                y2="-1.5"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop stopColor="#7A69F9"></stop>
                                                <stop offset="0.575" stopColor="#F26378"></stop>
                                                <stop offset="1" stopColor="#F5833F"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <span
                                        className="rounded-full size-11 absolute opacity-0 dark:opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-lg"
                                        style={{
                                            animation: "14s ease-in-out 0s infinite alternate none running star-shine",
                                            background: "linear-gradient(135deg, rgb(59, 196, 242), rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63))"
                                        }}
                                    ></span>
                                </span>
                                <span className="bg-gradient-to-b ml-1.5 dark:from-white dark:to-white/50 from-neutral-950 to-neutral-950/50 bg-clip-text text-xs text-transparent group-hover:scale-105 transition transform-gpu">
                                    AI Chat
                                </span>
                            </span>
                        </button>
                        <button className="px-4 py-1.5 bg-white text-black rounded-full hover:bg-white/90 transition-colors">
                            <a href="/login">Sign In</a>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="flex-1 flex items-center justify-center">
                <Spotlight
                    className="absolute -top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />
                <div className="relative z-10 w-full px-4 flex flex-col items-center ">
                    <div className="flex flex-col items-center mb-12">
                        <h1 className="text-4xl md:text-7xl font-light    text-center max-w-[800px] leading-none">
                            <span className="text-white">We only </span>
                            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">teach</span>
                            <br />
                            <span className="text-white">what we are really</span>
                            <br />
                            <span className="text-white">really </span>
                            <span className="font-serif italic text-white">good</span>
                            <span className="text-white"> at.</span>
                        </h1>

                        <p className="absolute right-50  bottom-24   text-neutral-200 max-w-[200px] text-sm">
                            Get ready to <span className="text-emerald-400">accelerate your career</span> with customized courses and leave your mark in the tech industry
                        </p>
                    </div>

                    <button className="mt-1 px-8 py-2 bg-emerald-400 text-black rounded-full hover:bg-emerald-500 transition-all text-md font-medium">
                        Check Courses-Make an Impact
                    </button>

                    {/* Stats Section */}
                    <div className="mt-24 w-fit">
                        <div className="flex justify-center items-center gap-20">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white">25k+</div>
                                <div className="text-sm text-white/70">Students taught</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white">20+</div>
                                <div className="text-sm text-white/70">Instructors</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white">506K+</div>
                                <div className="text-sm text-white/70">Youtube Subs.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Second Page */}
        <div className="min-h-screen w-[100vw] flex flex-col bg-black">
            <div className="flex-1 flex items-center justify-center px-4 py-20">
                <div className="w-full h-screen max-w-6xl">
                    <div className="text-center mb-16 w-full">
                        <h2 className="text-4xl md:text-6xl font-light mb-4">
                            <span className="text-white">We do whatever it takes to help you </span>
                           
                    
                            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> understand the concepts.</span>
                        </h2>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-light text-center mb-20">
                        <span className="text-white">Why Choose </span>
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Us?</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <FeatureCard
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                                </svg>
                            }
                            title="Learn from Top Mentors"
                            description="Connect with industry experts who provide personalized guidance and feedback to accelerate your learning journey."
                        />
                        
                        <FeatureCard
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                    <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                            }
                            title="Job Portal"
                            description="Access exclusive job opportunities from our partner companies with direct application channels and referral benefits."
                        />

                        <FeatureCard
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                                </svg>
                            }
                            title="Structured Learning Paths"
                            description="Follow curated learning paths designed by experts to master in-demand skills and technologies."
                        />

                        <FeatureCard
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                    <path d="M16.5 7.5h-9v9h9v-9z" />
                                    <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clipRule="evenodd" />
                                </svg>
                            }
                            title="AI Learning Assistant"
                            description="Get 24/7 support from our intelligent AI assistant to answer questions and provide guidance on your learning journey."
                        />
                    </div>
                    <div className="text-center mt-35">
                        <h2 className="text-4xl md:text-6xl font-light mb-4 ">
                            <span className="text-white">Ready to start your </span>
                            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">journey?</span>
                        </h2>
                        <p className="text-white/70 max-w-2xl mx-auto">
                            Join thousands of students who have already transformed their careers through our comprehensive learning programs.
                        </p>
                    </div>

                </div>
            </div>
        </div>
        
        {/* Third Page */}
        <div className="min-h-screen w-[100vw] flex flex-col bg-black">
            <div className="flex-1 flex items-center justify-center px-4 py-20">
                <div className="w-full max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-light mb-4">
                            <span className="text-white">Our Featured </span>
                            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Courses</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Course Card 1 */}
                        <div className="bg-neutral-900 rounded-3xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all">
                            <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                                <img src="https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dWl8ZW58MHx8MHx8fDA%3D" alt="UI/UX Course" className="w-full h-full object-cover" />
                            </div>
                            <div className="px-2">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs bg-neutral-800 text-white/70 px-2 py-1 rounded-full">Beginner</span>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">Fundamentals of UI/UX Design</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Livia Donin" className="w-6 h-6 rounded-full" />
                                    <span className="text-sm text-white/70">Livia Donin</span>
                                    <div className="flex items-center gap-1 ml-auto">
                                        <span className="text-sm text-white/70">4.0</span>
                                        <span className="text-yellow-400">★</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course Card 2 */}
                        <div className="bg-neutral-900 rounded-3xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all">
                            <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                                <img src="https://plus.unsplash.com/premium_photo-1661770132071-026114fffb61?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D" alt="User-Centered Design" className="w-full h-full object-cover" />
                            </div>
                            <div className="px-2">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs bg-neutral-800 text-white/70 px-2 py-1 rounded-full">Master</span>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">Creating User-Centered Design</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Anika Vetrovs" className="w-6 h-6 rounded-full" />
                                    <span className="text-sm text-white/70">Anika Vetrovs</span>
                                    <div className="flex items-center gap-1 ml-auto">
                                        <span className="text-sm text-white/70">4.5</span>
                                        <span className="text-yellow-400">★</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course Card 3 */}
                        <div className="bg-neutral-900 rounded-3xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all">
                            <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                                <img src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D" alt="Interaction Design" className="w-full h-full object-cover" />
                            </div>
                            <div className="px-2">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs bg-neutral-800 text-white/70 px-2 py-1 rounded-full">Intermediate</span>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">Introduction to Interaction Design</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ym95cyUyMHBvcnRyYWl0fGVufDB8fDB8fHww" alt="Jaylon Saris" className="w-6 h-6 rounded-full" />
                                    <span className="text-sm text-white/70">Jaylon Saris</span>
                                    <div className="flex items-center gap-1 ml-auto">
                                        <span className="text-sm text-white/70">4.8</span>
                                        <span className="text-yellow-400">★</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course Card 4 */}
                        <div className="bg-neutral-900 rounded-3xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all">
                            <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                                <img src="https://images.unsplash.com/photo-1658299669911-85eced808868?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByaW5jaXBsZXxlbnwwfHwwfHx8MA%3D%3D" alt="UI Design Principles" className="w-full h-full object-cover" />
                            </div>
                            <div className="px-2">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs bg-neutral-800 text-white/70 px-2 py-1 rounded-full">Beginner</span>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">UI Design Principles and Best Practices</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <img src="https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJveXMlMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D" alt="Cristofer Philips" className="w-6 h-6 rounded-full" />
                                    <span className="text-sm text-white/70">Cristofer Philips</span>
                                    <div className="flex items-center gap-1 ml-auto">
                                        <span className="text-sm text-white/70">4.3</span>
                                        <span className="text-yellow-400">★</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                         {/* Course Card 5 */}
                         <div className="bg-neutral-900 rounded-3xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all">
                            <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                                <img src="https://media.istockphoto.com/id/1552875565/photo/programming-coding-and-man-with-focus-hologram-and-trading-with-cyber-security-futuristic-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=kDl6LkUcVrUP3MJwv17F2jsAndTroskw-ulbWDBI17E=" alt="UI Design Principles" className="w-full h-full object-cover" />
                            </div>
                            <div className="px-2">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs bg-neutral-800 text-white/70 px-2 py-1 rounded-full">Master</span>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">Java and DSA Domination</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <img src="https://images.unsplash.com/photo-1542441518-f24c42938dc1?w=700&auto=for" alt="Cristofer Philips" className="w-6 h-6 rounded-full" />
                                    <span className="text-sm text-white/70">Cristofer Philips</span>
                                    <div className="flex items-center gap-1 ml-auto">
                                        <span className="text-sm text-white/70">4.3</span>
                                        <span className="text-yellow-400">★</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                         {/* Course Card 6 */}
                         <div className="bg-neutral-900 rounded-3xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all">
                            <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                                <img src="https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D" alt="UI Design Principles" className="w-full h-full object-cover" />
                            </div>
                            <div className="px-2">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs bg-neutral-800 text-white/70 px-2 py-1 rounded-full">Intermediate</span>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">Three.js Domination</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <img src="/instructor4.jpg" alt="Cristofer Philips" className="w-6 h-6 rounded-full" />
                                    <span className="text-sm text-white/70">sam karan</span>
                                    <div className="flex items-center gap-1 ml-auto">
                                        <span className="text-sm text-white/70">4.3</span>
                                        <span className="text-yellow-400">★</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                         {/* Course Card 7 */}
                         <div className="bg-neutral-900 rounded-3xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all">
                            <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                                <img src="https://images.unsplash.com/photo-1565687981296-535f09db714e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFjayUyMGVuZCUyMGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D" alt="UI Design Principles" className="w-full h-full object-cover" />
                            </div>
                            <div className="px-2">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs bg-neutral-800 text-white/70 px-2 py-1 rounded-full">Intermidiate</span>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">Back-End Domination:Create Efficient Back-End</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <img src="/instructor4.jpg" alt="Cristofer Philips" className="w-6 h-6 rounded-full" />
                                    <span className="text-sm text-white/70">Cristofer Philips</span>
                                    <div className="flex items-center gap-1 ml-auto">
                                        <span className="text-sm text-white/70">4.3</span>
                                        <span className="text-yellow-400">★</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                         {/* Course Card 8 */}
                         <div className="bg-neutral-900 rounded-3xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all">
                            <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                                <img src="https://images.unsplash.com/photo-1555963153-11ff60182d08?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhY2slMjBlbmQlMjBkZXZlbG9wZXJ8ZW58MHx8MHx8fDA%3D" alt="UI Design Principles" className="w-full h-full object-cover" />
                            </div>
                            <div className="px-2">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs bg-neutral-800 text-white/70 px-2 py-1 rounded-full">Master</span>
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">Front-End Domination : Create Anythin With Code</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cristofer Philips" className="w-6 h-6 rounded-full" />
                                    <span className="text-sm text-white/70">Cristofer Philips</span>
                                    <div className="flex items-center gap-1 ml-auto">
                                        <span className="text-sm text-white/70">4.3</span>
                                        <span className="text-yellow-400">★</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default Home
