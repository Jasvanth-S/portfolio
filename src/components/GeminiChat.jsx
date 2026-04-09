import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaRegPaperPlane, FaMagic } from 'react-icons/fa';
import siteData from '../config/siteData';

const GeminiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hello! I'm ${siteData.name}'s AI Assistant, powered by Google Gemini. Ask me about Jasvanth's engineering skills, projects, or background!` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      // Look for API Key in environment securely. 
      // User must add REACT_APP_GEMINI_API_KEY to their .env file.
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      
      if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY") {
         setTimeout(() => {
            setMessages(prev => [...prev, { 
              role: 'assistant', 
              text: "System Note: My Gemini API key is currently missing! Please add REACT_APP_GEMINI_API_KEY to your .env file to activate me." 
            }]);
            setIsTyping(false);
         }, 1000);
         return;
      }

      // Massive context payload outlining ALL developer capabilities
      const systemContext = `
        You are the official AI assistant for ${siteData.name}'s portfolio! 
        Your goal is to answer recruiter and client questions professionally, accurately, and enthusiastically.
        
        # Identity & Bio
        Name: ${siteData.name}
        Email: ${siteData.email}
        Bio: ${siteData.bio}
        Roles: ${siteData.roles.map(r => r.title).join(', ')}

        # Education
        ${siteData.education.map(e => `- ${e.degree} in ${e.specialization} from ${e.institution} (${e.year}) - CGPA: ${e.cgpa}`).join('\n')}

        # Work Experience
        ${siteData.experience.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join('\n')}

        # Core Skills
        ${siteData.skillsCategorized.map(c => `- ${c.category}: ${c.skills.map(s => s.name).join(', ')}`).join('\n')}

        # Certifications
        ${siteData.certifications ? siteData.certifications.map(c => `- ${c.name} by ${c.organization} (${c.year})`).join('\n') : 'Constantly learning and earning new certifications!'}

        # Event Highlights
        ${siteData.highlights ? siteData.highlights.map(h => `- ${h.title} (${h.date})`).join(', ') : ''}

        RULES:
        1. Answer in a concise, energetic, tech-savvy tone.
        2. Keep answers under 4 sentences unless the user explicitly asks for a list.
        3. Only provide information based on the context above. If you don't know, kindly offer the email ${siteData.email} for them to reach out directly.
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemContext + "\n\nUser Question: " + userMessage }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 256 }
          })
        }
      );

      const data = await response.json();
      
      if (data.error) throw new Error(data.error.message);
      
      const assistantResponse = data.candidates[0].content.parts[0].text;
      
      setMessages(prev => [...prev, { role: 'assistant', text: assistantResponse }]);

    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: `API Error: ${error.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      
      {/* Chat Window Overlay */}
      <div 
        className={`mb-4 transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} w-[90vw] sm:w-[400px] h-[550px] max-h-[80vh] flex flex-col backdrop-blur-2xl bg-white/70 dark:bg-[#0D1F3C]/80 border border-gray-200/50 dark:border-[#38BDF8]/20 shadow-[0_8px_48px_rgba(0,0,0,0.4)] dark:shadow-[0_0_40px_rgba(56,189,248,0.12)] rounded-2xl overflow-hidden`}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-700 to-sky-400 dark:from-blue-900 dark:to-blue-800 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <FaMagic size={14} className="animate-pulse" />
             </div>
             <div>
               <h3 className="font-display font-bold text-sm tracking-wide leading-tight">Gemini Interface</h3>
               <p className="font-mono text-[10px] opacity-80 uppercase tracking-widest">Active Model</p>
             </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-8 h-8 rounded-full hover:bg-white/20 flex flex-col items-center justify-center transition-colors"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-body scrollbar-hide">
             {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white dark:bg-[#162B52] text-gray-800 dark:text-gray-100 rounded-bl-none shadow-sm border border-gray-100 dark:border-white/5'
                   }`}>
                      {msg.text}
                   </div>
                </div>
             ))}
             
             {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white dark:bg-[#162B52] px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1 border border-gray-100 dark:border-white/5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-sky-200 rounded-full animate-bounce"></span>
                   </div>
                </div>
             )}
             <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#0D1F3C] border-t border-gray-200 dark:border-white/10 flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Jasvanth..."
            className="flex-1 bg-gray-100 dark:bg-[#0A1628] border border-transparent focus:border-sky-400 text-gray-900 dark:text-white rounded-xl px-4 py-2 font-body text-sm outline-none transition-all"
          />
          <button 
             type="submit"
             disabled={!input.trim()}
             className="bg-blue-600 hover:bg-sky-500 text-white p-3 rounded-xl transform hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-sm"
          >
            <FaRegPaperPlane size={14} className="ml-[-2px]" />
          </button>
        </form>
      </div>

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-white flex items-center justify-center shadow-[0_4px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(56,189,248,0.4)] transform hover:-translate-y-1 transition-all duration-300 ring-4 ring-white/20 dark:ring-[#0D1F3C]"
      >
         {isOpen ? <FaTimes size={20} /> : <FaRobot size={24} />}
      </button>
      
    </div>
  );
};

export default GeminiChat;
