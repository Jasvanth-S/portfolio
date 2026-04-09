import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import siteData from '../config/siteData';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Who I’m', to: '/who-im' },
        { name: 'Expertise', to: '/expertise' },
        { name: 'Creations', to: '/creations' },
        { name: 'Connect', to: '/connect' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 dark:bg-[#0A192F]/70 backdrop-blur-2xl backdrop-saturate-[180%] border-b border-black/5 dark:border-white/5 shadow-sm py-4' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/who-im" className="cursor-pointer flex flex-col items-end">
                    <span className="text-2xl font-bold text-primary">{siteData.name}</span>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 -mt-1">AI Engineer</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* iOS Segmented Control Style */}
                    <div className="flex items-center space-x-1 bg-black/5 dark:bg-white/5 p-1.5 rounded-full border border-black/5 dark:border-white/10">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                className={({ isActive }) => `px-5 py-2 rounded-full transition-all duration-300 font-semibold text-sm ${isActive ? 'bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                    <ThemeToggle />
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-[#E0E0E0] focus:outline-none">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-2xl backdrop-saturate-[180%] shadow-lg py-6 flex flex-col items-center space-y-4 border-t border-b border-black/5 dark:border-white/5">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.to}
                            className={({ isActive }) => `px-8 py-3 rounded-2xl transition-all duration-300 text-lg font-semibold w-64 text-center ${isActive ? 'bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' : 'text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
