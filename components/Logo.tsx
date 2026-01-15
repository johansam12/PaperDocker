
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Book Background */}
    <path d="M10 25C10 22.2386 12.2386 20 15 20H50V80H15C12.2386 80 10 77.7614 10 75V25Z" fill="#006699" />
    <path d="M90 25C90 22.2386 87.7614 20 85 20H50V80H85C87.7614 80 90 77.7614 90 75V25Z" fill="#004466" />
    {/* Book Pages Effect */}
    <path d="M15 22H50V78H15C13.3431 78 12 76.6569 12 75V25C12 23.3431 13.3431 22 15 22Z" fill="white" fillOpacity="0.9" />
    <path d="M85 22H50V78H85C86.6569 78 88 76.6569 88 75V25C88 23.3431 86.6569 22 85 22Z" fill="white" fillOpacity="0.8" />
    {/* Vault Dial */}
    <circle cx="50" cy="45" r="18" fill="#0088AA" />
    <circle cx="50" cy="45" r="14" fill="#00AACC" />
    <circle cx="50" cy="45" r="12" fill="#0088AA" />
    {/* Dial Details */}
    <circle cx="50" cy="45" r="8" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" />
    <path d="M50 37V40M58 45H55M50 53V50M42 45H45" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="50" cy="45" r="2" fill="white" />
    {/* Sparkles */}
    <path d="M55 10L56.5 13.5L60 15L56.5 16.5L55 20L53.5 16.5L50 15L53.5 13.5L55 10Z" fill="#00AACC" />
    <path d="M65 15L66 17.5L68.5 18.5L66 19.5L65 22L64 19.5L61.5 18.5L64 17.5L65 15Z" fill="#0088AA" />
  </svg>
);

export default Logo;
