import React from 'react';
import { Phone, Mail, MapPin, Clock, Heart, Sparkles, MessageCircle, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenTrialModal: () => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTrialModal, onOpenQuiz }) => {
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
              Join over 1,200 enthusiastic dancers in Ahmedabad. Open to beginners, kids, teens, and adults.
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
                M
              </div>
              <div>
                <div className="font-display font-bold text-xl text-white tracking-tight leading-none">
                  MERRICK
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#7A9E74] font-medium mt-0.5">
                  Dance &amp; Entertainment Studio
                </div>
              </div>
            </div>

            <p className="text-[#9E9B92] leading-relaxed pr-4">
              Ahmedabad’s premier dance institution dedicated to creative excellence, authentic technique, and passionate self-expression. Led by renowned choreographers Sonu Shah, Nitin Oad, and Shubham Rajput.
            </p>

            {/* Social Media Links with Sonushah7373 */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase text-[#B5CAB0] tracking-wider mb-2">
                Connect on Social Media:
              </div>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href="https://instagram.com/Sonushah7373"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#2C2B29] hover:bg-[#3D6338] text-[#F7F5F0] rounded-full border border-[#5A5854] transition flex items-center gap-1.5 text-xs font-medium"
                >
                  <span>📸 Instagram:</span>
                  <strong className="text-[#D8E8D4]">@Sonushah7373</strong>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com/Sonushah7373"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-[#2C2B29] hover:bg-[#3D6338] text-[#F7F5F0] rounded-full border border-[#5A5854] transition"
                  title="Facebook: Sonushah7373"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com/Sonushah7373"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-[#2C2B29] hover:bg-[#3D6338] text-[#F7F5F0] rounded-full border border-[#5A5854] transition"
                  title="Twitter / X: Sonushah7373"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
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

          {/* Col 3: Master Tutors & Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-[#F7F5F0] uppercase tracking-wider">
              Master Tutors
            </h4>
            <ul className="space-y-2 text-[#9E9B92]">
              <li>
                <button
                  onClick={() => scrollToSection('instructors')}
                  className="hover:text-[#D8E8D4] transition cursor-pointer text-left"
                >
                  Sonu Shah (Lead Choreographer)
                </button>
              </li>
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
                  Shubham Rajput (Latin &amp; Kids)
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
                  3rd Floor, Merrick Arts Complex, Satellite Road (Near SG Highway &amp; Sindhu Bhavan), Ahmedabad, Gujarat 380015
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <a href="tel:+919909843221" className="hover:text-white transition font-semibold text-[#D8E8D4]">
                  +91 99098 43221 (Call &amp; WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <a href="mailto:sonu.shah99098@gmail.com" className="hover:text-white transition text-[#D8E8D4]">
                  sonu.shah99098@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-[11px]">
                <Clock className="w-4 h-4 text-[#7A9E74] flex-shrink-0" />
                <span>Mon–Sat: 7 AM – 9 PM | Sun: 8 AM – 6 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 mt-8 border-t border-[#2C2B29] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E9B92]">
          <div>
            &copy; {new Date().getFullYear()} Merrick Dance &amp; Entertainment Studio. All rights reserved. Directed by Sonu Shah.
          </div>

          <div className="flex items-center gap-4">
            <span>Satellite, Ahmedabad</span>
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
