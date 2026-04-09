import React, { useState, useEffect } from 'react';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
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

const CertificationCard = ({ cert }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    // Auto-correct if user accidentally used `image: []` instead of `images: []`
    const imagesArray = cert.images || (Array.isArray(cert.image) ? cert.image : null);
    const singleImage = !Array.isArray(cert.image) ? cert.image : null;

    useEffect(() => {
        let interval;
        if (isHovered && imagesArray && imagesArray.length > 1) {
            interval = setInterval(() => {
                setImgIndex((prev) => (prev + 1) % imagesArray.length);
            }, 1800); // Cycle image every 1.8 seconds (match highlights)
        }
        return () => clearInterval(interval);
    }, [isHovered, imagesArray]);

    return (
        <div
            className="bg-gray-50 dark:bg-secondary/80 backdrop-blur-md border-t border-white/5 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 group flex flex-col justify-between"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setImgIndex(0); // Reset to first image
            }}
        >
            {/* Certificate Image Area Slideshow */}
            {(imagesArray || singleImage) && (
                <div className="h-48 w-full bg-gray-200 dark:bg-gray-800 relative overflow-hidden border-b border-gray-200 dark:border-gray-700">
                    {/* Multi-image slideshow mode */}
                    {imagesArray && imagesArray.map((imgSrc, idx) => (
                        <img
                            key={idx}
                            src={formatImageUrl(imgSrc)}
                            alt={cert.name}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:scale-110 ${idx === imgIndex ? 'opacity-100' : 'opacity-0'}`}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    ))}
                    
                    {/* Single image fallback */}
                    {!imagesArray && singleImage && (
                        <img
                            src={formatImageUrl(singleImage)}
                            alt={cert.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    )}

                    {/* Slideshow Indicators (Dots) */}
                    {imagesArray && imagesArray.length > 1 && (
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {imagesArray.map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${i === imgIndex ? 'w-5 bg-primary' : 'w-2 bg-black/40 backdrop-blur-sm'}`}
                                />
                            ))}
                        </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
                </div>
            )}

            <div className="p-6 flex-grow flex flex-col justify-between z-20 bg-gray-50 dark:bg-secondary/80 backdrop-blur-md border-t border-white/5">
                <div>
                    <div className="mb-4 flex items-start gap-4">
                        <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <FaCertificate className="text-primary text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors leading-tight">
                                {cert.name}
                            </h3>
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                {cert.organization}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {cert.year}
                    </span>
                    {cert.link && cert.link !== "#" && (
                        <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 flex items-center gap-2 text-sm font-bold transition-colors"
                        >
                            View Credential <FaExternalLinkAlt size={12} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

const Certifications = () => {
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
        <section id="certifications" className="py-20 bg-white dark:bg-transparent">
            <div className="container mx-auto px-6 relative">
                <style>{`
                    .hide-scroll::-webkit-scrollbar { display: none; }
                    .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                    Professional <span className="text-primary">Certifications</span>
                </h2>

                <div className="relative w-full overflow-visible">
                    {/* Navigation Buttons */}
                    {siteData.certifications.length > 1 && (
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
                        {siteData.certifications.map((cert, index) => (
                            <div 
                                key={index} 
                                className={`flex-none w-[90%] sm:w-[400px] lg:w-[450px] xl:w-[500px] snap-center transition-all duration-500 ease-out z-20 ${
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
                                <CertificationCard cert={cert} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;

