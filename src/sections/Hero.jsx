import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import siteData from '../config/siteData';

const Hero = () => {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % siteData.roles.length);
                setFade(true);
            }, 500);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const currentRole = siteData.roles[currentRoleIndex];

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center bg-transparent text-gray-900 dark:text-[#E0E0E0] px-6 pt-20 relative overflow-hidden">
            <div className="text-center max-w-4xl mx-auto relative z-10" style={{ transform: `translateY(${scrollY * 0.08}px)` }}>

                {/* Main Heading with Gradient and Slight Letter Spacing (Layer 1: Display) */}
                <div className="mb-8 hover:scale-[1.01] transition-transform duration-500">
                    <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-500 dark:text-[#8892b0] font-mono tracking-widest uppercase font-medium mb-3">
                        Hello, I'm
                    </h2>
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-600 to-sky-400 dark:from-white dark:via-[#CCD6F6] dark:to-[#00F0FF]">
                        {siteData.name}
                    </h1>
                </div>

                {/* Role / Description (Layer 2 & 3: Display & Mono) */}
                <div className="min-h-[180px] md:min-h-[160px] mb-12 flex flex-col items-center justify-center relative">
                    <div className={`transition-all duration-700 ease-in-out absolute inset-0 flex flex-col items-center justify-center ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="h-10 md:h-12 flex items-center justify-center mb-4">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-blue-600 dark:text-[#64FFDA] tracking-wider">
                                <TypeAnimation
                                    key={currentRole.title}
                                    sequence={[currentRole.title]}
                                    speed={50}
                                    wrapper="span"
                                    cursor={true}
                                    repeat={0}
                                />
                            </h2>
                        </div>
                        
                        {/* Elegant Professional Highlights Block */}
                        <div className="max-w-2xl bg-white/60 dark:bg-[#112240]/40 backdrop-blur-md border border-gray-200/50 dark:border-[#64FFDA]/10 px-6 py-4 rounded-2xl shadow-lg">
                            <p className="font-body text-sm sm:text-base md:text-lg text-gray-700 dark:text-[#CCD6F6] leading-relaxed">
                                {currentRole.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                    <Link
                        to="/creations"
                        className="px-8 py-3.5 rounded-full bg-primary text-white dark:text-[#050505] font-bold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/30 cursor-pointer"
                    >
                        View My Work →
                    </Link>
                    <Link
                        to="/connect"
                        className="px-8 py-3.5 rounded-full border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary font-bold text-base transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                        Hire Me / Collaborate
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
