import React, { useState, useEffect, useRef } from 'react';
import { FaHandshake, FaExternalLinkAlt } from 'react-icons/fa';
import siteData from '../config/siteData';

const getMediaPreviewUrl = (url) => {
    if (!url || typeof url !== 'string') return url;
    
    // Google drive intercept
    const driveRegex = /drive\.google\.com\/(?:file\/d\/|open\?id=)([-\w]+)/;
    const match = url.match(driveRegex);
    if (match && match[1]) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }

    // Determine if it is a website or an image
    const isImageFile = /\.(jpeg|jpg|gif|png|webp|svg|bmp|ico)(\?.*)?$/i.test(url) || url.startsWith('data:image');
    const isImageDomain = /(unsplash\.com|media\.licdn\.com|drive\.google\.com|imgur\.com|raw\.githubusercontent\.com|postimg\.cc)/i.test(url);
    
    // Automatically generate live screenshot using API if it's a website
    if (!isImageFile && !isImageDomain) {
        return `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}`;
    }
    
    return url;
};

const ProfessionalEngagements = () => {
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
        <section id="engagements" className="py-20 bg-white dark:bg-transparent">
            <div className="container mx-auto px-6 relative">
                <style>{`
                    .hide-scroll::-webkit-scrollbar { display: none; }
                    .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                    Professional <span className="text-primary">Work</span>
                </h2>

                <div className="relative w-full overflow-visible">
                    {/* Navigation Buttons */}
                    {siteData.professionalEngagements.length > 1 && (
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
                        {siteData.professionalEngagements.map((eng, index) => {
                            const isClickable = eng.link || eng.image;
                            const targetUrl = eng.link || eng.image;

                            return (
                                <div
                                    key={index}
                                    className={`flex-none w-[90%] sm:w-[500px] lg:w-[550px] xl:w-[600px] snap-center transition-all duration-500 ease-out z-20 ${
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
                                    <div className="bg-white/60 dark:bg-secondary/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border-t border-white/5 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 group flex flex-col h-full">
                                        {/* Media / Screenshot Preview Area */}
                                        <a 
                                            href={targetUrl}
                                            target={isClickable ? "_blank" : "_self"}
                                            rel="noopener noreferrer"
                                            className={`relative h-56 overflow-hidden block bg-white ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                                        >
                                            <img
                                                src={getMediaPreviewUrl(eng.image)}
                                                alt={eng.client}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                            />
                                            
                                            <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                                                {eng.category}
                                            </div>
                                            
                                            {isClickable && (
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-20 flex items-center justify-center">
                                                    <div className="opacity-0 group-hover:opacity-100 bg-white/70 dark:bg-secondary/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border-t border-white/5 text-primary rounded-full p-3 shadow-xl transition-all duration-300 transform scale-50 group-hover:scale-100 absolute bottom-4 right-4">
                                                        <FaExternalLinkAlt size={16} />
                                                    </div>
                                                </div>
                                            )}
                                        </a>

                                        {/* Content */}
                                        <div className="p-6 flex-grow flex flex-col">
                                            <h3 className="text-xl flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                                <FaHandshake className="text-primary" size={20} />
                                                {eng.client}
                                            </h3>
                                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">{eng.summary}</h4>

                                            <div className="space-y-3 mb-4 flex-grow">
                                                <div>
                                                    <p className="font-semibold text-xs text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-1">Contribution</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{eng.contribution}</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-xs text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-1">Impact Delivered</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{eng.impact}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfessionalEngagements;

