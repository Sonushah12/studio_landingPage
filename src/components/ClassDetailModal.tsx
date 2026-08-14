import React from 'react';
import { X, Check, Calendar, Clock, Users, Flame, Award, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { DanceClass } from '../types';
import { SafeImage } from './SafeImage';

interface ClassDetailModalProps {
  danceClass: DanceClass | null;
  onClose: () => void;
  onBookTrial: (className: string) => void;
}

export const ClassDetailModal: React.FC<ClassDetailModalProps> = ({
  danceClass,
  onClose,
  onBookTrial,
}) => {
  if (!danceClass) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#F7F5F0] rounded-3xl max-w-2xl w-full border border-[#D9D7D0] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Modal Photo Header */}
        <div className="relative aspect-[21/9] bg-[#1E1D1B] overflow-hidden">
          <SafeImage
            src={danceClass.imageUrl}
            alt={danceClass.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition shadow-md cursor-pointer border border-white/20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-4 left-6 right-6 z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-[#3D6338] text-white text-[10px] font-bold uppercase rounded-full tracking-wider">
                {danceClass.categoryLabel}
              </span>
              {danceClass.badge && (
                <span className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-[#D8E8D4] text-[10px] font-bold uppercase rounded-full tracking-wider border border-white/20">
                  {danceClass.badge}
                </span>
              )}
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight drop-shadow-sm">
              {danceClass.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#D8E8D4] mt-0.5 italic">
              "{danceClass.tagline}"
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs uppercase font-bold text-[#3D6338] tracking-widest mb-2">
              Comprehensive Course Overview
            </h4>
            <p className="text-sm text-[#2C2B29] leading-relaxed">
              {danceClass.fullDescription}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-white rounded-2xl border border-[#D9D7D0] text-center shadow-2xs">
              <span className="text-[10px] text-[#9E9B92] uppercase font-bold block">Level</span>
              <span className="text-xs font-bold text-[#1E1D1B] mt-0.5 block">{danceClass.level}</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-[#D9D7D0] text-center shadow-2xs">
              <span className="text-[10px] text-[#9E9B92] uppercase font-bold block">Age Group</span>
              <span className="text-xs font-bold text-[#1E1D1B] mt-0.5 block">{danceClass.ageGroup}</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-[#D9D7D0] text-center shadow-2xs">
              <span className="text-[10px] text-[#9E9B92] uppercase font-bold block">Calorie Burn</span>
              <span className="text-xs font-bold text-[#3D6338] mt-0.5 block">{danceClass.caloriesBurn}</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-[#D9D7D0] text-center shadow-2xs">
              <span className="text-[10px] text-[#9E9B92] uppercase font-bold block">Lead Faculty</span>
              <span className="text-xs font-bold text-[#1E1D1B] mt-0.5 block truncate">{danceClass.instructorName}</span>
            </div>
          </div>

          {/* Curriculum Highlights */}
          <div className="bg-white p-5 rounded-2xl border border-[#D9D7D0] shadow-2xs">
            <h4 className="text-xs uppercase font-bold text-[#1E1D1B] tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3D6338]" />
              <span>What You Will Master in this Program</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#2C2B29]">
              {danceClass.curriculumHighlights.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#3D6338] flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule & Batch Timings */}
          <div className="p-4 rounded-2xl bg-[#EFEDE7] border border-[#D9D7D0] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold uppercase text-[#5A5854]">Weekly Batch Schedule on Hanshoura Road</div>
              <div className="text-sm font-bold text-[#1E1D1B] mt-0.5">
                {danceClass.scheduleDays} · {danceClass.timing}
              </div>
            </div>
            <div className="text-xs text-[#3D6338] font-bold bg-[#D8E8D4] px-3.5 py-1.5 rounded-full border border-[#B5CAB0]">
              Free Trial Included
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#EFEDE7] border-t border-[#D9D7D0] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-[#5A5854] hover:text-[#1E1D1B] transition cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBookTrial(danceClass.name);
            }}
            className="px-6 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-full text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Book Free Trial for This Class</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
