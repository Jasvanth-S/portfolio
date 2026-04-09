import React from 'react';
import { FaGraduationCap, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import siteData from '../config/siteData';

const Education = () => {
    return (
        <section id="education" className="py-20 bg-gray-50 dark:bg-transparent/20">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                    <span className="text-primary">Education</span>
                </h2>

                <div className="max-w-4xl mx-auto">
                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-primary/20"></div>

                        {siteData.education.map((edu, index) => (
                            <div
                                key={index}
                                className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-[#050505] z-10"></div>

                                {/* Content Card */}
                                <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                                    <div className="bg-white dark:bg-secondary/80 backdrop-blur-md border-t border-white/5 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                                        {/* Header */}
                                        <div className="mb-4">
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                <FaGraduationCap className="text-primary" />
                                                {edu.degree}
                                            </h3>
                                            <p className="text-lg font-semibold text-primary mb-2">{edu.institution}</p>

                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center gap-1 font-medium border-r border-gray-300 dark:border-gray-700 pr-4">
                                                    {edu.specialization}
                                                </span>
                                                <span className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-700 pr-4">
                                                    <FaCalendarAlt className="text-primary" />
                                                    {edu.year}
                                                </span>
                                                {edu.cgpa && (
                                                    <span className="flex items-center gap-1 font-bold text-gray-800 dark:text-gray-200">
                                                        CGPA: <span className="text-primary">{edu.cgpa}</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        <div className="space-y-2">
                                            <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">Key Achievements:</p>
                                            {edu.achievements.map((achievement, i) => (
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

export default Education;

