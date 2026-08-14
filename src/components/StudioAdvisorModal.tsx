import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight, MessageCircle } from 'lucide-react';

interface StudioAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTrial: (className?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: { label: string; action: string }[];
}

export const StudioAdvisorModal: React.FC<StudioAdvisorModalProps> = ({
  isOpen,
  onClose,
  onBookTrial,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Namaste! I am your Merrick Studio Advisor. How can I help you take your next step into dance today?',
      options: [
        { label: '🌟 How do I book a free trial?', action: 'trial' },
        { label: '💃 Beginner adult classes?', action: 'beginner' },
        { label: '👶 Little Stars for Kids (3–8 yrs)?', action: 'kids' },
        { label: '🔥 Urban Hip-Hop & Street?', action: 'urban' },
        { label: '💍 Wedding Sangeet Choreography?', action: 'sangeet' },
        { label: '💰 Fee packages & discounts?', action: 'pricing' },
      ],
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleOptionClick = (action: string, label: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: label,
    };

    let botResponse = '';
    let nextOptions: { label: string; action: string }[] = [];

    switch (action) {
      case 'trial':
        botResponse =
          'Every new dancer is entitled to 1 complimentary Free Trial Class with zero commitment! You can attend any active batch, meet our faculty (Nitin Oad or Shubham Rajput), and experience our shock-absorbing sprung floors on Hanshoura Road.';
        nextOptions = [{ label: 'Book My Free Trial Now', action: 'trigger_booking' }];
        break;

      case 'beginner':
        botResponse =
          'Over 65% of our adult students join with zero prior dance background. We recommend our "Bollywood Commercial & Fusion" (Mon/Wed/Fri 7:00 PM) or "Salsa & Bachata Partnering" (Weekends). Instructors break every move down step-by-step with zero judgment!';
        nextOptions = [
          { label: 'Book Bollywood Trial', action: 'trigger_bollywood' },
          { label: 'Book Salsa Trial', action: 'trigger_salsa' },
        ];
        break;

      case 'kids':
        botResponse =
          'Our "Little Stars" program (ages 3–8) led by Shubham Rajput focuses on rhythm games, body coordination, confidence building, and joyful stage routines. Batches run Tue, Thu & Sat afternoons at 4:00 PM in Studio Beta.';
        nextOptions = [{ label: 'Book Free Trial for Child', action: 'trigger_kids' }];
        break;

      case 'urban':
        botResponse =
          'Our Urban Hip-Hop, Popping & Breaking program is taught by Nitin Oad. It covers bounce, popping mechanics, footwork, musicality, and weekly cypher battles. Batches run Mon/Thu/Sat.';
        nextOptions = [{ label: 'Book Hip-Hop Trial', action: 'trigger_urban' }];
        break;

      case 'sangeet':
        botResponse =
          'Our senior choreography team provides end-to-end Wedding Sangeet choreography: Bride & Groom first dance, parents retro medleys, family flashmobs, custom studio song mixing, and take-home video practice guides. Rehearsals available at our studio on Hanshoura Road or your residence in Ahmedabad.';
        nextOptions = [{ label: 'Chat on WhatsApp for Sangeet', action: 'whatsapp_sangeet' }];
        break;

      case 'pricing':
        botResponse =
          'Monthly plans start from ₹2,200/mo. Quarterly packages save 15%, and Annual enrollments save 25% with complimentary masterclasses and costume recital inclusion. All plans include 2 flexible make-up classes/month.';
        nextOptions = [{ label: 'Open Fee Calculator', action: 'trigger_pricing_calc' }];
        break;

      case 'trigger_booking':
      case 'trigger_bollywood':
      case 'trigger_salsa':
      case 'trigger_kids':
      case 'trigger_urban':
        onClose();
        onBookTrial(
          action === 'trigger_bollywood'
            ? 'Bollywood Commercial & Fusion'
            : action === 'trigger_salsa'
            ? 'Salsa Sensual & Bachata Partnering'
            : action === 'trigger_kids'
            ? 'Little Stars — Kids Movement & Rhythm'
            : action === 'trigger_urban'
            ? 'Urban Hip-Hop, Popping & Breaking'
            : undefined
        );
        return;

      case 'whatsapp_sangeet':
        window.open('https://wa.me/919909843221?text=Hi%20Merrick%20Dance%20Team%2C%20I%20would%20like%20to%20inquire%20about%20Wedding%20Sangeet%20Choreography', '_blank');
        return;

      case 'trigger_pricing_calc':
        onClose();
        const pricingEl = document.getElementById('pricing');
        if (pricingEl) pricingEl.scrollIntoView({ behavior: 'smooth' });
        return;

      default:
        botResponse =
          'Thank you for your question! You can visit us on Hanshoura Road, Ahmedabad, or our front desk coordinators are happy to assist you directly at +91 99098 43221 or via email at sonu.shah99098@gmail.com.';
    }

    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        options: nextOptions.length > 0 ? nextOptions : undefined,
      },
    ]);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setInputVal('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
    };

    let reply =
      'Thank you! At Merrick Dance Studio, Nitin Oad and Shubham Rajput welcome dancers of all levels. Our studio is open Monday to Saturday 7 AM – 9 PM and Sunday 8 AM – 6 PM on Hanshoura Road, Ahmedabad. Would you like to reserve a free trial pass?';

    const lower = userText.toLowerCase();
    if (lower.includes('price') || lower.includes('fee') || lower.includes('cost')) {
      reply =
        'Monthly plans start from ₹2,200 for 2 classes/week. Quarterly passes provide a 15% discount, and Annual passes save 25% with full recital costume inclusion. You can test any class for free first!';
    } else if (lower.includes('dress') || lower.includes('wear') || lower.includes('shoe')) {
      reply =
        'For Bollywood/Hip-Hop/Salsa: comfortable athletic wear and clean indoor sneakers. For Contemporary: stretchable tights/leggings or barefoot.';
    } else if (lower.includes('where') || lower.includes('address') || lower.includes('location')) {
      reply =
        'We are conveniently located on Hanshoura Road, Ahmedabad with free dedicated parking on premise.';
    } else if (lower.includes('tutor') || lower.includes('instructor') || lower.includes('teacher') || lower.includes('choreographer')) {
      reply =
        'Our 2 acclaimed master choreographers are Nitin Oad (Urban & Contemporary Specialist) and Shubham Rajput (Latin, Bollywood & Kids Movement Lead).';
    }

    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        options: [{ label: 'Book Free Trial Class', action: 'trigger_booking' }],
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#F7F5F0] rounded-3xl max-w-md w-full border border-[#D9D7D0] shadow-2xl overflow-hidden relative flex flex-col h-[560px]">
        {/* Header */}
        <div className="bg-[#EFEDE7] p-4 border-b border-[#D9D7D0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#3D6338] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#1E1D1B] leading-none">
                Merrick Studio Advisor
              </h3>
              <span className="text-[10px] text-[#7A9E74] font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A9E74] animate-pulse" />
                Live Instant Guidance
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#D9D7D0] text-[#5A5854] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Stream Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#3D6338] text-white rounded-tr-none'
                    : 'bg-white text-[#2C2B29] border border-[#D9D7D0] rounded-tl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>

              {/* Quick Action Options */}
              {msg.options && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {msg.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(opt.action, opt.label)}
                      className="px-2.5 py-1 bg-white hover:bg-[#D8E8D4]/60 text-[#3D6338] text-[11px] font-semibold rounded-full border border-[#B5CAB0] transition shadow-xs cursor-pointer"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input bar */}
        <form onSubmit={handleSendCustom} className="p-3 bg-white border-t border-[#D9D7D0] flex gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a question (e.g. trial, parking, tutors, fee)..."
            className="flex-1 px-3.5 py-2 rounded-full bg-[#F7F5F0] border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none"
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-[#3D6338] hover:bg-[#2F4E2B] text-white flex items-center justify-center transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
