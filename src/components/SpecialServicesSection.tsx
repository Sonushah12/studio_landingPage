import React from 'react';
import { Heart, Check, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SafeImage } from './SafeImage';
import { useStudioData } from '../context/StudioDataContext';

interface SpecialServicesSectionProps {
  onRequestCustomQuote: (serviceName: string) => void;
}

export const SpecialServicesSection: React.FC<SpecialServicesSectionProps> = ({ onRequestCustomQuote }) => {
  const { data } = useStudioData();
  const { generalInfo } = data;
  const servicesList = data.specialServices || [];

  const currentAddress =
    generalInfo.address ||
    generalInfo.fullAddress ||
    'Hanshoura Road, Ahmedabad, Gujarat';
  const shortAddress = currentAddress.split(',')[0] || 'Hanshoura Road';

  return (
    <section id="wedding-services" className="py-20 bg-[#F7F5F0] border-t border-[#D9D7D0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal animation="fade-up" duration={650}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E8D4] text-[#3D6338] text-xs font-bold uppercase tracking-widest mb-3">
              <Heart className="w-3.5 h-3.5" />
              <span>Signature Bespoke Choreography</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
              Wedding Sangeet &amp; Event Choreography
            </h2>
            <p className="text-[#5A5854] text-sm sm:text-base mt-3">
              Make your milestone celebrations unforgettable at our {shortAddress} studio. From romantic couple first dances to showstopping 40-person family medleys and corporate team-building.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Specialized Services Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <ScrollReveal
              key={idx}
              animation="fade-up"
              delay={idx * 110}
              duration={700}
              className="h-full"
            >
              <div className="bg-white rounded-3xl border border-[#D9D7D0] hover:border-[#3D6338] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 h-full">
                <div>
                  {/* Photo Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#2C2B29]">
                    <SafeImage
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full bg-[#3D6338] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {service.category}
                      </span>
                    </div>

                    {/* Title overlay on bottom of photo */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <h3 className="font-display font-bold text-xl text-white leading-tight drop-shadow-sm">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-[#5A5854] leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2 text-xs text-[#2C2B29] pt-2 border-t border-[#EFEDE7]">
                      {service.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#3D6338] flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onRequestCustomQuote(service.btnAction || service.title)}
                    className={`w-full py-3 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                      idx === 1
                        ? 'bg-[#1E1D1B] hover:bg-[#2C2B29]'
                        : 'bg-[#3D6338] hover:bg-[#2F4E2B]'
                    }`}
                  >
                    <span>{service.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
