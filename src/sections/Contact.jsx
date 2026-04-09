import React from 'react';
import { FaEnvelope, FaBriefcase, FaBuilding, FaFlask } from 'react-icons/fa';
import siteData from '../config/siteData';

const audienceCards = [
    {
        icon: <FaBuilding size={20} />,
        label: 'Organization',
        description: 'Looking to add a full-stack or AI engineer to your product team?',
        action: 'Connect on LinkedIn',
        href: 'https://linkedin.com/in/jasvanth1010',
        color: 'blue',
    },
    {
        icon: <FaFlask size={20} />,
        label: 'Research',
        description: 'Need a technically sharp contributor for a research or technical officer role?',
        action: 'Send an Email',
        href: `mailto:${siteData.email}`,
        color: 'violet',
    },
    {
        icon: <FaBriefcase size={20} />,
        label: 'Freelance Project',
        description: 'Have a client project that needs end-to-end development and delivery?',
        action: 'Let\'s Talk',
        href: `mailto:${siteData.email}?subject=Freelance Project Inquiry`,
        color: 'emerald',
    },
];

const colorClasses = {
    blue: {
        border: 'hover:border-blue-500/50',
        icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
        btn: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    violet: {
        border: 'hover:border-violet-500/50',
        icon: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
        btn: 'bg-violet-600 hover:bg-violet-700 text-white',
    },
    emerald: {
        border: 'hover:border-emerald-500/50',
        icon: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
        btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
};

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-white dark:bg-transparent">
            <div className="container mx-auto px-6 max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                    Get In <span className="text-primary">Touch</span>
                </h2>

                <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-4 text-base leading-relaxed">
                    Whether you're building a product team, a research lab, or a client project — let's talk about what we can build together.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 mb-12">
                    {/* Availability Badge */}
                    <div className="inline-flex flex-row items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold backdrop-blur-sm mx-auto">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span>Available for opportunities</span>
                    </div>

                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2 m-0 mt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                        <span>I respond within 24 hours</span>
                    </p>
                </div>

                {/* Three audience cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                    {audienceCards.map((card, i) => (
                        <div key={i} className={`bg-white/60 dark:bg-secondary/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border-t border-white/5 rounded-xl p-6 border border-gray-200 dark:border-gray-800 ${colorClasses[card.color].border} transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg flex flex-col justify-between group`}>
                            <div>
                                <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${colorClasses[card.color].icon} group-hover:scale-110 transition-transform`}>
                                    {card.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{card.label}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{card.description}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>

                {/* Social links row */}
                <div className="bg-white/50 dark:bg-secondary/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border-t border-white/5 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 text-center">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6">Find me on</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {siteData.socials.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${social.name}`}
                                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#050505]/50"
                            >
                                <div className="text-2xl">{social.icon}</div>
                                <span className="font-medium">{social.name}</span>
                            </a>
                        ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <a
                        href={`mailto:${siteData.email}`}
                        className="inline-block px-8 py-4 rounded-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white dark:hover:text-[#050505] font-bold text-lg transition-all duration-300 transform hover:scale-105"
                    >
                            Connect
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

