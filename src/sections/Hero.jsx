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

                {/* Tech Accent / Identity */}
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-sky-900/10 border border-sky-400/20 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(56,189,248,0.05)]">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
                    <span className="text-[10px] sm:text-xs font-mono text-sky-200 tracking-[0.2em] uppercase">AI Command Center</span>
                </div>

                {/* Main Heading Sequence */}
                <div className="mb-6 hover:scale-[1.01] transition-transform duration-500 flex flex-col items-center">
                    <h3 className="font-mono text-sm md:text-base text-sky-200/60 tracking-[0.3em] uppercase mb-3">
                        Hello, I'm
                    </h3>
                    <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-[#E2E8F0] to-[#00B4D8] py-4 px-4 md:px-8 leading-normal lg:leading-[1.1] drop-shadow-md">
                        {siteData.name}
                    </h1>
                </div>

                {/* Role / Description (Layer 2 & 3: Display & Mono) */}
                <div className="min-h-[160px] md:min-h-[140px] mb-10 flex flex-col items-center justify-start relative w-full">
                    <div className={`transition-all duration-700 ease-in-out absolute top-0 flex flex-col items-center w-full ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="h-10 md:h-12 flex items-center justify-center mb-5">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-500 tracking-wide drop-shadow-sm">
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
                        
                        {/* Elite Minimalist Description */}
                        <div className="max-w-2xl px-6 rounded-2xl relative">
                            <p className="font-body text-sm sm:text-base md:text-lg text-gray-300 dark:text-[#A8B2D1] leading-[1.8] font-light md:font-normal">
                                {currentRole.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ultra-Premium CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6 z-20 relative">
                    <Link
                        to="/creations"
                        className="px-8 py-4 rounded-full bg-white text-[#0A192F] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-sky-400 hover:text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transform hover:-translate-y-1"
                    >
                        Explore Portfolio
                    </Link>
                    <Link
                        to="/connect"
                        className="px-8 py-4 rounded-full border border-sky-200/30 text-white font-medium text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:border-sky-400 hover:text-sky-400 hover:bg-sky-400/10 transform hover:-translate-y-1"
                    >
                        Initialize Contact
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
