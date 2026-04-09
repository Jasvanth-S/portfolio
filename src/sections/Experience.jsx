import React from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import siteData from '../config/siteData';

const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-white dark:bg-transparent">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                    Work <span className="text-primary">Experience</span>
                </h2>

                <div className="max-w-4xl mx-auto">
                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-primary/20"></div>

                        {siteData.experience.map((exp, index) => (
                            <div
                                key={index}
                                className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-[#0A192F] z-10"></div>

                                {/* Content Card */}
                                <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                                    <div className="bg-white/60 dark:bg-secondary/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border-t border-white/5 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                                        {/* Header */}
                                        <div className="mb-4">
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                <FaBriefcase className="text-primary" />
                                                {exp.role}
                                            </h3>
                                            <p className="text-lg font-semibold text-primary mb-2">{exp.company}</p>

                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <FaMapMarkerAlt className="text-primary" />
                                                    {exp.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaCalendarAlt className="text-primary" />
                                                    {exp.period}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                                            {exp.description}
                                        </p>

                                        {/* Achievements */}
                                        <div className="space-y-2">
                                            <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">Key Achievements:</p>
                                            {exp.achievements.map((achievement, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <FaCheckCircle className="text-primary mt-1 flex-shrink-0" size={14} />
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{achievement}</p>
                                                </div>
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

export default Experience;

