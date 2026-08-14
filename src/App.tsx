/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DanceMatchQuiz } from './components/DanceMatchQuiz';
import { ClassesSection } from './components/ClassesSection';
import { ClassDetailModal } from './components/ClassDetailModal';
import { ScheduleSection } from './components/ScheduleSection';
import { PricingCalculator } from './components/PricingCalculator';
import { InstructorsSection } from './components/InstructorsSection';
import { StudioTourSection } from './components/StudioTourSection';
import { WorkshopsSection } from './components/WorkshopsSection';
import { SpecialServicesSection } from './components/SpecialServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { TrialBookingModal } from './components/TrialBookingModal';
import { PassCardModal } from './components/PassCardModal';
import { StudioAdvisorModal } from './components/StudioAdvisorModal';
import { Footer } from './components/Footer';
import { DanceClass, ScheduleSlot, TrialBooking, Workshop } from './types';
import { MessageCircle, Sparkles, Calendar } from 'lucide-react';

export default function App() {
  // Modal states
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  // Selected entities
  const [selectedClassDetail, setSelectedClassDetail] = useState<DanceClass | null>(null);
  const [preselectedClassForTrial, setPreselectedClassForTrial] = useState<string | undefined>(undefined);
  const [preselectedSlotForTrial, setPreselectedSlotForTrial] = useState<{
    day: string;
    time: string;
    className: string;
  } | undefined>(undefined);
  const [confirmedBooking, setConfirmedBooking] = useState<TrialBooking | null>(null);

  // Handlers
  const handleOpenTrialModal = (preferredClass?: string) => {
    setPreselectedClassForTrial(preferredClass);
    setPreselectedSlotForTrial(undefined);
    setIsTrialModalOpen(true);
  };

  const handleReserveSlot = (slot: ScheduleSlot) => {
    setPreselectedClassForTrial(slot.className);
    setPreselectedSlotForTrial({
      day: slot.day,
      time: slot.time,
      className: slot.className,
    });
    setIsTrialModalOpen(true);
  };

  const handleRSVPWorkshop = (workshop: Workshop) => {
    setPreselectedClassForTrial(`Workshop: ${workshop.title}`);
    setPreselectedSlotForTrial({
      day: workshop.date,
      time: workshop.time,
      className: workshop.title,
    });
    setIsTrialModalOpen(true);
  };

  const handleCustomQuote = (serviceName: string) => {
    setPreselectedClassForTrial(`Custom Service: ${serviceName}`);
    setIsTrialModalOpen(true);
  };

  const handleBookingSuccess = (booking: TrialBooking) => {
    setIsTrialModalOpen(false);
    setConfirmedBooking(booking);
    setIsPassModalOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#1E1D1B] font-sans antialiased selection:bg-[#B5CAB0] selection:text-[#1E1D1B]">
      {/* Fixed Navigation */}
      <Navbar
        onOpenTrialModal={handleOpenTrialModal}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="flex-grow">
        {/* 1. Hero Section with Interactive Beat Sampler & Quick Pass Booker */}
        <Hero
          onOpenTrialModal={() => handleOpenTrialModal()}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onScrollToSection={handleScrollToSection}
        />

        {/* 2. Classes Showcase with Sound Previews & Syllabus */}
        <ClassesSection
          onSelectClassDetail={(danceClass) => setSelectedClassDetail(danceClass)}
          onBookTrial={(className) => handleOpenTrialModal(className)}
        />

        {/* 3. Live Weekly Schedule & Timetable Explorer */}
        <ScheduleSection onReserveSlot={handleReserveSlot} />

        {/* 4. Studio Tour & Sprung Flooring Safety Tech */}
        <StudioTourSection />

        {/* 5. Master Instructors & Faculty Biographies (Nitin Oad, Shubham Rajput, Sonu Shah) */}
        <InstructorsSection
          onBookWithInstructor={(instructorName) =>
            handleOpenTrialModal(`Session with ${instructorName}`)
          }
        />

        {/* 6. Interactive Transparent Fee & Membership Calculator */}
        <PricingCalculator onOpenTrialModal={() => handleOpenTrialModal()} />

        {/* 7. Upcoming Weekend Guest Workshops & Masterclasses */}
        <WorkshopsSection onRSVPWorkshop={handleRSVPWorkshop} />

        {/* 8. Bespoke Wedding Sangeet & Corporate Entertainment */}
        <SpecialServicesSection onRequestCustomQuote={handleCustomQuote} />

        {/* 9. Verified Student & Parent Reviews */}
        <TestimonialsSection />

        {/* 10. Frequently Asked Questions & Quick Message Desk */}
        <FaqSection
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
          onOpenTrialModal={() => handleOpenTrialModal()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenTrialModal={() => handleOpenTrialModal()}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Floating Bottom Quick Actions (Mobile/Desktop) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
        <button
          onClick={() => setIsAdvisorOpen(true)}
          className="p-3.5 bg-white text-[#3D6338] border border-[#B5CAB0] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 text-xs font-bold cursor-pointer"
          title="Ask Studio Advisor AI"
        >
          <Sparkles className="w-4 h-4 text-[#7A9E74]" />
          <span className="hidden sm:inline">Ask Advisor</span>
        </button>

        <a
          href="https://wa.me/919909843221?text=Hi%20Sonu%20Shah%20and%20Merrick%20Dance%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20a%20free%20trial%20class"
          target="_blank"
          rel="noreferrer"
          className="p-3.5 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center cursor-pointer"
          aria-label="WhatsApp Merrick Dance Studio"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        <button
          onClick={() => handleOpenTrialModal()}
          className="px-5 py-3.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-bold tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#D8E8D4]" />
          <span>Book Free Trial</span>
        </button>
      </div>

      {/* MODALS */}
      {/* 30-Second Style Matcher Quiz */}
      <DanceMatchQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onBookTrialWithClass={(className) => handleOpenTrialModal(className)}
      />

      {/* Class Syllabus Detail Dialog */}
      <ClassDetailModal
        danceClass={selectedClassDetail}
        onClose={() => setSelectedClassDetail(null)}
        onBookTrial={(className) => handleOpenTrialModal(className)}
      />

      {/* Free Trial Booking Wizard Modal */}
      <TrialBookingModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        preselectedClass={preselectedClassForTrial}
        preselectedSlot={preselectedSlotForTrial}
        onSuccess={handleBookingSuccess}
      />

      {/* VIP Studio Pass Card Modal */}
      <PassCardModal
        booking={confirmedBooking}
        onClose={() => setIsPassModalOpen(false)}
      />

      {/* AI Studio Advisor Chat Modal */}
      <StudioAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        onBookTrial={(className) => handleOpenTrialModal(className)}
      />
    </div>
  );
}
