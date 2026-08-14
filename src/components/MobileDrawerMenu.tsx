import React, { useEffect, useRef } from 'react';
import {
  X,
  Calendar,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  ChevronRight,
  Flame,
  Award,
  Layers,
  Calculator,
  Heart,
  HelpCircle,
  Bot,
  Instagram,
  Music,
  Film,
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';
import { animateDrawerIn, animateDrawerOut } from '../utils/gsapAnimations';

interface MobileDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTrialModal: () => void;
  onOpenQuiz: () => void;
  onOpenAdvisor: () => void;
}

export const MobileDrawerMenu: React.FC<MobileDrawerMenuProps> = ({
  isOpen,
  onClose,
  onOpenTrialModal,
  onOpenQuiz,
  onOpenAdvisor,
}) => {
  const { data } = useStudioData();
  const { generalInfo } = data;

  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      animateDrawerIn(
        drawerRef.current,
        backdropRef.current,
        itemsContainerRef.current
      );
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    animateDrawerOut(drawerRef.current, backdropRef.current, () => {
      onClose();
    });
  };

  const handleNavClick = (sectionId: string) => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 350);
  };

  if (!isOpen) return null;

  const navItems = [
    {
      label: 'Dance Classes & Styles',
      sectionId: 'classes',
      icon: Music,
      badge: '8 Styles',
      badgeColor: 'bg-[#D8E8D4] text-[#3D6338]',
    },
    {
      label: 'Weekly Timetable & Schedule',
      sectionId: 'schedule',
      icon: Calendar,
      badge: 'Live Timetable',
      badgeColor: 'bg-[#EFEDE7] text-[#5A5854]',
    },
    {
      label: 'Master Choreographers',
      sectionId: 'instructors',
      icon: Award,
      badge: 'Nitin & Shubham',
      badgeColor: 'bg-[#D8E8D4] text-[#3D6338]',
    },
    {
      label: 'Studio Tour & Sprung Floors',
      sectionId: 'about',
      icon: Layers,
      badge: '3,500 sq.ft',
      badgeColor: 'bg-[#EFEDE7] text-[#5A5854]',
    },
    {
      label: 'Fee Calculator & Passes',
      sectionId: 'pricing',
      icon: Calculator,
      badge: 'From ₹2,200/mo',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      label: 'Weekend Workshops',
      sectionId: 'workshops',
      icon: Flame,
      badge: 'Intensives',
      badgeColor: 'bg-red-100 text-red-700',
    },
    {
      label: 'Wedding Sangeet & Events',
      sectionId: 'wedding-services',
      icon: Heart,
      badge: 'Bespoke',
      badgeColor: 'bg-rose-100 text-rose-700',
    },
    {
      label: 'Video Reels & Recitals',
      sectionId: 'videos',
      icon: Film,
      badge: 'HD Video',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      label: 'FAQs & Admissions Desk',
      sectionId: 'faqs',
      icon: HelpCircle,
      badge: 'Direct Help',
      badgeColor: 'bg-[#EFEDE7] text-[#5A5854]',
    },
  ];

  const currentAddress =
    generalInfo.address ||
    generalInfo.fullAddress ||
    'Hanshoura Road, Ahmedabad, Gujarat';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Dark Overlay Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm cursor-pointer opacity-0"
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <aside
        ref={drawerRef}
        className="relative w-full max-w-[340px] sm:max-w-md bg-[#1E1D1B] text-[#F7F5F0] h-full shadow-2xl flex flex-col z-10 overflow-hidden border-l border-white/10"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3D6338] text-white flex items-center justify-center font-display font-black text-lg border border-[#7A9E74]/40 shadow-inner">
              M
            </div>
            <div>
              <div className="font-display font-bold text-base tracking-tight text-white leading-none">
                {generalInfo.studioName || 'Merrick Dance Studio'}
              </div>
              <div className="text-[10px] tracking-widest uppercase font-medium text-[#7A9E74] mt-0.5">
                {generalInfo.tagline || 'Dance & Entertainment Studio'}
              </div>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-[#D8E8D4] hover:text-white transition-all cursor-pointer border border-white/5 active:scale-95"
            aria-label="Close Navigation Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Call-to-Actions in Drawer */}
        <div className="p-4 sm:p-5 bg-black/20 border-b border-white/5 space-y-2.5">
          <button
            onClick={() => {
              handleClose();
              onOpenTrialModal();
            }}
            className="w-full py-3.5 px-4 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-between group cursor-pointer border border-[#7A9E74]/40"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D8E8D4]" />
              <span>Book Free Trial Class</span>
            </span>
            <span className="text-[10px] bg-[#D8E8D4] text-[#3D6338] px-2 py-0.5 rounded-full font-extrabold uppercase">
              100% Free
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                handleClose();
                onOpenQuiz();
              }}
              className="py-2.5 px-3 bg-white/10 hover:bg-white/15 text-[#D8E8D4] hover:text-white rounded-xl text-[11px] font-semibold transition border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B5CAB0]" />
              <span>Find Match Quiz</span>
            </button>

            <button
              onClick={() => {
                handleClose();
                onOpenAdvisor();
              }}
              className="py-2.5 px-3 bg-white/10 hover:bg-white/15 text-[#D8E8D4] hover:text-white rounded-xl text-[11px] font-semibold transition border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-[#B5CAB0]" />
              <span>Ask AI Advisor</span>
            </button>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div
          ref={itemsContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-1.5 divide-y divide-white/5 scrollbar-thin scrollbar-thumb-white/10"
        >
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#7A9E74] px-3 pb-1">
            Studio Navigation
          </div>

          <div className="space-y-1 pt-1">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.sectionId)}
                  className="gsap-drawer-item w-full py-2.5 px-3 rounded-2xl hover:bg-white/10 text-left transition-all flex items-center justify-between text-xs font-medium text-[#D9D7D0] hover:text-white group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-xl bg-white/5 group-hover:bg-[#3D6338] text-[#B5CAB0] group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-[#5A5854] group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Studio Location & Contact Card */}
          <div className="pt-4 mt-2">
            <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#7A9E74] px-3 mb-2">
              Live Studio Desk
            </div>

            <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 space-y-2.5 text-xs text-[#9E9B92]">
              {/* Dynamic Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7A9E74] flex-shrink-0 mt-0.5" />
                <span className="text-[#D9D7D0] text-[11px] leading-snug">
                  {currentAddress}
                </span>
              </div>

              {/* Direct Phone & WhatsApp */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <a
                  href={`tel:${generalInfo.phone || '+919909843221'}`}
                  className="text-white hover:text-[#B5CAB0] font-semibold text-[11px] transition"
                >
                  {generalInfo.phoneDisplay || '+91 99098 43221'}
                </a>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#7A9E74] flex-shrink-0 mt-0.5" />
                <div className="text-[10px] text-[#D9D7D0]">
                  <div>Mon–Sat: {generalInfo.operatingHoursWeekday || '7:00 AM – 9:30 PM'}</div>
                  <div>Sun: {generalInfo.operatingHoursWeekend || generalInfo.operatingHoursSunday || '8:00 AM – 7:00 PM'}</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <a
                  href={`mailto:${generalInfo.email || 'sonu.shah99098@gmail.com'}`}
                  className="text-[#B5CAB0] hover:underline text-[10px] truncate"
                >
                  {generalInfo.email || 'sonu.shah99098@gmail.com'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer Social Quick Actions */}
        <div className="p-4 border-t border-white/10 bg-black/40 flex items-center justify-between gap-2">
          <a
            href={`https://wa.me/${generalInfo.whatsapp || '919909843221'}?text=Hi%20Sonu%20Shah%20and%20Merrick%20Team%2C%20I%20would%20like%20to%20inquire%20about%20classes`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 px-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-[#25D366]/30"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Chat</span>
          </a>

          <a
            href={`https://instagram.com/${generalInfo.socialLinks?.instagram || 'Sonushah7373'}`}
            target="_blank"
            rel="noreferrer"
            className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-white/10"
            title="Instagram Profile"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>@{generalInfo.socialLinks?.instagram || 'Sonushah7373'}</span>
          </a>
        </div>
      </aside>
    </div>
  );
};
