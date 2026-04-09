import React, { useState, useEffect, useRef } from 'react';
import { FaBookOpen, FaExternalLinkAlt } from 'react-icons/fa';
import siteData from '../config/siteData';

const Research = () => {
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
        <section id="research" className="py-20 bg-gray-50 dark:bg-transparent/20">
            <div className="container mx-auto px-6 relative">
                <style>{`
                    .hide-scroll::-webkit-scrollbar { display: none; }
                    .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                    Research & <span className="text-primary">Publications</span>
                </h2>

                <div className="relative w-full overflow-visible">
                    {/* Navigation Buttons */}
                    {siteData.research.length > 1 && (
                        <>
                            <button 
                                onClick={() => scroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 md:translate-x-4 lg:-translate-x-12 z-30 bg-white/70 dark:bg-secondary/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border-t border-white/5 text-primary p-3 xl:p-4 rounded-full shadow-lg border border-gray-200 dark:border-gray-800 hover:scale-110 hover:bg-primary hover:text-white transition-all hidden sm:flex"
                                aria-label="Scroll Left"
                            >
                                <svg className="w-5 h-5 xl:w-6 xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
                            </button>
                            <button 
                                onClick={() => scroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 md:-translate-x-4 lg:translate-x-12 z-30 bg-white/70 dark:bg-secondary/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border-t border-white/5 text-primary p-3 xl:p-4 rounded-full shadow-lg border border-gray-200 dark:border-gray-800 hover:scale-110 hover:bg-primary hover:text-white transition-all hidden sm:flex"
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
                        {siteData.research.map((res, index) => (
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
                                <div className="bg-white/70 dark:bg-secondary/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border-t border-white/5 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 group h-full flex flex-col justify-between">
                                    <div>
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-start gap-3 group-hover:text-primary transition-colors">
                                                <FaBookOpen className="text-primary mt-1 flex-shrink-0" size={20} />
                                                {res.title}
                                            </h3>
                                            <p className="text-sm font-semibold text-primary mb-3 pl-8">
                                                {res.conference}
                                            </p>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 pl-8">
                                            {res.summary}
                                        </p>
                                    </div>

                                    {res.link && res.link !== '#' && (
                                        <div className="pl-8">
                                            <a
                                                href={res.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                                            >
                                                Read Paper <FaExternalLinkAlt size={12} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Research;

