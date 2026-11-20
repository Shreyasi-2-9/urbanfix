import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CivicHeroIllustration } from './CivicHeroIllustration';
import {
  Building2,
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
  Camera,
  ClipboardList,
  CheckCircle2,
  Menu,
  X,
  HelpCircle,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6F4] text-[#172B25] selection:bg-[#176B50] selection:text-white font-sans">
      {/* =========================================================================
          NAVIGATION BAR (Sticky, Minimal & Spacious)
      ========================================================================== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#DCE5E0] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          {/* Left: Brand Name & Tagline */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#176B50] flex items-center justify-center text-white shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#172B25] block leading-none">
                UrbanFix
              </span>
              <span className="text-xs font-medium text-[#718078] mt-1 block leading-none">
                Civic Operations Platform
              </span>
            </div>
          </div>

          {/* Right: Desktop Navigation Links + Primary CTA */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#718078]">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, 'home')}
              className="hover:text-[#176B50] transition-colors"
            >
              Home
            </a>
            <a
              href="#objective"
              onClick={(e) => scrollToSection(e, 'objective')}
              className="hover:text-[#176B50] transition-colors"
            >
              Our Objective
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="hover:text-[#176B50] transition-colors"
            >
              How It Works
            </a>

            {/* Primary Action Button */}
            <button
              onClick={() => navigateTo('login')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#176B50] hover:bg-[#16845F] active:bg-[#0E241D] text-white text-sm font-bold shadow-sm hover:shadow transition-all"
            >
              <span>Sign In / Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#172B25] hover:bg-[#F3F6F4] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#DCE5E0] px-6 py-5 space-y-4 shadow-card">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, 'home')}
              className="block text-sm font-semibold text-[#718078] hover:text-[#176B50]"
            >
              Home
            </a>
            <a
              href="#objective"
              onClick={(e) => scrollToSection(e, 'objective')}
              className="block text-sm font-semibold text-[#718078] hover:text-[#176B50]"
            >
              Our Objective
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="block text-sm font-semibold text-[#718078] hover:text-[#176B50]"
            >
              How It Works
            </a>
            <div className="pt-2 border-t border-[#DCE5E0]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('login');
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#176B50] text-white text-sm font-bold shadow-sm"
              >
                <span>Sign In / Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          SECTION 1 – HERO SECTION
      ========================================================================== */}
      <section id="home" className="pt-16 sm:pt-24 pb-20 sm:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Hero Copy & CTA */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              {/* Small introductory label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDF1E9] text-[#176B50] text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#16A05A] animate-pulse" />
                <span>BUILDING BETTER, MORE ACCOUNTABLE CITIES</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#172B25] tracking-tight leading-[1.12]">
                Your City.{' '}
                <span className="block text-[#176B50]">Your Voice.</span>
                Real Solutions.
              </h1>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-[#718078] leading-relaxed max-w-xl">
                From potholes and overflowing drains to broken streetlights and garbage problems, UrbanFix helps citizens report local issues, track their progress, and ensure that problems are actually resolved.
              </p>

              {/* Primary Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#176B50] hover:bg-[#16845F] active:bg-[#0E241D] text-white text-base font-bold shadow-md hover:shadow-lg transition-all group"
                >
                  <span>Sign In / Login</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: Hero Civic Illustration */}
            <div className="lg:col-span-6">
              <CivicHeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 – OUR MAIN OBJECTIVE
      ========================================================================== */}
      <section
        id="objective"
        className="py-20 sm:py-32 bg-white border-y border-[#DCE5E0]"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172B25] tracking-tight">
              Making Our Cities Better, One Problem at a Time.
            </h2>
            <p className="text-base sm:text-lg text-[#718078] leading-relaxed">
              UrbanFix bridges the gap between citizens and civic authorities by making local problems visible, trackable, and accountable. It ensures that every reported issue has a clear status, a responsible authority, and a verified resolution.
            </p>
          </div>

          {/* 3 Informational Objective Cards (Strictly Non-Clickable) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 – REPORT & BE HEARD */}
            <div className="bg-[#F8FAF9] rounded-3xl p-8 sm:p-10 border border-[#DCE5E0] shadow-card hover:shadow-md transition-shadow select-none space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#DDF1E9] text-[#176B50] flex items-center justify-center shadow-inner">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#172B25] tracking-tight">
                REPORT & BE HEARD
              </h3>
              <p className="text-sm text-[#718078] leading-relaxed">
                Report civic problems such as potholes, garbage, drainage issues, water leakage, and broken streetlights with photos and location details.
              </p>
            </div>

            {/* Card 2 – TRACK & STAY INFORMED */}
            <div className="bg-[#F8FAF9] rounded-3xl p-8 sm:p-10 border border-[#DCE5E0] shadow-card hover:shadow-md transition-shadow select-none space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#DDF1E9] text-[#176B50] flex items-center justify-center shadow-inner">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#172B25] tracking-tight">
                TRACK & STAY INFORMED
              </h3>
              <p className="text-sm text-[#718078] leading-relaxed">
                Follow complaint progress through live status updates, assigned authorities, and resolution deadlines.
              </p>
            </div>

            {/* Card 3 – VERIFY & ENSURE ACCOUNTABILITY */}
            <div className="bg-[#F8FAF9] rounded-3xl p-8 sm:p-10 border border-[#DCE5E0] shadow-card hover:shadow-md transition-shadow select-none space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#DDF1E9] text-[#176B50] flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#172B25] tracking-tight">
                VERIFY & ENSURE ACCOUNTABILITY
              </h3>
              <p className="text-sm text-[#718078] leading-relaxed">
                Check the repair evidence, verify whether the problem is fixed, and reopen complaints if the issue remains unresolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 – HOW URBANFIX WORKS
      ========================================================================== */}
      <section id="how-it-works" className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172B25] tracking-tight">
              From Reporting to Resolution.
            </h2>
            <p className="text-base sm:text-lg text-[#718078] leading-relaxed">
              Every civic complaint follows a transparent journey, ensuring that problems do not simply get reported but actually get solved.
            </p>
          </div>

          {/* 4 Step Cards Timeline (Strictly Non-Clickable) */}
          <div className="relative">
            {/* Desktop Connecting Progress Line */}
            <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-[#DCE5E0] -translate-y-1/2 -z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {/* STEP 01 */}
              <div className="bg-white rounded-3xl p-7 border border-[#DCE5E0] shadow-card hover:shadow-md transition-shadow select-none flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#176B50]/30 tracking-tight">
                      01
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#DDF1E9] text-[#176B50] flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#172B25]">
                    REPORT A PROBLEM
                  </h3>
                  <p className="text-xs sm:text-sm text-[#718078] leading-relaxed">
                    Citizens report a local issue by adding a photograph, selecting its category, and providing the location.
                  </p>
                </div>
              </div>

              {/* STEP 02 */}
              <div className="bg-white rounded-3xl p-7 border border-[#DCE5E0] shadow-card hover:shadow-md transition-shadow select-none flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#176B50]/30 tracking-tight">
                      02
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#DDF1E9] text-[#176B50] flex items-center justify-center">
                      <ClipboardList className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#172B25]">
                    ASSIGN & TAKE ACTION
                  </h3>
                  <p className="text-xs sm:text-sm text-[#718078] leading-relaxed">
                    The complaint is reviewed and assigned to the responsible ward or officer for necessary action.
                  </p>
                </div>
              </div>

              {/* STEP 03 */}
              <div className="bg-white rounded-3xl p-7 border border-[#DCE5E0] shadow-card hover:shadow-md transition-shadow select-none flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#176B50]/30 tracking-tight">
                      03
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#DDF1E9] text-[#176B50] flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#172B25]">
                    TRACK THE REPAIR
                  </h3>
                  <p className="text-xs sm:text-sm text-[#718078] leading-relaxed">
                    Citizens can follow progress, view status updates, and monitor deadlines until the problem is addressed.
                  </p>
                </div>
              </div>

              {/* STEP 04 */}
              <div className="bg-white rounded-3xl p-7 border border-[#DCE5E0] shadow-card hover:shadow-md transition-shadow select-none flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#176B50]/30 tracking-tight">
                      04
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#DDF1E9] text-[#16A05A] flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#172B25]">
                    VERIFY THE RESOLUTION
                  </h3>
                  <p className="text-xs sm:text-sm text-[#718078] leading-relaxed">
                    The responsible team submits repair evidence, and citizens can verify the solution or reopen the complaint if the problem persists.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 – CLOSING SECTION (Soft Mint Background)
      ========================================================================== */}
      <section className="py-20 sm:py-28 bg-[#DDF1E9] border-t border-[#DCE5E0]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6">
          {/* Subtle Verified Icon */}
          <div className="w-14 h-14 rounded-2xl bg-[#176B50] text-white flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B25] tracking-tight">
            Let's Build a City That Listens.
          </h2>

          <p className="text-base sm:text-lg text-[#172B25]/80 max-w-2xl mx-auto leading-relaxed">
            Every reported problem deserves attention. Every repair deserves accountability. Together, let's make our neighbourhoods cleaner, safer, and better.
          </p>

          <div className="pt-4">
            <button
              onClick={() => navigateTo('login')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#176B50] hover:bg-[#16845F] active:bg-[#0E241D] text-white text-base font-bold shadow-md hover:shadow-lg transition-all"
            >
              <span>Sign In / Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 – MINIMAL FOOTER
      ========================================================================== */}
      <footer className="bg-white border-t border-[#DCE5E0] py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#DCE5E0]">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#176B50] flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-base font-bold text-[#172B25] block leading-none">
                  UrbanFix
                </span>
                <span className="text-xs text-[#718078] mt-1 block leading-none font-medium">
                  Civic Operations Platform
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-[#718078]">
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, 'home')}
                className="hover:text-[#176B50] transition-colors"
              >
                Home
              </a>
              <a
                href="#objective"
                onClick={(e) => scrollToSection(e, 'objective')}
                className="hover:text-[#176B50] transition-colors"
              >
                Our Objective
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => scrollToSection(e, 'how-it-works')}
                className="hover:text-[#176B50] transition-colors"
              >
                How It Works
              </a>
              <span className="text-[#DCE5E0]">|</span>
              <button
                onClick={() => navigateTo('login')}
                className="text-[#176B50] hover:underline"
              >
                Sign In / Login
              </button>
            </div>
          </div>

          {/* Bottom Copyright info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#718078]">
            <p>© {new Date().getFullYear()} UrbanFix. All rights reserved.</p>
            <p className="text-[11px] text-[#718078]/80">
              Civic Operations & Municipal Accountability Infrastructure
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

