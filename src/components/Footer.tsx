import React from 'react';
import { Phone, Mail, MapPin, Clock, Heart, Sparkles, MessageCircle, ArrowUp } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

interface FooterProps {
  onOpenTrialModal: () => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTrialModal, onOpenQuiz }) => {
  const { data } = useStudioData();
  const { generalInfo } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E1D1B] text-[#D9D7D0] pt-16 pb-12 border-t border-[#2C2B29]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Studio Highlights & Newsletter/Trial Strip */}
        <div className="pb-12 border-b border-[#2C2B29] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B5CAB0]">
              Step into Your Dance Sanctuary
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F7F5F0]">
              Ready to feel the beat? Experience your 1st Free Trial Class.
            </h3>
            <p className="text-xs text-[#9E9B92]">
              Join over {generalInfo.stats.studentsCount} enthusiastic dancers in Ahmedabad. Open to beginners, kids, teens, and adults.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onOpenTrialModal}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#3D6338] hover:bg-[#4E7D47] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition shadow-md cursor-pointer text-center"
            >
              Book Complimentary Pass
            </button>
            <button
              onClick={onOpenQuiz}
              className="w-full sm:w-auto px-5 py-3.5 bg-[#2C2B29] hover:bg-[#383633] text-[#D8E8D4] border border-[#5A5854] rounded-full text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7A9E74]" />
              <span>30-Sec Matcher Quiz</span>
            </button>
          </div>
        </div>

        {/* 4 Column Main Footer Directory */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-xs">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3D6338] text-white flex items-center justify-center font-display font-bold text-lg">
                {generalInfo.studioName.charAt(0)}
              </div>
              <div>
                <div className="font-display font-bold text-xl text-white tracking-tight leading-none">
                  {generalInfo.studioName}
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#7A9E74] font-medium mt-0.5">
                  {generalInfo.tagline}
                </div>
              </div>
            </div>

            <p className="text-[#9E9B92] leading-relaxed pr-4">
              {generalInfo.city || 'Ahmedabad'}’s premier dance institution dedicated to creative excellence, authentic technique, and passionate self-expression. Directed by Sonu Shah at {generalInfo.address || generalInfo.fullAddress || 'Hanshoura Road, Ahmedabad'}.
            </p>

            {/* Social Media Links with Sonushah7373 */}
            <div className="pt-2 space-y-2">
              <div className="text-[11px] font-bold uppercase text-[#B5CAB0] tracking-wider">
                Connect on Social Media:
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Instagram */}
                <a
                  href={`https://instagram.com/${generalInfo.socialLinks?.instagram || 'Sonushah7373'}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#2C2B29] hover:bg-[#3D6338] text-[#F7F5F0] rounded-full border border-[#5A5854] transition flex items-center gap-1.5 text-xs font-medium"
                >
                  <span>📸 Instagram:</span>
                  <strong className="text-[#D8E8D4]">@{generalInfo.socialLinks?.instagram || 'Sonushah7373'}</strong>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${generalInfo.whatsapp || '919909843221'}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded-full border border-[#25D366]/40 transition flex items-center gap-1.5 text-xs font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Dance Disciplines */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-[#F7F5F0] uppercase tracking-wider">
              Dance Disciplines
            </h4>
            <ul className="space-y-2 text-[#9E9B92]">
              <li>
                <button
                  onClick={() => scrollToSection('classes')}
                  className="hover:text-[#D8E8D4] transition cursor-pointer text-left"
                >
                  Bollywood Commercial &amp; Fusion
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('classes')}
                  className="hover:text-[#D8E8D4] transition cursor-pointer text-left"
                >
                  Urban Hip-Hop, Popping &amp; Breaking
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('classes')}
                  className="hover:text-[#D8E8D4] transition cursor-pointer text-left"
                >
                  Salsa Sensual &amp; Bachata Partnering
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('classes')}
                  className="hover:text-[#D8E8D4] transition cursor-pointer text-left"
                >
                  Contemporary &amp; Lyrical Flow
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('classes')}
                  className="hover:text-[#D8E8D4] transition cursor-pointer text-left"
                >
                  Little Stars — Kids Movement (3–8 yrs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('wedding-services')}
                  className="hover:text-[#D8E8D4] transition cursor-pointer text-left"
                >
                  Wedding Sangeet &amp; Event Choreography
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Master Choreographers & Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-[#F7F5F0] uppercase tracking-wider">
              Choreographers
            </h4>
            <ul className="space-y-2 text-[#9E9B92]">
              <li>
                <button
                  onClick={() => scrollToSection('instructors')}
                  className="hover:text-[#D8E8D4] transition cursor-pointer text-left"
                >
                  Nitin Oad (Urban &amp; Contemporary)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('instructors')}
                  className="hover:text-[#D8E8D4] transition cursor-pointer text-left"
                >
                  Shubham Rajput (Latin, Bollywood &amp; Kids)
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => scrollToSection('schedule')}
                  className="text-[#7A9E74] hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>View Weekly Timetable &rarr;</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Contact & Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-[#F7F5F0] uppercase tracking-wider">
              Studio Location &amp; Desk
            </h4>
            <div className="space-y-2.5 text-[#9E9B92]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7A9E74] flex-shrink-0 mt-0.5" />
                <span>
                  {generalInfo.address || generalInfo.fullAddress || 'Hanshoura Road, Ahmedabad'}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <a href={`tel:${generalInfo.phone || '+919909843221'}`} className="hover:text-white transition font-semibold text-[#D8E8D4]">
                  {generalInfo.phoneDisplay || '+91 99098 43221'} (Call &amp; WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <a href={`mailto:${generalInfo.email || 'sonu.shah99098@gmail.com'}`} className="hover:text-white transition text-[#D8E8D4]">
                  {generalInfo.email || 'sonu.shah99098@gmail.com'}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-[11px]">
                <Clock className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <span>Mon–Sat: {generalInfo.operatingHoursWeekday || '7:00 AM – 9:30 PM'} | Sun: {generalInfo.operatingHoursWeekend || generalInfo.operatingHoursSunday || '8:00 AM – 7:00 PM'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 mt-8 border-t border-[#2C2B29] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E9B92]">
          <div>
            &copy; {new Date().getFullYear()} {generalInfo.studioName || 'Merrick Dance Studio'}. All rights reserved. Directed by Sonu Shah.
          </div>

          <div className="flex items-center gap-4">
            <span>{(generalInfo.address || generalInfo.fullAddress || 'Hanshoura Road, Ahmedabad').split(',')[0]}</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="text-[#D8E8D4] hover:text-white flex items-center gap-1 transition cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
