import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DANCE_CLASSES } from '../data/studioData';
import { TrialBooking } from '../types';

interface TrialBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedClass?: string;
  preselectedSlot?: {
    day: string;
    time: string;
    className: string;
  };
  onSuccess: (booking: TrialBooking) => void;
}

export const TrialBookingModal: React.FC<TrialBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedClass,
  preselectedSlot,
  onSuccess,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedClass, setSelectedClass] = useState(
    preselectedSlot?.className || preselectedClass || DANCE_CLASSES[0].name
  );
  const [preferredDay, setPreferredDay] = useState(preselectedSlot?.day || 'Saturday');
  const [preferredTime, setPreferredTime] = useState(preselectedSlot?.time || '11:00 AM – 12:30 PM');
  const [ageGroup, setAgeGroup] = useState('Adult (16+)');
  const [experienceLevel, setExperienceLevel] = useState('Beginner (Zero prior experience)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    const bookingCode = `MDS-${Math.floor(10000 + Math.random() * 90000)}`;

    setTimeout(() => {
      setIsSubmitting(false);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3D6338', '#7A9E74', '#B5CAB0', '#D8E8D4', '#E8EAD0']
        });
      } catch {
        // graceful fallback
      }

      const bookingData: TrialBooking = {
        firstName,
        lastName,
        email: email || 'student@merrickdance.studio',
        phone,
        selectedClass,
        preferredDay,
        preferredTime,
        ageGroup,
        experienceLevel,
        notes,
        bookingCode,
      };

      onSuccess(bookingData);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#F7F5F0] rounded-3xl max-w-xl w-full border border-[#D9D7D0] shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#EFEDE7] p-5 border-b border-[#D9D7D0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#3D6338] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-[#1E1D1B] leading-none">
                Book Your 100% Free Trial Class
              </h3>
              <p className="text-xs text-[#5A5854] mt-0.5">
                No credit card or commitment required · Hanshoura Road, Ahmedabad
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#D9D7D0] text-[#5A5854] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Free Trial Perk Ribbon */}
          <div className="p-3 rounded-2xl bg-[#D8E8D4]/60 border border-[#B5CAB0] flex items-center gap-2.5 text-xs text-[#3D6338]">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>Includes 60-min complete class, faculty consultation &amp; personal progress feedback.</span>
          </div>

          {/* Name fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                First Name *
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Riya"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none shadow-sm"
              />
            </div>
          </div>

          {/* Phone and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                Phone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="riya@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none shadow-sm"
              />
            </div>
          </div>

          {/* Dance Class Selection */}
          <div>
            <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
              Select Dance Discipline *
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none shadow-sm font-medium"
            >
              {DANCE_CLASSES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.level})
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Day & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                Preferred Day
              </label>
              <select
                value={preferredDay}
                onChange={(e) => setPreferredDay(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none shadow-sm font-medium"
              >
                <option value="Saturday">Saturday (Weekend)</option>
                <option value="Sunday">Sunday (Weekend)</option>
                <option value="Monday">Monday Evening</option>
                <option value="Tuesday">Tuesday Evening</option>
                <option value="Wednesday">Wednesday Evening</option>
                <option value="Thursday">Thursday Evening</option>
                <option value="Friday">Friday Evening</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                Preferred Slot
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none shadow-sm font-medium"
              >
                <option value="11:00 AM – 12:30 PM">Morning (11:00 AM – 12:30 PM)</option>
                <option value="05:30 PM – 06:45 PM">Evening (05:30 PM – 06:45 PM)</option>
                <option value="07:00 PM – 08:15 PM">Night Batch (07:00 PM – 08:15 PM)</option>
              </select>
            </div>
          </div>

          {/* Age & Experience Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                Age Category
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none shadow-sm font-medium"
              >
                <option value="Child (3–8 yrs)">Child (3–8 yrs) - Little Stars</option>
                <option value="Junior / Teen (9–15 yrs)">Junior / Teen (9–15 yrs)</option>
                <option value="Adult (16–35 yrs)">Adult (16–35 yrs)</option>
                <option value="Adult (35+ yrs)">Adult (35+ yrs)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                Dance Background
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none shadow-sm font-medium"
              >
                <option value="Complete Beginner">Complete Beginner (Zero experience)</option>
                <option value="Some basic casual dancing">Some basic casual dancing</option>
                <option value="Intermediate dancer">Intermediate dancer</option>
                <option value="Advanced / Certified">Advanced / Certified</option>
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Your VIP Trial Pass...</span>
              ) : (
                <>
                  <span>Generate Free VIP Trial Pass &amp; Reserve Spot</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
