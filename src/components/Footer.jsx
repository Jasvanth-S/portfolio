import React from 'react';
import { Link } from 'react-scroll';
import siteData from '../config/siteData';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-gray-100 dark:bg-[#050505] py-10 border-t border-gray-300 dark:border-gray-900">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    <div className="text-center md:text-left">
                        <p className="font-bold text-gray-800 dark:text-white text-base">{siteData.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">Full-Stack AI Developer · Freelancer · Researcher</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                        <span>Last updated: March 2026</span>
                        <span>·</span>
                        <a
                            href={`${process.env.PUBLIC_URL}/assets/cv/Jasvanth_CV_Full_Stack_AI_Developer.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-semibold"
                        >
                            View Resume ↗
                        </a>
                    </div>
                </div>
                <div className="flex justify-center mb-4">
                    <Link to="hero" smooth={true} duration={500} className="text-gray-500 dark:text-gray-500 hover:text-primary cursor-pointer transition-colors text-sm">
                        ↑ Back to Top
                    </Link>
                </div>
                <p className="text-gray-500 dark:text-gray-600 text-sm text-center">
                    © {year} {siteData.name}. All rights reserved. Crafted with precision.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
