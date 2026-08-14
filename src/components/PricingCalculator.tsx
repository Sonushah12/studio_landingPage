import React, { useState, useRef } from 'react';
import { Check, Gift, ArrowRight, Tag } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useStudioData } from '../context/StudioDataContext';
import { performFlipTransition } from '../utils/gsapAnimations';

interface PricingCalculatorProps {
  onOpenTrialModal: () => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onOpenTrialModal }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('quarterly');
  const [classesPerWeek, setClassesPerWeek] = useState<number>(2); // 2 or 3 or 5 (unlimited)
  const [includeRecitalPass, setIncludeRecitalPass] = useState<boolean>(true);
  const [includePrivateCoaching, setIncludePrivateCoaching] = useState<boolean>(false);
  const [isSiblingDiscount, setIsSiblingDiscount] = useState<boolean>(false);
  const summaryCardRef = useRef<HTMLDivElement>(null);

  const { data } = useStudioData();
  const pricing = data.pricingConfig || {
    baseMonthly2x: 2200,
    baseMonthly3x: 3000,
    baseMonthlyUnlimited: 4500,
    quarterlyDiscountPercent: 15,
    annualDiscountPercent: 25,
    recitalPassFee: 1500,
    privateCoachingSessionFee: 1800,
    siblingDiscountPercent: 10,
  };

  const handleCycleChange = (cycle: 'monthly' | 'quarterly' | 'annual') => {
    if (cycle === billingCycle) return;
    performFlipTransition(
      summaryCardRef.current,
      () => {
        setBillingCycle(cycle);
      },
      { duration: 0.4, ease: 'power3.out' }
    );
  };

  const handleFrequencyChange = (freq: number) => {
    if (freq === classesPerWeek) return;
    performFlipTransition(
      summaryCardRef.current,
      () => {
        setClassesPerWeek(freq);
      },
      { duration: 0.4, ease: 'power3.out' }
    );
  };

  // Base monthly pricing
  const baseMonthly =
    classesPerWeek === 2
      ? pricing.baseMonthly2x
      : classesPerWeek === 3
      ? pricing.baseMonthly3x
      : pricing.baseMonthlyUnlimited;

  // Multiplier for billing cycle
  const months = billingCycle === 'monthly' ? 1 : billingCycle === 'quarterly' ? 3 : 12;
  const discountPercent =
    billingCycle === 'monthly'
      ? 0
      : billingCycle === 'quarterly'
      ? pricing.quarterlyDiscountPercent
      : pricing.annualDiscountPercent;

  // Add-ons
  const recitalCost = includeRecitalPass ? (billingCycle === 'annual' ? 0 : pricing.recitalPassFee) : 0; // free on annual
  const privateCost = includePrivateCoaching
    ? pricing.privateCoachingSessionFee * (billingCycle === 'monthly' ? 1 : billingCycle === 'quarterly' ? 2 : 6)
    : 0;

  // Subtotal calculation
  const rawTuition = baseMonthly * months;
  const discountedTuition = Math.round(rawTuition * (1 - discountPercent / 100));
  const siblingSavings = isSiblingDiscount ? Math.round(discountedTuition * (pricing.siblingDiscountPercent / 100)) : 0;
  const finalTotal = discountedTuition - siblingSavings + recitalCost + privateCost;
  const savingsTotal = rawTuition - discountedTuition + (includeRecitalPass && billingCycle === 'annual' ? pricing.recitalPassFee + 1000 : 0) + siblingSavings;

  return (
    <section id="pricing" className="py-20 bg-[#F7F5F0] border-t border-[#D9D7D0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Scroll Reveal */}
        <ScrollReveal animation="fade-up" duration={650}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E8D4] text-[#3D6338] text-xs font-bold uppercase tracking-widest mb-3">
              <Tag className="w-3.5 h-3.5" />
              <span>Transparent Tuition &amp; Passes</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
              Custom Fee &amp; Membership Calculator
            </h2>
            <p className="text-[#5A5854] text-sm mt-3">
              No hidden admission costs. Build your tailored dance pass below and enjoy complimentary trial guarantee on Hanshoura Road.
            </p>

            {/* Billing Cycle Pill Switcher */}
            <div className="inline-flex items-center gap-1 bg-[#EFEDE7] p-1.5 rounded-full border border-[#D9D7D0] mt-8">
              <button
                onClick={() => handleCycleChange('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-[#3D6338] text-white shadow-sm'
                    : 'text-[#5A5854] hover:text-[#1E1D1B]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => handleCycleChange('quarterly')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition cursor-pointer relative ${
                  billingCycle === 'quarterly'
                    ? 'bg-[#3D6338] text-white shadow-sm'
                    : 'text-[#5A5854] hover:text-[#1E1D1B]'
                }`}
              >
                <span>Quarterly (3 Mo)</span>
                <span className="ml-1.5 text-[9px] px-1.5 py-0.2 bg-[#7A9E74] text-white rounded-full font-bold">
                  Save 15%
                </span>
              </button>
              <button
                onClick={() => handleCycleChange('annual')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition cursor-pointer relative ${
                  billingCycle === 'annual'
                    ? 'bg-[#3D6338] text-white shadow-sm'
                    : 'text-[#5A5854] hover:text-[#1E1D1B]'
                }`}
              >
                <span>Annual Pass</span>
                <span className="ml-1.5 text-[9px] px-1.5 py-0.2 bg-[#3D6338] text-white rounded-full font-bold">
                  Save 25% + Gifts
                </span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configurator Controls with fade-right */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-right" delay={100} duration={700}>
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D9D7D0] shadow-sm space-y-6">
                {/* Step 1: Frequency */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-[#3D6338] block mb-3">
                    1. Select Weekly Class Frequency
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { days: 2, label: '2 Days / Week', sub: '8 Classes/Mo · Perfect for beginners' },
                      { days: 3, label: '3 Days / Week', sub: '12 Classes/Mo · Optimal progress' },
                      { days: 5, label: 'Unlimited All-Access', sub: '20+ Classes/Mo · Total immersion' },
                    ].map((item) => (
                      <button
                        key={item.days}
                        onClick={() => handleFrequencyChange(item.days)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                          classesPerWeek === item.days
                            ? 'bg-[#D8E8D4]/40 border-[#3D6338] shadow-sm'
                            : 'border-[#D9D7D0] hover:border-[#B5CAB0]'
                        }`}
                      >
                        <div className="text-sm font-bold text-[#1E1D1B]">{item.label}</div>
                        <div className="text-[11px] text-[#5A5854] mt-1">{item.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Add-on Perks */}
                <div className="pt-2 border-t border-[#EFEDE7]">
                  <label className="text-xs uppercase tracking-wider font-bold text-[#3D6338] block mb-3">
                    2. Optional Add-ons &amp; Customizations
                  </label>
                  <div className="space-y-3">
                    {/* Recital Pass */}
                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#D9D7D0] cursor-pointer hover:border-[#B5CAB0]">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={includeRecitalPass}
                          onChange={(e) => setIncludeRecitalPass(e.target.checked)}
                          className="w-4 h-4 text-[#3D6338] rounded border-gray-300 focus:ring-[#3D6338]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#1E1D1B]">
                            Annual Grand Recital Costume &amp; 4K Video Pass
                          </div>
                          <div className="text-[11px] text-[#5A5854]">
                            Includes designer stage costume, makeup team &amp; multi-camera footage.
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#3D6338] whitespace-nowrap">
                        {billingCycle === 'annual' ? 'FREE in Annual' : '+₹1,500'}
                      </span>
                    </label>

                    {/* 1-on-1 Private */}
                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#D9D7D0] cursor-pointer hover:border-[#B5CAB0]">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={includePrivateCoaching}
                          onChange={(e) => setIncludePrivateCoaching(e.target.checked)}
                          className="w-4 h-4 text-[#3D6338] rounded border-gray-300 focus:ring-[#3D6338]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#1E1D1B]">
                            Personal 1-on-1 Master Technique Coaching
                          </div>
                          <div className="text-[11px] text-[#5A5854]">
                            60-minute dedicated private session with Senior Faculty per month.
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#3D6338] whitespace-nowrap">
                        +₹1,800 / mo
                      </span>
                    </label>

                    {/* Sibling / Family Discount */}
                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#D9D7D0] cursor-pointer hover:border-[#B5CAB0]">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSiblingDiscount}
                          onChange={(e) => setIsSiblingDiscount(e.target.checked)}
                          className="w-4 h-4 text-[#3D6338] rounded border-gray-300 focus:ring-[#3D6338]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#1E1D1B]">
                            Sibling or Family Multi-Member Pass
                          </div>
                          <div className="text-[11px] text-[#5A5854]">
                            Enrolling two or more family members? Apply automatic 10% family discount.
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#7A9E74] whitespace-nowrap">
                        -10% Discount
                      </span>
                    </label>
                  </div>
                </div>

                {/* Included in All Plans */}
                <div className="pt-2 border-t border-[#EFEDE7]">
                  <div className="text-[11px] font-bold uppercase text-[#9E9B92] tracking-wider mb-2">
                    Always Included in Every Membership:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#2C2B29]">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#3D6338]" /> 2 Make-up classes / month
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#3D6338]" /> Sprung floor studio access
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#3D6338]" /> ABGMVM Exam Eligibility
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#3D6338]" /> Student Video Progress Diary
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Dynamic Price Summary Card with fade-left */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-left" delay={200} duration={700}>
              <div ref={summaryCardRef} className="bg-gradient-to-b from-[#1E1D1B] to-[#2C2B29] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#5A5854] pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#B5CAB0] tracking-widest block">
                      Calculated Tuition Plan
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[#F7F5F0] mt-0.5">
                      {billingCycle === 'monthly'
                        ? 'Monthly Pass'
                        : billingCycle === 'quarterly'
                        ? 'Quarterly Pass (3 Mo)'
                        : 'Annual Membership (12 Mo)'}
                    </h3>
                  </div>
                  {savingsTotal > 0 && (
                    <div className="px-3 py-1 bg-[#3D6338] text-[#D8E8D4] text-xs font-bold rounded-full">
                      You Save ₹{savingsTotal.toLocaleString('en-IN')}
                    </div>
                  )}
                </div>

                {/* Price Figure */}
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-bold font-display text-white">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#9E9B92]">
                      / {billingCycle === 'monthly' ? 'month' : billingCycle === 'quarterly' ? '3 months' : 'year'}
                    </span>
                  </div>
                  <div className="text-xs text-[#B5CAB0] mt-1">
                    Effective rate: ~₹{Math.round(finalTotal / months).toLocaleString('en-IN')} / month
                  </div>
                </div>

                {/* Plan Breakdown items */}
                <div className="space-y-2 text-xs border-t border-[#5A5854] pt-4">
                  <div className="flex justify-between text-[#D9D7D0]">
                    <span>Base Tuition ({classesPerWeek === 5 ? 'Unlimited' : `${classesPerWeek} days/wk`}):</span>
                    <span>₹{rawTuition.toLocaleString('en-IN')}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-[#7A9E74]">
                      <span>Cycle Savings ({discountPercent}% off):</span>
                      <span>-₹{(rawTuition - discountedTuition).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {isSiblingDiscount && (
                    <div className="flex justify-between text-[#7A9E74]">
                      <span>Family Sibling Discount (10%):</span>
                      <span>-₹{siblingSavings.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {includeRecitalPass && (
                    <div className="flex justify-between text-[#D9D7D0]">
                      <span>Recital &amp; Costume Pass:</span>
                      <span>{billingCycle === 'annual' ? 'FREE (Saved ₹2,500)' : `₹${recitalCost.toLocaleString('en-IN')}`}</span>
                    </div>
                  )}
                  {includePrivateCoaching && (
                    <div className="flex justify-between text-[#D9D7D0]">
                      <span>1-on-1 Private Sessions:</span>
                      <span>+₹{privateCost.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>

                {/* Annual Bonus Box */}
                {billingCycle === 'annual' && (
                  <div className="p-3.5 rounded-2xl bg-[#3D6338]/40 border border-[#7A9E74] flex items-center gap-3">
                    <Gift className="w-6 h-6 text-[#D8E8D4] flex-shrink-0" />
                    <div className="text-[11px] text-[#D8E8D4]">
                      <strong className="text-white block font-semibold">Annual Member Welcome Kit:</strong>
                      Complimentary Merrick Dance Studio Tee, Water Bottle &amp; Priority Masterclass Seating.
                    </div>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={onOpenTrialModal}
                  className="w-full py-4 bg-[#3D6338] hover:bg-[#4E7D47] text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Enroll with 1st Free Trial Guarantee</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-center text-[#9E9B92]">
                  100% Risk-Free: If your first trial class isn’t a fit, no payment is processed.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
