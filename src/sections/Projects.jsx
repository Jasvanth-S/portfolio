import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import siteData from '../config/siteData';

const getMediaPreviewUrl = (url) => {
    if (!url || typeof url !== 'string') return url;
    const driveRegex = /drive\.google\.com\/(?:file\/d\/|open\?id=)([-\w]+)/;
    const match = url.match(driveRegex);
    if (match && match[1]) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
    return url;
};

const SignatureProjects = () => {
    const scrollContainerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const centerParams = container.scrollLeft + container.clientWidth / 2;
        
        let closestIndex = 0;
        let minDiff = Infinity;

        Array.from(container.children).forEach((child, i) => {
            const childCenter = child.offsetLeft + child.clientWidth / 2;
            const diff = Math.abs(childCenter - centerParams);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        });

        if (activeIndex !== closestIndex) {
            setActiveIndex(closestIndex);
        }
    };

    useEffect(() => {
        handleScroll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const cardWidth = current.children[0].clientWidth + 24; 
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section id="projects" className="py-20 bg-gray-50 dark:bg-transparent/20">
            <div className="container mx-auto px-6 relative">
                <style>{`
                    .hide-scroll::-webkit-scrollbar { display: none; }
                    .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                    Signature <span className="text-primary">Projects</span>
                </h2>

                <div className="relative w-full overflow-visible">
                    {/* Navigation Buttons */}
                    {siteData.signatureProjects.length > 1 && (
                        <>
                            <button 
                                onClick={() => scroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 md:translate-x-4 lg:-translate-x-12 z-30 bg-white dark:bg-secondary/80 backdrop-blur-md border-t border-white/5 text-primary p-3 xl:p-4 rounded-full shadow-lg border border-gray-200 dark:border-gray-800 hover:scale-110 hover:bg-primary hover:text-white transition-all hidden sm:flex"
                                aria-label="Scroll Left"
                            >
                                <svg className="w-5 h-5 xl:w-6 xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
                            </button>
                            <button 
                                onClick={() => scroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 md:-translate-x-4 lg:translate-x-12 z-30 bg-white dark:bg-secondary/80 backdrop-blur-md border-t border-white/5 text-primary p-3 xl:p-4 rounded-full shadow-lg border border-gray-200 dark:border-gray-800 hover:scale-110 hover:bg-primary hover:text-white transition-all hidden sm:flex"
                                aria-label="Scroll Right"
                            >
                                <svg className="w-5 h-5 xl:w-6 xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
                            </button>
                        </>
                    )}

                    <div 
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto gap-6 sm:gap-12 pb-16 pt-8 px-8 md:px-[15%] snap-x snap-mandatory hide-scroll items-center"
                    >
                        {siteData.signatureProjects.map((project, index) => (
                            <div
                                key={index}
                                className={`flex-none w-[90%] sm:w-[450px] lg:w-[500px] xl:w-[550px] snap-center transition-all duration-500 ease-out z-20 ${
                                    index === activeIndex 
                                    ? 'scale-105 opacity-100 shadow-2xl relative' 
                                    : 'scale-90 opacity-60 hover:opacity-80 cursor-pointer pointer-events-auto'
                                }`}
                                onClick={() => {
                                    if (index !== activeIndex && scrollContainerRef.current) {
                                        scrollContainerRef.current.children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                                    }
                                }}
                            >
                                <div className="bg-white dark:bg-secondary/80 backdrop-blur-md border-t border-white/5 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 group flex flex-col h-full">
                                    {/* Project Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={getMediaPreviewUrl(project.image)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-gray-800 dark:bg-secondary/80 backdrop-blur-md border-t border-white/5 rounded-full text-white hover:text-primary hover:bg-white dark:hover:bg-white transition-colors"
                                                >
                                                    <FaGithub size={20} />
                                                </a>
                                            )}
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-gray-800 dark:bg-secondary/80 backdrop-blur-md border-t border-white/5 rounded-full text-white hover:text-primary hover:bg-white dark:hover:bg-white transition-colors"
                                                >
                                                    <FaExternalLinkAlt size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                            {project.description}
                                        </p>
                                        
                                        <div className="mb-4">
                                            <span className="font-semibold text-xs text-gray-800 dark:text-gray-200">Problem Solved: </span>
                                            <span className="text-xs text-gray-600 dark:text-gray-400">{project.problemSolved}</span>
                                        </div>
                                        <div className="mb-6 flex-grow">
                                            <span className="font-semibold text-xs text-gray-800 dark:text-gray-200">Outcome: </span>
                                            <span className="text-xs text-gray-600 dark:text-gray-400">{project.outcome}</span>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.technologies.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-transparent text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-800"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignatureProjects;

