import React, { useState, useEffect, useRef } from 'react';
import { FaChalkboardTeacher, FaExternalLinkAlt } from 'react-icons/fa';
import siteData from '../config/siteData';
import PdfScrubber from '../components/PdfScrubber';

const getMediaPreviewUrl = (url) => {
    if (!url || typeof url !== 'string') return url;
    
    // Google drive intercept
    const driveRegex = /[-\w]{25,}/;
    const match = url.match(driveRegex);
    if (url.includes('drive.google.com') && match) {
        return `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1000`;
    }
    
    return url;
};

const Presentations = () => {
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
        <section id="presentations" className="py-20 bg-white dark:bg-transparent">
            <div className="container mx-auto px-6 relative">
                <style>{`
                    .hide-scroll::-webkit-scrollbar { display: none; }
                    .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                    Technical <span className="text-primary">Presentations</span>
                </h2>

                <div className="relative w-full overflow-visible">
                    {/* Navigation Buttons */}
                    {siteData.presentations.length > 1 && (
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
                        {siteData.presentations.map((pres, index) => (
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
                                <div className="bg-white/60 dark:bg-secondary/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border-t border-white/5 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 group flex flex-col h-full">
                                    <div className="relative h-56 overflow-hidden">
                                        {pres.link && pres.link.toLowerCase().endsWith('.pdf') ? (
                                            <PdfScrubber pdfUrl={pres.link} defaultImage={getMediaPreviewUrl(pres.image)} />
                                        ) : (
                                            <img
                                                src={getMediaPreviewUrl(pres.image)}
                                                alt={pres.topic}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        )}

                                        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-30 flex items-center gap-1 shadow-md">
                                            <FaChalkboardTeacher /> {pres.event}
                                        </div>
                                        
                                        {((pres.link && pres.link !== '#') || (pres.image && pres.image.includes('drive.google.com'))) && (!pres.link || !pres.link.toLowerCase().endsWith('.pdf')) && (
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors z-20 flex items-center justify-center">
                                                <a href={pres.link !== '#' ? pres.link : pres.image} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 bg-white/70 dark:bg-secondary/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border-t border-white/5 text-primary rounded-full p-4 shadow-xl transition-all duration-300 transform scale-50 group-hover:scale-100">
                                                    <FaExternalLinkAlt size={20} />
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                                            {pres.topic}
                                        </h3>
                                        
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">
                                            {pres.focus}
                                        </p>
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

export default Presentations;

