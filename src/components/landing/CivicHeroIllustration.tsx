import React, { useState, useEffect } from 'react';
import {
  MapPin,
  CheckCircle2,
  Clock,
  Wrench,
  Smartphone,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const CivicHeroIllustration: React.FC = () => {
  // Cycle through the 3 process states: 0: Reported, 1: In Progress, 2: Resolved
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      {/* Background soft mint glowing circle */}
      <div className="absolute inset-0 bg-[#DDF1E9]/80 rounded-3xl blur-2xl -z-10 transform scale-95" />

      {/* Main Illustration Container */}
      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-[#DCE5E0] p-6 sm:p-8 shadow-card overflow-hidden">
        {/* Top Mini Urban Environment SVG */}
        <div className="relative w-full h-56 sm:h-64 flex items-center justify-center">
          <svg
            viewBox="0 0 500 260"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft Sky Background */}
            <rect width="500" height="260" rx="16" fill="#F3F7F5" />

            {/* City Skyline Buildings in Background */}
            <path
              d="M30 200V130H60V90H95V140H120V200H30Z"
              fill="#DCE5E0"
              opacity="0.6"
            />
            <path
              d="M130 200V110H170V80H210V140H235V200H130Z"
              fill="#D4E1DC"
              opacity="0.8"
            />
            <path
              d="M260 200V100H295V70H335V130H365V200H260Z"
              fill="#DCE5E0"
              opacity="0.7"
            />
            <path
              d="M380 200V120H420V95H465V200H380Z"
              fill="#D4E1DC"
              opacity="0.8"
            />

            {/* Street trees / foliage */}
            <circle cx="110" cy="180" r="18" fill="#16845F" opacity="0.3" />
            <circle cx="118" cy="172" r="14" fill="#176B50" opacity="0.4" />
            <circle cx="370" cy="180" r="20" fill="#16845F" opacity="0.3" />
            <circle cx="362" cy="170" r="15" fill="#176B50" opacity="0.4" />

            {/* Modern Streetlight on left */}
            <path
              d="M150 195V120C150 115 155 110 165 110H175"
              stroke="#718078"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="175" cy="114" r="5" fill="#E58A18" />
            <path
              d="M168 119L160 145H190L182 119Z"
              fill="#E58A18"
              opacity={stage === 2 ? '0.3' : '0.1'}
            />

            {/* Road Surface */}
            <rect x="0" y="200" width="500" height="60" fill="#3A4D45" />
            {/* Sidewalk curb */}
            <rect x="0" y="195" width="500" height="7" fill="#CBD8D2" />
            {/* White Dashed Road Lines */}
            <line
              x1="30"
              y1="230"
              x2="90"
              y2="230"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeDasharray="16 14"
              opacity="0.85"
            />
            <line
              x1="130"
              y1="230"
              x2="230"
              y2="230"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeDasharray="16 14"
              opacity="0.85"
            />
            <line
              x1="270"
              y1="230"
              x2="470"
              y2="230"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeDasharray="16 14"
              opacity="0.85"
            />

            {/* Pothole / Repair Spot in Center Road */}
            <ellipse
              cx="250"
              cy="234"
              rx="32"
              ry="12"
              fill={stage === 2 ? '#24342E' : '#1D2A25'}
            />
            {/* Filled asphalt texture when resolved */}
            {stage === 2 && (
              <ellipse
                cx="250"
                cy="234"
                rx="30"
                ry="10"
                fill="#16A05A"
                opacity="0.25"
              />
            )}

            {/* Safety Traffic Cone in center */}
            <path d="M216 238L222 216H228L234 238H216Z" fill="#E58A18" />
            <rect x="214" y="238" width="22" height="3" fill="#DCE5E0" />
            <path d="M220 226L223 222H227L230 226H220Z" fill="#FFFFFF" />

            {/* CHARACTER 1: Citizen with Smartphone (Left) */}
            <g transform="translate(65, 140)">
              {/* Body */}
              <circle cx="20" cy="14" r="9" fill="#172B25" />
              <path
                d="M10 55V32C10 27 14 24 20 24C26 24 30 27 30 32V55"
                fill="#176B50"
              />
              {/* Legs */}
              <rect x="13" y="55" width="5" height="15" rx="2" fill="#172B25" />
              <rect x="22" y="55" width="5" height="15" rx="2" fill="#172B25" />
              {/* Arm holding phone */}
              <path
                d="M26 32L34 40L36 36"
                stroke="#172B25"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Smartphone */}
              <rect
                x="33"
                y="30"
                width="8"
                height="14"
                rx="1.5"
                fill="#0E241D"
              />
              <rect x="34.5" y="32" width="5" height="10" fill="#DDF1E9" />
              {/* Pulsing signal wave from phone */}
              <circle
                cx="37"
                cy="26"
                r="4"
                stroke="#16845F"
                strokeWidth="1.5"
                opacity="0.8"
                className="animate-ping"
              />
            </g>

            {/* CHARACTER 2: Municipal Field Worker with Safety Vest (Right) */}
            <g transform="translate(300, 140)">
              {/* Hard hat */}
              <path d="M12 11C12 5 28 5 28 11H12Z" fill="#E58A18" />
              <rect x="9" y="10.5" width="22" height="2" rx="1" fill="#E58A18" />
              {/* Head */}
              <circle cx="20" cy="14" r="7.5" fill="#172B25" />
              {/* Body with Hi-Vis Vest */}
              <path
                d="M10 55V32C10 27 14 24 20 24C26 24 30 27 30 32V55"
                fill="#0E241D"
              />
              {/* Safety Vest Overlays */}
              <path
                d="M12 28H28V46H12V28Z"
                fill="#E58A18"
                opacity="0.9"
              />
              <line x1="14" y1="36" x2="26" y2="36" stroke="#FFFFFF" strokeWidth="2" />
              {/* Legs */}
              <rect x="13" y="55" width="5" height="15" rx="2" fill="#172B25" />
              <rect x="22" y="55" width="5" height="15" rx="2" fill="#172B25" />
              {/* Arm holding repair tool/compactor */}
              <path
                d="M12 34L-4 46L-10 68"
                stroke="#718078"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Tool head near pothole */}
              <rect x="-16" y="65" width="12" height="6" rx="1.5" fill="#172B25" />
            </g>

            {/* Location Pin Hovering over Pothole */}
            <g transform="translate(242, 175)">
              <path
                d="M8 0C3.58 0 0 3.58 0 8C0 14 8 22 8 22C8 22 16 14 16 8C16 3.58 12.42 0 8 0Z"
                fill={stage === 2 ? '#16A05A' : stage === 1 ? '#E58A18' : '#176B50'}
                className="transition-colors duration-500"
              />
              <circle cx="8" cy="8" r="3.5" fill="#FFFFFF" />
            </g>
          </svg>
        </div>

        {/* Dynamic Animated Status Card Beneath Illustration */}
        <div className="mt-4 pt-4 border-t border-[#DCE5E0]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#718078] uppercase tracking-wider">
              Issue Lifecycle Simulation
            </span>
            <span className="text-[10px] font-medium text-[#718078]">
              Automated Loop
            </span>
          </div>

          {/* 3 Step Pill Tracker */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {/* Step 1: Reported */}
            <div
              className={`p-2.5 rounded-xl border text-left transition-all duration-300 ${
                stage === 0
                  ? 'bg-[#DDF1E9] border-[#16845F] shadow-sm'
                  : 'bg-[#F3F6F4] border-[#DCE5E0] opacity-60'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#172B25]">
                <Smartphone className="w-3.5 h-3.5 text-[#176B50]" />
                <span>01 Reported</span>
              </div>
              <p className="text-[10px] text-[#718078] mt-0.5 leading-tight">
                Photo & GPS logged
              </p>
            </div>

            {/* Step 2: In Progress */}
            <div
              className={`p-2.5 rounded-xl border text-left transition-all duration-300 ${
                stage === 1
                  ? 'bg-amber-50 border-[#E58A18] shadow-sm'
                  : 'bg-[#F3F6F4] border-[#DCE5E0] opacity-60'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#172B25]">
                <Wrench className="w-3.5 h-3.5 text-[#E58A18]" />
                <span>02 In Progress</span>
              </div>
              <p className="text-[10px] text-[#718078] mt-0.5 leading-tight">
                Team dispatched
              </p>
            </div>

            {/* Step 3: Resolved & Verified */}
            <div
              className={`p-2.5 rounded-xl border text-left transition-all duration-300 ${
                stage === 2
                  ? 'bg-emerald-50 border-[#16A05A] shadow-sm'
                  : 'bg-[#F3F6F4] border-[#DCE5E0] opacity-60'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#172B25]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A05A]" />
                <span>03 Resolved</span>
              </div>
              <p className="text-[10px] text-[#718078] mt-0.5 leading-tight">
                Resident verified ✓
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

