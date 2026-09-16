import React from 'react';
import Link from 'next/link';

interface TechLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  iconOnly?: boolean;
  className?: string;
}

export const TechIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-[0_0_12px_rgba(56,189,248,0.4)] ${className}`}
    >
      <defs>
        <linearGradient id="techGradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#6366F1" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="techInnerGlow" x1="16" y1="14" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="1" stopColor="#6366F1" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Outer Hexagon Shell */}
      <path
        d="M24 4L42 14.3923V35.1769L24 45.5692L6 35.1769V14.3923L24 4Z"
        stroke="url(#techGradient)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        className="opacity-90"
      />

      {/* Futuristic Stylized Monogram 'T' */}
      <path
        d="M14 16H34M24 16V36"
        stroke="url(#techGradient)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cyber Core Nodes */}
      <circle cx="24" cy="4" r="2.5" fill="#38BDF8" />
      <circle cx="42" cy="14.5" r="2.5" fill="#6366F1" />
      <circle cx="42" cy="35" r="2.5" fill="#A855F7" />
      <circle cx="24" cy="45.5" r="2.5" fill="#38BDF8" />
      <circle cx="6" cy="35" r="2.5" fill="#6366F1" />
      <circle cx="6" cy="14.5" r="2.5" fill="#38BDF8" />

      {/* Center Quantum Dot */}
      <circle cx="24" cy="23" r="2" fill="#38BDF8" className="animate-pulse" />
    </svg>
  );
};

export const TechLogo: React.FC<TechLogoProps> = ({
  size = 'md',
  iconOnly = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 26,
    md: 34,
    lg: 42,
    xl: 52,
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 select-none transition-transform duration-200 active:scale-95 ${className}`}
    >
      <TechIcon size={iconSizes[size]} />
      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center tracking-tight">
            <span className={`font-black tracking-wider ${textSizes[size]} text-slate-900 dark:text-white`}>
              TECH
            </span>
            <span className={`font-black tracking-wider ${textSizes[size]} bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent`}>
              CORP
            </span>
          </div>
          <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] font-semibold text-slate-500 dark:text-slate-400">
            Premium Electronics
          </span>
        </div>
      )}
    </Link>
  );
};

export default TechLogo;
