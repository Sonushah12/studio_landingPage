import React, { useState } from 'react';
import { Image as ImageIcon, Check, ExternalLink, Sparkles, HelpCircle, HardDrive } from 'lucide-react';
import { extractGoogleDriveFileId, formatGoogleDriveDirectUrl, isGoogleDriveUrl, resolveDirectImageUrl } from '../../utils/imageUtils';
import { SafeImage } from '../SafeImage';

interface ImageHelperProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide';
}

const PRESET_DANCE_IMAGES = [
  { label: 'Bollywood Fusion Energy', url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Street Hip-Hop & Cypher', url: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Salsa & Bachata Partnering', url: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Contemporary Lyrical Art', url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Kids Movement & Little Stars', url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Grand Wedding Sangeet Couple', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Studio Wooden Sprung Floor', url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Studio Mirrors & Acoustic Room', url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Male Choreographer Portrait 1', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Male Choreographer Portrait 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Student Female Portrait', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
  { label: 'Student Male Portrait', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
];

export const ImageHelper: React.FC<ImageHelperProps> = ({
  label,
  value,
  onChange,
  aspectRatio = 'video',
}) => {
  const [showPresets, setShowPresets] = useState(false);
  const [showDriveGuide, setShowDriveGuide] = useState(false);
  const [imgError, setImgError] = useState(false);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'portrait':
        return 'aspect-[3/4] w-24';
      case 'square':
        return 'aspect-square w-20';
      case 'wide':
        return 'aspect-[21/9] w-full max-w-xs';
      case 'video':
      default:
        return 'aspect-[16/10] w-36';
    }
  };

  const handleInputChange = (rawInput: string) => {
    setImgError(false);
    const trimmed = rawInput.trim();

    // If user pasted a Google Drive sharing link or file ID, automatically convert it to direct view URL
    if (isGoogleDriveUrl(trimmed)) {
      const direct = formatGoogleDriveDirectUrl(trimmed, 'cdn');
      onChange(direct);
    } else {
      onChange(rawInput);
    }
  };

  const isDrive = isGoogleDriveUrl(value);
  const driveFileId = extractGoogleDriveFileId(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#5A5854] flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#3D6338]" />
          <span>{label}</span>
        </label>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowDriveGuide(!showDriveGuide)}
            className="text-[10px] text-[#2563EB] hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <HardDrive className="w-3 h-3" />
            <span>Google Drive Direct</span>
          </button>
          <span className="text-[#D9D7D0]">|</span>
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="text-[10px] text-[#3D6338] hover:text-[#2F4E2B] font-semibold underline cursor-pointer"
          >
            {showPresets ? 'Close Presets' : 'Choose Presets'}
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start">
        {/* Preview Thumbnail */}
        <div
          className={`${getAspectClass()} rounded-xl overflow-hidden bg-[#2C2B29] border border-[#D9D7D0] relative flex-shrink-0 flex items-center justify-center`}
        >
          {value && !imgError ? (
            <SafeImage
              src={value}
              alt="Preview"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-2 text-[10px] text-[#9E9B92]">
              <ImageIcon className="w-5 h-5 mx-auto mb-1 opacity-50" />
              <span>{imgError ? 'Invalid URL' : 'No Image'}</span>
            </div>
          )}
        </div>

        {/* URL Input */}
        <div className="flex-1 w-full space-y-1.5">
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Paste Google Drive share link or direct URL (e.g. drive.google.com/file/d/...)"
              className="flex-1 px-3 py-2 bg-white rounded-xl border border-[#D9D7D0] focus:border-[#3D6338] text-xs text-[#1E1D1B] outline-none shadow-xs"
            />
            {value && (
              <a
                href={resolveDirectImageUrl(value)}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-[#F7F5F0] hover:bg-[#EFEDE7] text-[#5A5854] rounded-xl border border-[#D9D7D0] flex items-center justify-center cursor-pointer"
                title="Open image in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Dynamic Detection Indicator */}
          {isDrive && (
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
              <span>Google Drive Direct Image Active {driveFileId ? `(ID: ${driveFileId.substring(0, 8)}...)` : ''}</span>
            </div>
          )}

          <p className="text-[10px] text-[#9E9B92]">
            Supports direct Google Drive links, Unsplash, Imgur, Cloudinary, AWS S3, or any public image URL.
          </p>
        </div>
      </div>

      {/* Google Drive Guide Accordion */}
      {showDriveGuide && (
        <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 space-y-2 text-xs text-[#1E1D1B] animate-in fade-in">
          <div className="flex items-center gap-1.5 font-bold text-blue-900 text-xs">
            <HardDrive className="w-4 h-4 text-blue-700" />
            <span>How to use Google Drive images directly:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-[11px] text-blue-800 leading-relaxed pl-1">
            <li>Right-click your image in <strong>Google Drive</strong> &rarr; Click <strong>Share</strong>.</li>
            <li>Under General Access, change to <strong>"Anyone with the link" (Viewer)</strong>.</li>
            <li>Click <strong>Copy link</strong> and paste it directly into this input box.</li>
            <li>The system will automatically convert it to a high-speed direct view image URL!</li>
          </ol>
        </div>
      )}

      {/* Preset Selector Grid */}
      {showPresets && (
        <div className="p-3 bg-[#F7F5F0] rounded-2xl border border-[#D9D7D0] animate-in fade-in space-y-2 mt-2">
          <div className="text-[10px] font-bold uppercase text-[#5A5854] flex items-center justify-between">
            <span>Curated Dance &amp; Studio Photos:</span>
            <span className="text-[#3D6338]">Click to apply</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
            {PRESET_DANCE_IMAGES.map((preset, idx) => {
              const isSelected = value === preset.url;
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setImgError(false);
                    onChange(preset.url);
                    setShowPresets(false);
                  }}
                  className={`p-1.5 rounded-xl text-left border transition-all text-xs cursor-pointer group flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-[#D8E8D4] border-[#3D6338]'
                      : 'bg-white border-[#D9D7D0] hover:border-[#7A9E74]'
                  }`}
                >
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-black/10">
                    <img
                      src={preset.url}
                      alt={preset.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-[10px] font-medium text-[#2C2B29] truncate flex items-center justify-between">
                    <span className="truncate">{preset.label}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#3D6338] flex-shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
