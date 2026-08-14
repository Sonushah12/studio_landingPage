import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Clock, MapPin, Sparkles, Menu } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';
import { MobileDrawerMenu } from './MobileDrawerMenu';
import { SafeImage } from './SafeImage';

interface NavbarProps {
  onOpenTrialModal: (preferredClass?: string) => void;
  onOpenQuiz: () => void;
  onOpenAdvisor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTrialModal,
  onOpenQuiz,
  onOpenAdvisor,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { data } = useStudioData();
  const { generalInfo } = data;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentAddress =
    generalInfo.address ||
    generalInfo.fullAddress ||
    'Hanshoura Road, Ahmedabad, Gujarat';

  return (
    <>
      {/* Top micro-bar for studio announcements */}
      {generalInfo.announcementBarEnabled && (
        <div className="bg-[#1E1D1B] text-[#F7F5F0] text-xs py-1.5 px-4 hidden md:block border-b border-[#2C2B29]/30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 text-[#D9D7D0]">
              <span className="flex items-center gap-1.5 font-medium text-[#D8E8D4]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#7A9E74] animate-pulse"></span>
                {generalInfo.announcementBarText ||
                  `Studio Open Today · ${generalInfo.operatingHoursWeekday || '7:00 AM – 9:30 PM'}`}
              </span>
              <span className="text-[#9E9B92]">|</span>
              <span className="flex items-center gap-1 truncate max-w-xs">
                <MapPin className="w-3.5 h-3.5 text-[#B5CAB0] flex-shrink-0" />
                <span className="truncate">{currentAddress}</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onOpenQuiz}
                className="text-[#D8E8D4] hover:text-white transition flex items-center gap-1 text-[11px] font-medium cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-[#B5CAB0]" />
                30-Sec "Find Your Dance Match" Quiz
              </button>
              <span className="text-[#9E9B92]">|</span>
              <a
                href={`tel:${generalInfo.phone || '+919909843221'}`}
                className="text-[#D9D7D0] hover:text-[#B5CAB0] transition flex items-center gap-1 font-medium"
              >
                <Phone className="w-3 h-3 text-[#B5CAB0]" />
                {generalInfo.phoneDisplay || '+91 99098 43221'}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F5F0]/95 backdrop-blur-md shadow-sm border-b border-[#D9D7D0]/60 py-2.5 sm:py-3'
            : 'bg-[#F7F5F0]/90 backdrop-blur-sm border-b border-[#D9D7D0]/40 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer"
            aria-label={`${generalInfo.studioName} Homepage`}
          >
            {generalInfo.logoUrl ? (
              <SafeImage
                src={generalInfo.logoUrl}
                alt={generalInfo.studioName}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-[#B5CAB0]"
              />
            ) : (
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-[#D8E8D4]/60 border border-[#B5CAB0] transition-transform group-hover:scale-105 duration-300">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 44 44"
                  fill="none"
                  className="transform group-hover:rotate-6 transition-transform"
                >
                  <circle
                    cx="22"
                    cy="22"
                    r="19"
                    stroke="#7A9E74"
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                  />
                  <line
                    x1="22"
                    y1="32"
                    x2="20"
                    y2="40"
                    stroke="#3D6338"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22 32 C26 28 30 24 33 20"
                    stroke="#3D6338"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M22 26 C21 29 22 32 22 32"
                    stroke="#2C2B29"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M22 26 C19 22 16 18 14 15"
                    stroke="#2C2B29"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx="22" cy="13" r="3.5" fill="#2C2B29" />
                  <path
                    d="M19 30 C16 28 14 31 16 33 C17 31 18 30 19 30Z"
                    fill="#7A9E74"
                    opacity="0.8"
                  />
                </svg>
              </div>
            )}

            <div>
              <div className="font-display font-bold text-lg sm:text-2xl tracking-tight text-[#1E1D1B] leading-none group-hover:text-[#3D6338] transition-colors">
                {(generalInfo.studioName || 'Merrick').split(' ')[0]}
              </div>
              <div className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-medium text-[#7A9E74] flex items-center gap-1 mt-0.5">
                <span>
                  {(generalInfo.tagline || 'Dance & Entertainment').split('&')[0]?.trim() || 'Dance'}
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#B5CAB0]"></span>
                <span className="text-[#5A5854]">
                  {(generalInfo.tagline || 'Dance & Entertainment').split('&')[1]?.trim() || 'Entertainment'}
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-xs font-semibold uppercase tracking-wider text-[#5A5854] hover:text-[#3D6338] transition cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('classes')}
              className="text-xs font-semibold uppercase tracking-wider text-[#5A5854] hover:text-[#3D6338] transition cursor-pointer"
            >
              Classes
            </button>
            <button
              onClick={() => scrollToSection('schedule')}
              className="text-xs font-semibold uppercase tracking-wider text-[#5A5854] hover:text-[#3D6338] transition cursor-pointer flex items-center gap-1"
            >
              <Clock className="w-3.5 h-3.5 text-[#7A9E74]" />
              Timetable
            </button>
            <button
              onClick={() => scrollToSection('instructors')}
              className="text-xs font-semibold uppercase tracking-wider text-[#5A5854] hover:text-[#3D6338] transition cursor-pointer"
            >
              Tutors
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-xs font-semibold uppercase tracking-wider text-[#5A5854] hover:text-[#3D6338] transition cursor-pointer"
            >
              Fees &amp; Passes
            </button>
            <button
              onClick={() => scrollToSection('workshops')}
              className="text-xs font-semibold uppercase tracking-wider text-[#5A5854] hover:text-[#3D6338] transition cursor-pointer relative"
            >
              Workshops
              <span className="absolute -top-2.5 -right-3 px-1 py-0.2 bg-[#3D6338] text-white text-[8px] font-bold rounded-full uppercase">
                New
              </span>
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-xs font-semibold uppercase tracking-wider text-[#5A5854] hover:text-[#3D6338] transition cursor-pointer"
            >
              FAQ &amp; Contact
            </button>
          </nav>

          {/* Right Action buttons for Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAdvisor}
              className="px-3.5 py-2 text-xs font-medium text-[#3D6338] bg-[#D8E8D4]/60 hover:bg-[#D8E8D4] rounded-full transition flex items-center gap-1.5 border border-[#B5CAB0]/80 cursor-pointer shadow-xs"
              title="Ask AI Studio Advisor"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#3D6338]" />
              <span className="hidden md:inline">Studio Advisor</span>
            </button>

            <button
              onClick={() => onOpenTrialModal()}
              className="px-5 py-2.5 bg-[#3D6338] hover:bg-[#2C4927] text-white text-xs font-semibold tracking-wider uppercase rounded-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D8E8D4]" />
              <span>Book Free Trial</span>
            </button>
          </div>

          {/* Mobile Quick Action + Slide-out Drawer Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenTrialModal()}
              className="px-3.5 py-1.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-semibold rounded-full shadow-sm sm:hidden flex items-center gap-1 cursor-pointer"
            >
              <Calendar className="w-3 h-3 text-[#D8E8D4]" />
              <span>Free Trial</span>
            </button>

            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="p-2.5 text-[#1E1D1B] hover:text-[#3D6338] bg-white/80 hover:bg-white border border-[#D9D7D0] rounded-2xl shadow-xs cursor-pointer transition active:scale-95 flex items-center justify-center"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5 text-[#1E1D1B]" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Navigation Drawer */}
      <MobileDrawerMenu
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        onOpenTrialModal={() => onOpenTrialModal()}
        onOpenQuiz={onOpenQuiz}
        onOpenAdvisor={onOpenAdvisor}
      />
    </>
  );
};
