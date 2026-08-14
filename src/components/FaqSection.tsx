import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, MessageCircle, Phone, Mail, Search, Send, Check, Copy, ExternalLink } from 'lucide-react';
import { FREQUENT_FAQS } from '../data/studioData';

interface FaqSectionProps {
  onOpenAdvisor: () => void;
  onOpenTrialModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenAdvisor, onOpenTrialModal }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FREQUENT_FAQS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Quick inquiry form state
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickClassInterest, setQuickClassInterest] = useState('Bollywood Commercial & Fusion');
  const [quickMessage, setQuickMessage] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const categories = ['all', 'Trial & Enrollment', 'Skill Levels', 'Fees & Packages', 'Class Preparation', 'Attendance & Makeups', 'Performances & Recitals', 'Specialized Services'];

  const filteredFaqs = FREQUENT_FAQS.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  // Generate formatted inquiry text for Gmail
  const getFormattedInquiryText = () => {
    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
    });

    return `STUDIO ADMISSION & TRIAL INQUIRY
========================================
Date: ${timestamp}
Studio: Merrick Dance & Entertainment Studio

STUDENT DETAILS:
----------------------------------------
• Full Name: ${quickName}
• Contact / WhatsApp: ${quickPhone}
• Email: ${quickEmail || 'Not specified'}
• Preferred Discipline: ${quickClassInterest}

INQUIRY / MESSAGE:
----------------------------------------
${quickMessage || 'I would like to inquire about batch availability, fees, and schedule my complimentary free trial class.'}

----------------------------------------
Sent via Merrick Dance & Entertainment Studio Online Desk
Recipient: sonu.shah99098@gmail.com | WhatsApp: +91 99098 43221
========================================`;
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim() || !quickPhone.trim()) return;

    const formattedBody = getFormattedInquiryText();
    const subject = encodeURIComponent(`New Studio Inquiry: ${quickName} - ${quickClassInterest}`);
    const encodedBody = encodeURIComponent(formattedBody);

    // Direct mail link to sonu.shah99098@gmail.com
    const mailtoUrl = `mailto:sonu.shah99098@gmail.com?subject=${subject}&body=${encodedBody}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sonu.shah99098@gmail.com&su=${subject}&body=${encodedBody}`;

    setQuickSubmitted(true);

    // Try opening mail client
    window.open(gmailWebUrl, '_blank');
  };

  const handleCopyFormatted = () => {
    const text = getFormattedInquiryText();
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  const handleSendToWhatsApp = () => {
    const formatted = encodeURIComponent(
      `*New Studio Inquiry - Merrick Dance Studio*\n` +
      `👤 *Name:* ${quickName}\n` +
      `📞 *Phone:* ${quickPhone}\n` +
      `💃 *Class Interest:* ${quickClassInterest}\n` +
      `✉️ *Email:* ${quickEmail || 'N/A'}\n` +
      `💬 *Message:* ${quickMessage || 'Please share batch availability and free trial schedule.'}`
    );
    window.open(`https://wa.me/919909843221?text=${formatted}`, '_blank');
  };

  return (
    <section id="faq" className="py-20 bg-[#F7F5F0] border-t border-[#D9D7D0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E8D4] text-[#3D6338] text-xs font-bold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answers &amp; Guidance</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
            Frequently Asked Questions &amp; Desk
          </h2>
          <p className="text-[#5A5854] text-sm mt-3">
            Everything you need to know about batch sizes, attire, trial policies, and direct admissions contact.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="w-4 h-4 text-[#9E9B92] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., dress code, fee, trials, age)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D9D7D0] focus:border-[#3D6338] rounded-full text-xs text-[#1E1D1B] outline-none shadow-sm"
            />
          </div>
        </div>

        {/* 2-Column Layout: Accordion on Left, Quick Message on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-[#D9D7D0] overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F7F5F0] transition"
                    >
                      <span className="font-display font-semibold text-base sm:text-lg text-[#1E1D1B]">
                        {faq.question}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full bg-[#EFEDE7] flex items-center justify-center flex-shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 bg-[#3D6338] text-white' : 'text-[#5A5854]'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#5A5854] leading-relaxed border-t border-[#EFEDE7] pt-3 animate-in fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center bg-white rounded-2xl border border-[#D9D7D0]">
                <p className="text-sm text-[#5A5854]">No questions matched your search query.</p>
                <button
                  onClick={onOpenAdvisor}
                  className="mt-3 text-xs font-bold text-[#3D6338] underline cursor-pointer"
                >
                  Ask our Studio Advisor AI instead &rarr;
                </button>
              </div>
            )}

            {/* AI Advisor helper trigger */}
            <div className="p-4 rounded-2xl bg-[#D8E8D4]/50 border border-[#B5CAB0] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#3D6338] text-white flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E1D1B]">Have a specific personal question?</div>
                  <div className="text-[11px] text-[#5A5854]">Get instant answers from our Studio Advisor.</div>
                </div>
              </div>

              <button
                onClick={onOpenAdvisor}
                className="px-4 py-2 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition cursor-pointer whitespace-nowrap shadow-sm"
              >
                Ask Advisor
              </button>
            </div>
          </div>

          {/* Right Column: Direct Inquiry & Studio Desk Contact */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#D9D7D0] shadow-md space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-[#3D6338] tracking-wider block">
                  Admissions &amp; Trial Desk
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#D8E8D4] text-[#3D6338] rounded-full font-bold">
                  Gmail &amp; WhatsApp Synced
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#1E1D1B] mt-0.5">
                Send a Direct Studio Inquiry
              </h3>
              <p className="text-xs text-[#5A5854] mt-1">
                Inquiries are automatically formatted and sent directly to <strong>sonu.shah99098@gmail.com</strong> and WhatsApp <strong>+91 99098 43221</strong>.
              </p>
            </div>

            {quickSubmitted ? (
              <div className="p-6 bg-[#D8E8D4]/60 rounded-2xl border border-[#B5CAB0] text-center space-y-4 animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-[#3D6338] text-white flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-[#1E1D1B]">
                    Inquiry Formatted &amp; Dispatched!
                  </h4>
                  <p className="text-xs text-[#5A5854] mt-1">
                    Your inquiry has been formatted for <strong>sonu.shah99098@gmail.com</strong>.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl text-left border border-[#D9D7D0] text-[11px] text-[#2C2B29] font-mono whitespace-pre-line max-h-36 overflow-y-auto">
                  {getFormattedInquiryText()}
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="w-full py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp (+91 99098 43221)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyFormatted}
                    className="w-full py-2 bg-white hover:bg-[#F7F5F0] text-[#3D6338] border border-[#B5CAB0] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-[#3D6338]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText ? 'Copied to Clipboard!' : 'Copy Formatted Text'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setQuickSubmitted(false);
                      setQuickName('');
                      setQuickPhone('');
                      setQuickEmail('');
                      setQuickMessage('');
                    }}
                    className="text-xs text-[#5A5854] hover:text-[#1E1D1B] pt-1 underline cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    placeholder="e.g. Riya Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F0] border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      placeholder="+91 99098 43221"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F0] border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      Your Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={quickEmail}
                      onChange={(e) => setQuickEmail(e.target.value)}
                      placeholder="riya@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F0] border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Dance Discipline of Interest
                  </label>
                  <select
                    value={quickClassInterest}
                    onChange={(e) => setQuickClassInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F0] border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none cursor-pointer"
                  >
                    <option value="Bollywood Commercial & Fusion">Bollywood Commercial &amp; Fusion</option>
                    <option value="Urban Hip-Hop, Popping & Breaking">Urban Hip-Hop, Popping &amp; Breaking</option>
                    <option value="Salsa Sensual & Bachata Partnering">Salsa Sensual &amp; Bachata Partnering</option>
                    <option value="Contemporary & Lyrical Flow">Contemporary &amp; Lyrical Flow</option>
                    <option value="Little Stars — Kids Movement (Age 3-8)">Little Stars — Kids Movement (Age 3-8)</option>
                    <option value="Wedding Sangeet Choreography Package">Wedding Sangeet Choreography Package</option>
                    <option value="Private 1-on-1 Master Coaching">Private 1-on-1 Master Coaching</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Specific Questions / Batch Timing Preference
                  </label>
                  <textarea
                    rows={3}
                    value={quickMessage}
                    onChange={(e) => setQuickMessage(e.target.value)}
                    placeholder="Tell us about your schedule preference, dance goals, or questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F5F0] border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none resize-none"
                  />
                </div>

                <div className="pt-1 flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send to sonu.shah99098@gmail.com</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-semibold transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Send directly to WhatsApp desk"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </form>
            )}

            {/* Quick Contact Links */}
            <div className="pt-4 border-t border-[#EFEDE7] space-y-2 text-xs text-[#2C2B29]">
              <a
                href="https://wa.me/919909843221?text=Hi%20Sonu%20Shah%20and%20Merrick%20Team%2C%20I%20would%20like%20to%20inquire%20about%20classes"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#EFEDE7] transition"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <div>
                  <div className="font-semibold">WhatsApp Desk (+91 99098 43221)</div>
                  <div className="text-[10px] text-[#5A5854]">Direct chat for instant trial slot confirmation</div>
                </div>
              </a>

              <a
                href="mailto:sonu.shah99098@gmail.com?subject=Studio%20Inquiry%20-%20Merrick%20Dance%20Studio"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#EFEDE7] transition"
              >
                <Mail className="w-4 h-4 text-[#3D6338]" />
                <div>
                  <div className="font-semibold">Email: sonu.shah99098@gmail.com</div>
                  <div className="text-[10px] text-[#5A5854]">Official admissions &amp; partnership inquiries</div>
                </div>
              </a>

              <a
                href="tel:+919909843221"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#EFEDE7] transition"
              >
                <Phone className="w-4 h-4 text-[#3D6338]" />
                <div>
                  <div className="font-semibold">Call Studio Desk: +91 99098 43221</div>
                  <div className="text-[10px] text-[#5A5854]">Mon – Sat 7 AM – 9 PM, Sun 8 AM – 6 PM</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
