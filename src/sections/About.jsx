import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../config/siteData';
import { FaDownload, FaGraduationCap, FaFlask, FaBriefcase, FaArrowRight } from 'react-icons/fa';

const identityCards = [
    {
        icon: <FaBriefcase size={22} />,
        label: 'The Builder',
        subtitle: 'Organization Ready',
        tagColor: 'blue',
        text: 'Delivers scalable, production-grade systems. Comfortable in agile teams, code reviews, and sprint cycles. Writes clean, maintainable code with long-term architecture in mind.',
    },
    {
        icon: <FaFlask size={22} />,
        label: 'The Solver',
        subtitle: 'Research Ready',
        tagColor: 'violet',
        text: 'Approaches engineering problems with scientific rigour — defining the problem space before touching a keyboard. Comfortable with data pipelines, ML systems, and academic-style analysis.',
    },
    {
        icon: <FaBriefcase size={22} />,
        label: 'The Deliverer',
        subtitle: 'Freelance Ready',
        tagColor: 'emerald',
        text: 'Has shipped end-to-end client projects solo — from scoping requirements through design, dev, and deployment. Manages clients, timelines, and delivery expectations independently.',
    },
];

const tagClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
    violet: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
};

const iconBgClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
    violet: 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
};

const About = () => {
    const [showCVMenu, setShowCVMenu] = useState(false);

    return (
        <section id="about" className="py-20 bg-gray-50 dark:bg-[#1E1E1E]/30">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                    About <span className="text-primary">Me</span>
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-16 text-sm">
                    Most developers write code. I engineer solutions — for clients, for teams and for problems that matter.
                </p>

                {/* Profile + Text row */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">
                    {/* Profile image with animated ring */}
                    <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-110 animate-pulse" />
                        <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary shadow-2xl shadow-primary/20 transform hover:scale-105 transition-transform duration-300 relative z-10">
                            <img
                                src={`${process.env.PUBLIC_URL}${siteData.profilePhoto}`}
                                alt={siteData.name}
                                loading="eager"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://ui-avatars.com/api/?name=Jasvanth+S&background=00F0FF&color=050505&size=400&bold=true&font-size=0.33";
                                }}
                            />
                        </div>
                    </div>

                    {/* About Text */}
                    <div className="max-w-xl text-center md:text-left">
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                            {siteData.bio}
                        </p>
                        <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            I focus on transforming data into actionable insights, writing clean and scalable code, and delivering user-centric AI solutions. I continuously strengthen my analytical thinking and AI skills through real-world projects and experimentation.
                        </p>

                        {/* Currently block */}
                        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-800 rounded-xl p-4 mb-6 text-sm">
                            <p className="font-bold text-gray-800 dark:text-white mb-2 uppercase tracking-wider text-xs">Currently</p>
                            <div className="space-y-1 text-gray-600 dark:text-gray-400">
                                <p>📚 Learning — System Design, Docker, Advanced RAG</p>
                                <p>🔨 Building — AI-driven client web platforms</p>
                                <p>🔍 Open to — Organization roles, R&D, Freelance projects</p>
                            </div>
                        </div>

                        {/* CV Download */}
                        <div className="relative inline-block">
                            <button
                                onClick={() => setShowCVMenu(!showCVMenu)}
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-white dark:text-[#050505] rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                                aria-label="Download CV options"
                            >
                                <FaDownload />
                                Get CV
                            </button>
                            {showCVMenu && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#1E1E1E] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-10">
                                    {siteData.cvFiles.map((cv, index) => (
                                        <a
                                            key={index}
                                            href={`${process.env.PUBLIC_URL}${cv.file}`}
                                            download
                                            className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                            onClick={() => setShowCVMenu(false)}
                                        >
                                            {cv.role}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <p className="mt-6">
                            <Link to="/connect" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline group">
                                Let's build something together <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Three-column identity cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {identityCards.map((card, i) => (
                        <div key={i} className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md group">
                            <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${iconBgClasses[card.tagColor]} group-hover:scale-110 transition-transform`}>
                                {card.icon}
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className="font-bold text-gray-900 dark:text-white text-base">{card.label}</h3>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${tagClasses[card.tagColor]}`}>
                                    {card.subtitle}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
