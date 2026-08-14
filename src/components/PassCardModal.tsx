import React from 'react';
import { X, Check, Calendar, Clock, MapPin, Sparkles, MessageCircle, Printer, Download, QrCode } from 'lucide-react';
import { TrialBooking } from '../types';
import { useStudioData } from '../context/StudioDataContext';

interface PassCardModalProps {
  booking: TrialBooking | null;
  onClose: () => void;
}

export const PassCardModal: React.FC<PassCardModalProps> = ({ booking, onClose }) => {
  const { data } = useStudioData();
  const { generalInfo } = data;

  if (!booking) return null;

  const currentAddress =
    generalInfo.address ||
    generalInfo.fullAddress ||
    'Hanshoura Road, Ahmedabad, Gujarat';

  const handlePrint = () => {
    window.print();
  };

  const whatsappNumber = generalInfo.whatsapp || '919909843221';
  const whatsappText = encodeURIComponent(
    `Hi Sonu Shah and ${generalInfo.studioName || 'Merrick Dance'} Team! I just generated my Free VIP Trial Pass (Code: ${booking.bookingCode}) for ${booking.selectedClass} on ${booking.preferredDay} (${booking.preferredTime}). Name: ${booking.firstName} ${booking.lastName}. Looking forward to seeing you at ${currentAddress}!`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in zoom-in-95 duration-200">
      <div className="bg-[#F7F5F0] rounded-3xl max-w-lg w-full border border-[#D9D7D0] shadow-2xl overflow-hidden relative">
        {/* Top close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#1E1D1B] transition shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Banner */}
        <div className="bg-gradient-to-r from-[#3D6338] via-[#4E7D47] to-[#3D6338] text-white p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
            <Sparkles className="w-6 h-6 text-[#D8E8D4]" />
          </div>
          <h3 className="font-display font-bold text-2xl text-white">
            You're All Set, {booking.firstName}!
          </h3>
          <p className="text-xs text-[#D8E8D4] mt-1">
            Your 100% Free VIP Studio Trial Pass has been generated.
          </p>
        </div>

        {/* Printable / Viewable VIP Pass Card */}
        <div className="p-6 space-y-4">
          <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-[#7A9E74] shadow-md relative overflow-hidden">
            {/* Watermark Logo */}
            <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none font-display font-black text-9xl text-[#3D6338]">
              MDS
            </div>

            {/* Pass Header */}
            <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-3">
              <div>
                <span className="text-[9px] uppercase font-bold text-[#7A9E74] tracking-widest block">
                  OFFICIAL VIP TRIAL PASS
                </span>
                <h4 className="font-display font-bold text-lg text-[#1E1D1B]">
                  {generalInfo.studioName || 'Merrick Dance & Entertainment'}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#9E9B92] block">Pass ID:</span>
                <span className="font-mono text-xs font-bold text-[#3D6338] bg-[#D8E8D4]/60 px-2 py-0.5 rounded-md">
                  {booking.bookingCode}
                </span>
              </div>
            </div>

            {/* Pass Details */}
            <div className="py-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-[#9E9B92] uppercase block">Dancer Name</span>
                <span className="font-bold text-[#1E1D1B] block truncate">
                  {booking.firstName} {booking.lastName}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#9E9B92] uppercase block">Selected Class</span>
                <span className="font-bold text-[#3D6338] block truncate">
                  {booking.selectedClass}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#9E9B92] uppercase block">Reserved Slot</span>
                <span className="font-semibold text-[#1E1D1B] block">
                  {booking.preferredDay} · {booking.preferredTime}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#9E9B92] uppercase block">Location</span>
                <span className="font-semibold text-[#1E1D1B] block truncate" title={currentAddress}>
                  {currentAddress}
                </span>
              </div>
            </div>

            {/* QR Simulation Strip */}
            <div className="border-t border-[#EFEDE7] pt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#F7F5F0] rounded-lg border border-[#D9D7D0] flex items-center justify-center text-[#3D6338]">
                  <QrCode className="w-6 h-6" />
                </div>
                <div className="text-[10px] text-[#5A5854]">
                  Show this pass at front reception upon arrival.
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#3D6338] bg-[#D8E8D4] px-2 py-1 rounded-full">
                100% Free · Confirmed
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm Pass on WhatsApp ({generalInfo.phoneDisplay || '+91 99098 43221'})</span>
            </a>

            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 bg-white hover:bg-[#EFEDE7] text-[#1E1D1B] border border-[#D9D7D0] rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#5A5854]" />
                <span>Print Pass</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
