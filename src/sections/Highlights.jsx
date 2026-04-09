import React, { useState, useEffect } from 'react';
import { FaStar, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import siteData from '../config/siteData';

const formatImageUrl = (url) => {
    if (!url || typeof url !== 'string') return url;
    const driveRegex = /drive\.google\.com\/(?:file\/d\/|open\?id=)([-\w]+)/;
    const match = url.match(driveRegex);
    if (match && match[1]) {
        // Use the thumbnail endpoint as it bypasses recent Google hotlink restrictions
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
    return url;
};

const HighlightCard = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    // Auto-correct if user accidentally used `image: []` instead of `images: []`
    const imagesArray = item.images || (Array.isArray(item.image) ? item.image : null);
    const singleImage = !Array.isArray(item.image) ? item.image : null;

    useEffect(() => {
        let interval;
        if (isHovered && imagesArray && imagesArray.length > 1) {
            interval = setInterval(() => {
                setImgIndex((prev) => (prev + 1) % imagesArray.length);
            }, 1800); // 1.8 seconds makes the transition cleaner and easier to view
        }
        return () => clearInterval(interval);
    }, [isHovered, imagesArray]);

    return (
        <div
            className="bg-gray-50 dark:bg-secondary/80 backdrop-blur-md border-t border-white/5 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 transform group flex flex-col h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setImgIndex(0); // Reset to first image on mouse leave natively
            }}
        >
            {/* Image Slideshow Area */}
            <div className="relative h-56 overflow-hidden bg-gray-200 dark:bg-[#121212]">
                {imagesArray && imagesArray.map((imgSrc, idx) => (
                    <img
                        key={idx}
                        src={formatImageUrl(imgSrc)}
                        alt={item.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:scale-105 ${idx === imgIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
                
                {/* Fallback for single image legacy data */}
                {!imagesArray && singleImage && (
                    <img
                        src={formatImageUrl(singleImage)}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}

                {/* Slideshow Indicators (Dots) */}
                {imagesArray && imagesArray.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {imagesArray.map((_, i) => (
                            <div 
                                key={i} 
                                className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${i === imgIndex ? 'w-5 bg-primary' : 'w-2 bg-white/70 backdrop-blur-sm'}`}
                            />
                        ))}
                    </div>
                )}
                
                {/* Gradient Overlay for better text legibility if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
            </div>

            {/* Content */}
            <div className="p-6 flex-grow flex flex-col z-20 bg-gray-50 dark:bg-secondary/80 backdrop-blur-md border-t border-white/5">
                <h3 className="text-xl flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    <FaStar className="text-primary flex-shrink-0" size={18} />
                    {item.title}
                </h3>
                
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-primary" />
                        {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-primary" />
                        {item.date}
                    </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">
                    {item.description}
                </p>
            </div>
        </div>
    );
};

const Highlights = () => {
    const scrollContainerRef = React.useRef(null);
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

    // Calculate initial active index when mounted
    useEffect(() => {
        handleScroll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const cardWidth = current.children[0].clientWidth + 24; // 24 is the layout gap
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section id="highlights" className="py-20 bg-white dark:bg-transparent">
            <div className="container mx-auto px-6 relative">
                <style>{`
                    .hide-scroll::-webkit-scrollbar { display: none; }
                    .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                    Professional <span className="text-primary">Highlights</span>
                </h2>

                <div className="relative w-full overflow-visible">
                    {/* Navigation Buttons */}
                    {siteData.highlights.length > 1 && (
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

                    {/* Scroll Container */}
                    <div 
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto gap-6 sm:gap-12 pb-16 pt-8 px-8 md:px-[15%] snap-x snap-mandatory hide-scroll items-center"
                    >
                        {siteData.highlights.map((item, index) => (
                            <div 
                                key={index} 
                                className={`flex-none w-[90%] sm:w-[400px] lg:w-[450px] xl:w-[500px] snap-center transition-all duration-500 ease-out z-20 ${
                                    index === activeIndex 
                                    ? 'scale-105 opacity-100 shadow-2xl relative' 
                                    : 'scale-90 opacity-60 hover:opacity-80 cursor-pointer pointer-events-auto'
                                }`}
                                onClick={() => {
                                    // Optional: Click lateral card to focus it
                                    if (index !== activeIndex && scrollContainerRef.current) {
                                        scrollContainerRef.current.children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                                    }
                                }}
                            >
                                <HighlightCard item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlights;

