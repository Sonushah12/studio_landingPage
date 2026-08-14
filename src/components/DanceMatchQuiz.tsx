import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Check, Heart, Shield, Trophy, Flame, Music, Zap, X } from 'lucide-react';
import { DANCE_CLASSES } from '../data/studioData';
import { DanceClass } from '../types';

interface DanceMatchQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTrialWithClass: (className: string) => void;
}

export const DanceMatchQuiz: React.FC<DanceMatchQuizProps> = ({
  isOpen,
  onClose,
  onBookTrialWithClass,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedAudience, setSelectedAudience] = useState<string>('');
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedVibe, setSelectedVibe] = useState<string>('');
  const [recommendedClass, setRecommendedClass] = useState<DanceClass | null>(null);

  if (!isOpen) return null;

  const handleAudienceSelect = (val: string) => {
    setSelectedAudience(val);
    setCurrentStep(2);
  };

  const handleGoalSelect = (val: string) => {
    setSelectedGoal(val);
    setCurrentStep(3);
  };

  const handleVibeSelect = (val: string) => {
    setSelectedVibe(val);
    calculateRecommendation(selectedAudience, selectedGoal, val);
    setCurrentStep(4);
  };

  const calculateRecommendation = (audience: string, goal: string, vibe: string) => {
    if (audience === 'kids') {
      setRecommendedClass(DANCE_CLASSES.find((c) => c.id === 'kids-creative-movement') || DANCE_CLASSES[0]);
      return;
    }

    if (audience === 'couple' || vibe === 'partner') {
      setRecommendedClass(DANCE_CLASSES.find((c) => c.id === 'latin-salsa-bachata') || DANCE_CLASSES[2]);
      return;
    }

    if (vibe === 'contemporary' || goal === 'flexibility') {
      setRecommendedClass(DANCE_CLASSES.find((c) => c.id === 'contemporary-flow') || DANCE_CLASSES[3]);
      return;
    }

    if (vibe === 'street' || goal === 'battles') {
      setRecommendedClass(DANCE_CLASSES.find((c) => c.id === 'hiphop-urban') || DANCE_CLASSES[1]);
      return;
    }

    if (goal === 'sangeet' || vibe === 'wedding') {
      setRecommendedClass(DANCE_CLASSES.find((c) => c.id === 'sangeet-wedding-choreography') || DANCE_CLASSES[0]);
      return;
    }

    // Default high-energy crowd pleaser: Bollywood Fusion
    setRecommendedClass(DANCE_CLASSES.find((c) => c.id === 'bollywood-fusion') || DANCE_CLASSES[0]);
  };

  const resetQuiz = () => {
    setCurrentStep(1);
    setSelectedAudience('');
    setSelectedGoal('');
    setSelectedVibe('');
    setRecommendedClass(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#F7F5F0] rounded-3xl max-w-xl w-full border border-[#D9D7D0] shadow-2xl overflow-hidden relative">
        {/* Header bar */}
        <div className="bg-[#EFEDE7] p-5 border-b border-[#D9D7D0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#3D6338] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#1E1D1B] leading-none">
                30-Second Dance Matcher
              </h3>
              <p className="text-xs text-[#5A5854] mt-0.5">
                Find your personalized dance style &amp; ideal batch
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

        {/* Progress Bar */}
        <div className="w-full bg-[#E5E2D9] h-1.5">
          <div
            className="bg-[#3D6338] h-1.5 transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        {/* Quiz Content Body */}
        <div className="p-6">
          {/* STEP 1: Who is dancing? */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="text-center mb-5">
                <span className="text-xs uppercase tracking-widest font-bold text-[#3D6338]">
                  Step 1 of 3
                </span>
                <h4 className="font-display text-2xl font-bold text-[#1E1D1B] mt-1">
                  Who is stepping onto the dance floor?
                </h4>
                <p className="text-xs text-[#5A5854]">
                  We have specially tailored programs for each age and group.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    key: 'adult',
                    title: 'Adult Beginner (16+)',
                    desc: 'Zero pressure, stress relief & fitness',
                    icon: '🌿',
                  },
                  {
                    key: 'kids',
                    title: 'Child / Little Star (3–14)',
                    desc: 'Confidence, rhythm & motor skills',
                    icon: '⭐',
                  },
                  {
                    key: 'couple',
                    title: 'Couple / Partners',
                    desc: 'Latin Salsa Bachata or Wedding Sangeet',
                    icon: '💃🕺',
                  },
                  {
                    key: 'experienced',
                    title: 'Street & Urban Dancer',
                    desc: 'Hip-hop, popping, cyphers & groove',
                    icon: '🔥',
                  },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleAudienceSelect(option.key)}
                    className="p-4 rounded-2xl bg-white border border-[#D9D7D0] hover:border-[#3D6338] hover:bg-[#D8E8D4]/30 text-left transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-sm group"
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="text-sm font-bold text-[#1E1D1B] group-hover:text-[#3D6338]">
                      {option.title}
                    </div>
                    <div className="text-xs text-[#5A5854] mt-0.5">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Main Goal */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="text-center mb-5">
                <span className="text-xs uppercase tracking-widest font-bold text-[#3D6338]">
                  Step 2 of 3
                </span>
                <h4 className="font-display text-2xl font-bold text-[#1E1D1B] mt-1">
                  What is your primary personal goal?
                </h4>
                <p className="text-xs text-[#5A5854]">
                  What would make you happiest after every session?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    key: 'fitness',
                    title: 'High Cardio & Fitness',
                    desc: 'Burn 500+ calories while having pure fun',
                    icon: '🔥',
                  },
                  {
                    key: 'flexibility',
                    title: 'Fluidity & Contemporary Expression',
                    desc: 'Mind-body connection, stretch & flow',
                    icon: '🌊',
                  },
                  {
                    key: 'social',
                    title: 'Social Confidence & Parties',
                    desc: 'Look effortlessly great at events & clubs',
                    icon: '🎉',
                  },
                  {
                    key: 'sangeet',
                    title: 'Wedding Sangeet & Stage Routine',
                    desc: 'Prepare custom couple or family dance',
                    icon: '💍',
                  },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleGoalSelect(option.key)}
                    className="p-4 rounded-2xl bg-white border border-[#D9D7D0] hover:border-[#3D6338] hover:bg-[#D8E8D4]/30 text-left transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-sm group"
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="text-sm font-bold text-[#1E1D1B] group-hover:text-[#3D6338]">
                      {option.title}
                    </div>
                    <div className="text-xs text-[#5A5854] mt-0.5">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Vibe & Music */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="text-center mb-5">
                <span className="text-xs uppercase tracking-widest font-bold text-[#3D6338]">
                  Final Step
                </span>
                <h4 className="font-display text-2xl font-bold text-[#1E1D1B] mt-1">
                  Which music makes your soul want to move?
                </h4>
                <p className="text-xs text-[#5A5854]">
                  Choose the rhythmic vibe that excites you most.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    key: 'bollywood',
                    title: 'Bollywood Commercial & Fusion',
                    desc: 'Cinematic, festive, high-energy vibes',
                    icon: '🎬',
                  },
                  {
                    key: 'street',
                    title: 'Hip-Hop, Bass & Trap',
                    desc: 'Heavy drops, swagger, isolations & pops',
                    icon: '🎧',
                  },
                  {
                    key: 'partner',
                    title: 'Latin Salsa & Sensual Bachata',
                    desc: 'Sensual rhythms, partner spins & frame',
                    icon: '💃',
                  },
                  {
                    key: 'contemporary',
                    title: 'Acoustic, Lyrical & Flow',
                    desc: 'Soft piano, emotive beats & floor sweeps',
                    icon: '🌊',
                  },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleVibeSelect(option.key)}
                    className="p-4 rounded-2xl bg-white border border-[#D9D7D0] hover:border-[#3D6338] hover:bg-[#D8E8D4]/30 text-left transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-sm group"
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="text-sm font-bold text-[#1E1D1B] group-hover:text-[#3D6338]">
                      {option.title}
                    </div>
                    <div className="text-xs text-[#5A5854] mt-0.5">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: RECOMMENDATION RESULT */}
          {currentStep === 4 && recommendedClass && (
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D8E8D4] text-[#3D6338] text-xs font-bold rounded-full mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Your Perfect Dance Match (98% Compatibility)</span>
                </div>
                <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#1E1D1B]">
                  {recommendedClass.name}
                </h4>
                <p className="text-xs text-[#5A5854] max-w-md mx-auto mt-1">
                  {recommendedClass.tagline}
                </p>
              </div>

              {/* Match Card Details */}
              <div className="p-4 rounded-2xl bg-white border border-[#B5CAB0] shadow-md space-y-3">
                <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-2 text-xs">
                  <span className="text-[#5A5854]">Level:</span>
                  <span className="font-bold text-[#1E1D1B]">{recommendedClass.level}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-2 text-xs">
                  <span className="text-[#5A5854]">Days &amp; Timings:</span>
                  <span className="font-bold text-[#3D6338]">{recommendedClass.scheduleDays}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-2 text-xs">
                  <span className="text-[#5A5854]">Lead Faculty:</span>
                  <span className="font-bold text-[#1E1D1B]">{recommendedClass.instructorName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#5A5854]">Estimated Calorie Burn:</span>
                  <span className="font-bold text-[#7A9E74]">{recommendedClass.caloriesBurn}</span>
                </div>

                <div className="pt-2">
                  <div className="text-[11px] font-semibold text-[#5A5854] mb-1">What you'll master:</div>
                  <ul className="text-xs text-[#2C2B29] space-y-1">
                    {recommendedClass.curriculumHighlights.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#3D6338] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onBookTrialWithClass(recommendedClass.name);
                  }}
                  className="flex-1 py-3 px-4 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-full font-semibold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Claim Free Trial for this Class</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={resetQuiz}
                  className="py-3 px-4 bg-[#EFEDE7] hover:bg-[#E4E1D7] text-[#5A5854] rounded-full font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
