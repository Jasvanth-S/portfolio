import React from 'react';
import siteData from '../config/siteData';

// Map proficiency level % to a tier label
const getTier = (level) => {
    if (!level) return null;
    if (level >= 85) return { label: 'Expert', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800' };
    if (level >= 65) return { label: 'Proficient', color: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800' };
    return { label: 'Familiar', color: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800' };
};

// Learning roadmap — signals growth mindset
const roadmap = [
    { name: 'System Design', note: 'Scalable architecture patterns' },
    { name: 'Docker & K8s', note: 'Container orchestration' },
    { name: 'Advanced RAG', note: 'Graph-based & multi-modal retrieval' },
    { name: 'PyTorch Deep Dive', note: 'Scientific computing & research' },
];

const Skills = () => {
    return (
        <section id="skills" className="py-20 bg-gray-50 dark:bg-transparent/20 hover-trigger">
            <style>{`
                .group:hover .animate-bar-fill {
                    animation: fillBar 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }
                @keyframes fillBar {
                    0% { width: 0%; }
                    100% { width: var(--skill-level); }
                }
            `}</style>
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                    Core <span className="text-primary">Skills</span>
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-4 text-sm">
                    Hover any skill card to see proficiency level.
                </p>
                {/* Tier Legend */}
        

                <div className="max-w-6xl mx-auto space-y-12">
                    {siteData.skillsCategorized.map((categoryGroup, index) => (
                        <div key={index} className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2">
                                {categoryGroup.category}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {categoryGroup.skills.map((skill, skillIndex) => {
                                    const tier = getTier(skill.level);
                                    return (
                                        <div
                                            key={skillIndex}
                                            className="group p-4 bg-white/70 dark:bg-secondary/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border-t border-white/5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1E1E1E]/80 border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center gap-2 transform hover:-translate-y-2 shadow-sm hover:shadow-md"
                                        >
                                            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <img
                                                    src={skill.iconUrl}
                                                    alt={skill.name}
                                                    loading="lazy"
                                                    className={`w-full h-full object-contain ${skill.customClass || ''}`}
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            </div>
                                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors text-center w-full truncate">
                                                {skill.name}
                                            </h3>
                                            {/* Tier badge — visible on hover */}
                                            {tier && (
                                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${tier.color}`}>
                                                    {tier.label}
                                                </span>
                                            )}
                                            {/* Progress bar */}
                                            {skill.level && (
                                                <div
                                                    className="w-full mt-1 flex flex-col gap-1"
                                                    style={{ "--skill-level": `${skill.level}%` }}
                                                >
                                                    <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                        <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Proficiency</span>
                                                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{skill.level}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-[#0A0A0A] rounded-full h-1.5 overflow-hidden border border-gray-300/50 dark:border-white/5 relative">
                                                        <div
                                                            className="bg-primary h-full rounded-full w-[var(--skill-level)] relative group-hover:brightness-110 animate-bar-fill"
                                                        >
                                                            <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Learning Roadmap */}
                <div className="max-w-6xl mx-auto mt-16">
                    <div className="bg-white/70 dark:bg-secondary/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border-t border-white/5 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl">🚀</span>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Learning Roadmap</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Actively expanding into — growth mindset, always.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {roadmap.map((item, i) => (
                                <div key={i} className="bg-gray-50 dark:bg-transparent rounded-xl p-4 border border-dashed border-gray-300 dark:border-gray-700">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">{item.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">{item.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;

