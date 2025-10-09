/**
 * Usage (example):
 * <HeadlineBar
 *   title="Dystopia: AI-Integrated OS Middleware"
 *   cta={{ text: "✨ AI-Powered Middleware", onClick: () => console.log("open modal") }}
 *   className="mb-4"
 * />
 */

import React from 'react'

export interface HeadlineBarProps {
  title: string                                // main title text
  left?: { icon?: string; text: string }       // default: 🔒 + "100% Private"
  cta?: { text: string; onClick?: () => void; ariaLabel?: string } // default: "✨ AI-Powered Middleware"
  className?: string                           // optional wrapper classes
  rounded?: "lg" | "xl" | "2xl"                // default "2xl"
}

// Helper subcomponent for glass-style chips
function Chip({ icon, text, className = "" }: { icon?: string; text: string; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 dark:bg-white/5 border border-white/15 rounded-full backdrop-blur-sm ${className}`}>
      {icon && <span className="text-sm">{icon}</span>}
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
        {text}
      </span>
    </div>
  )
}

// Helper subcomponent for gradient CTA chips
function CTAChip({ text, onClick, ariaLabel, className = "" }: { 
  text: string; 
  onClick?: () => void; 
  ariaLabel?: string; 
  className?: string 
}) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel || `Click to ${text.toLowerCase()}`}
      className={`relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sheen-animation ${className}`}
    >
      <span className="text-sm whitespace-nowrap">{text}</span>
    </button>
  )
}

export default function HeadlineBar({
  title,
  left = { icon: "🔒", text: "100% Private" },
  cta = { text: "✨ AI-Powered Middleware" },
  className = "",
  rounded = "2xl"
}: HeadlineBarProps) {
  const roundedClass = {
    lg: "rounded-lg",
    xl: "rounded-xl", 
    "2xl": "rounded-2xl"
  }[rounded]

  return (
    <>
      <div 
        role="region" 
        aria-label="Product headline and key features"
        className={`flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 bg-white/10 dark:bg-white/5 border border-white/15 ${roundedClass} backdrop-blur shadow-lg ${className}`}
      >
        {/* Left chip - appears first on mobile, left on desktop */}
        <div className="order-1 sm:order-1">
          <Chip icon={left.icon} text={left.text} />
        </div>

        {/* Main title - takes full width on mobile, flexible on desktop */}
        <div className="order-2 sm:order-2 sm:flex-1">
          <h2 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white truncate">
            {title}
          </h2>
        </div>

        {/* Right CTA chip - appears last */}
        <div className="order-3 sm:order-3">
          <CTAChip 
            text={cta.text} 
            onClick={cta.onClick}
            ariaLabel={cta.ariaLabel}
          />
        </div>
      </div>

      {/* Sheen animation styles - only if motion is allowed */}
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          .sheen-animation {
            position: relative;
            overflow: hidden;
          }
          
          .sheen-animation::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transition: left 0.5s;
          }
          
          .sheen-animation:hover::before {
            left: 100%;
          }
          
          @keyframes sheen {
            0% {
              left: -100%;
            }
            100% {
              left: 100%;
            }
          }
          
          .sheen-animation::before {
            animation: sheen 3s ease-in-out infinite;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .sheen-animation::before {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
