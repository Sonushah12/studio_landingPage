import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, Heart, Award, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/studioData';

export const TestimonialsSection: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filtered =
    filterCategory === 'all'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === filterCategory);

  return (
    <section id="testimonials" className="py-20 bg-[#EFEDE7] border-t border-[#D9D7D0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Google Rating Badge */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E8D4] text-[#3D6338] text-xs font-bold uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>Student &amp; Parent Stories</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
            Transformed by the Joy of Dance
          </h2>

          {/* Social Proof Google Review Card */}
          <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#D9D7D0] shadow-sm mt-4">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#1E1D1B]">4.9 / 5.0 Star Rating</span>
            <span className="text-[#D9D7D0]">|</span>
            <span className="text-xs text-[#5A5854]">340+ Verified Reviews on Google</span>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
            {[
              { key: 'all', label: 'All Reviews' },
              { key: 'kids', label: 'Parents of Kids' },
              { key: 'adult', label: 'Adult Beginners' },
              { key: 'contemporary', label: 'Bollywood & Urban' },
              { key: 'wedding', label: 'Wedding Couples' },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilterCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  filterCategory === cat.key
                    ? 'bg-[#3D6338] text-white shadow-md'
                    : 'bg-white text-[#5A5854] border border-[#D9D7D0] hover:bg-[#F7F5F0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm hover:shadow-md transition relative flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-[#D8E8D4] absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                {/* Stars */}
                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-[#2C2B29] leading-relaxed italic relative z-10">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-4 border-t border-[#EFEDE7] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.bgGradient} text-white font-bold font-display flex items-center justify-center text-sm shadow-sm flex-shrink-0`}
                  >
                    {t.avatarText}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[#1E1D1B] leading-none">
                      {t.name}
                    </h4>
                    <div className="text-xs text-[#5A5854] mt-0.5">{t.role}</div>
                    <div className="text-[10px] text-[#3D6338] font-semibold mt-0.5">
                      {t.enrolledClass}
                    </div>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[10px] px-2.5 py-1 bg-[#F7F5F0] text-[#7A9E74] font-semibold rounded-full border border-[#D9D7D0]">
                    {t.yearsWithStudio}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
