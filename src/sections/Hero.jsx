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

                {/* Availability Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6 backdrop-blur-sm">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    Available for opportunities
                </div>

                {/* Intro */}
                <p className="text-primary text-xl md:text-2xl font-medium mb-4 tracking-wide">Hello, I'm</p>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white hover:text-primary transition-colors duration-300">
                    {siteData.name}
                </h1>


                {/* Role + Description */}
                <div className="min-h-[200px] md:min-h-[180px] mb-10 flex flex-col items-center justify-center">
                    <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            <TypeAnimation
                                key={currentRoleIndex}
                                sequence={[currentRole.title]}
                                wrapper="span"
                                speed={50}
                                cursor={false}
                            />
                        </h2>
                        <p className="text-base md:text-lg font-normal text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            {currentRole.description}
                        </p>
                    </div>
                </div>

                {/* Role indicator dots */}
                <div className="flex justify-center gap-2 mb-10">
                    {siteData.roles.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setFade(false); setTimeout(() => { setCurrentRoleIndex(i); setFade(true); }, 300); }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentRoleIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-primary/50'}`}
                            aria-label={`Switch to role ${i + 1}`}
                        />
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
