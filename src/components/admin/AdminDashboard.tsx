import React, { useState } from 'react';
import {
  Building,
  Sparkles,
  Layers,
  Users,
  Calendar,
  DollarSign,
  Flame,
  HeartHandshake,
  ShieldCheck,
  MessageSquare,
  HelpCircle,
  KeyRound,
  LogOut,
  Eye,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Check,
  ArrowUpRight,
  Save,
  Clock,
  Phone,
  Mail,
  MapPin,
  X,
  AlertCircle
} from 'lucide-react';
import { useStudioData } from '../../context/StudioDataContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ImageHelper } from './ImageHelper';
import { SafeImage } from '../SafeImage';
import {
  DanceClass,
  Instructor,
  ScheduleSlot,
  Workshop,
  SpecialService,
  StudioAmenity,
  Testimonial,
  FaqItem,
} from '../../types';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

type TabType =
  | 'general'
  | 'hero'
  | 'classes'
  | 'instructors'
  | 'schedule'
  | 'pricing'
  | 'workshops'
  | 'specialServices'
  | 'amenities'
  | 'testimonials'
  | 'faqs'
  | 'security';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const {
    data,
    updateGeneralInfo,
    updateHeroConfig,
    updatePricingConfig,
    addClass,
    updateClass,
    deleteClass,
    addInstructor,
    updateInstructor,
    deleteInstructor,
    addScheduleSlot,
    updateScheduleSlot,
    deleteScheduleSlot,
    addWorkshop,
    updateWorkshop,
    deleteWorkshop,
    addSpecialService,
    updateSpecialService,
    deleteSpecialService,
    updateAmenity,
    addAmenity,
    deleteAmenity,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addFaq,
    updateFaq,
    deleteFaq,
    resetToFactoryDefaults,
    importBackupData,
    exportBackupData,
    saveAllChanges,
    lastSavedAt,
  } = useStudioData();

  const { logout, adminEmail, updateCredentials } = useAdminAuth();

  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Security tab state
  const [newAdminEmail, setNewAdminEmail] = useState(adminEmail);
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmNewPassInput, setConfirmNewPassInput] = useState('');

  // Editing Modals / Forms
  const [editingClass, setEditingClass] = useState<DanceClass | null>(null);
  const [isAddingClass, setIsAddingClass] = useState(false);

  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const [isAddingInstructor, setIsAddingInstructor] = useState(false);

  const [editingSlot, setEditingSlot] = useState<ScheduleSlot | null>(null);
  const [isAddingSlot, setIsAddingSlot] = useState(false);

  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [isAddingWorkshop, setIsAddingWorkshop] = useState(false);

  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);

  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  const [editingAmenity, setEditingAmenity] = useState<StudioAmenity | null>(null);
  const [editingSpecialService, setEditingSpecialService] = useState<SpecialService | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveAllChanges = () => {
    setIsSaving(true);
    saveAllChanges();
    showToast('✅ All Changes Saved & Published to Live Website!');
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  // Export JSON Backup
  const handleExport = () => {
    const jsonStr = exportBackupData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `merrick-studio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Studio data backup downloaded as JSON!');
  };

  // Import JSON Backup
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const res = importBackupData(parsed);
        if (res.success) {
          showToast('Backup restored successfully!');
        } else {
          alert(res.message);
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset ALL studio contents, schedules, prices, and images to factory original defaults?'
      )
    ) {
      resetToFactoryDefaults();
      showToast('All contents reset to original defaults.');
    }
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassInput !== confirmNewPassInput) {
      alert('New passwords do not match!');
      return;
    }
    const res = updateCredentials(newAdminEmail, newPassInput, currentPassInput);
    if (res.success) {
      showToast(res.message);
      setCurrentPassInput('');
      setNewPassInput('');
      setConfirmNewPassInput('');
    } else {
      alert(res.message);
    }
  };

  const tabs = [
    { id: 'general', label: 'Studio & Contact', icon: Building, badge: 'Address & Phone' },
    { id: 'hero', label: 'Hero & Headlines', icon: Sparkles, badge: 'Slides & Text' },
    { id: 'classes', label: 'Dance Classes', icon: Layers, count: data.classes.length },
    { id: 'instructors', label: 'Instructors', icon: Users, count: data.instructors.length },
    { id: 'schedule', label: 'Weekly Schedule', icon: Calendar, count: data.scheduleSlots.length },
    { id: 'pricing', label: 'Fees & Calculator', icon: DollarSign, badge: 'Tuition' },
    { id: 'workshops', label: 'Workshops', icon: Flame, count: data.workshops.length },
    { id: 'specialServices', label: 'Wedding & Events', icon: HeartHandshake, count: data.specialServices.length },
    { id: 'amenities', label: 'Studio Tour', icon: ShieldCheck, count: data.amenities.length },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, count: data.testimonials.length },
    { id: 'faqs', label: 'FAQs & Desk', icon: HelpCircle, count: data.faqs.length },
    { id: 'security', label: 'Security & Auth', icon: KeyRound, badge: 'Passcode' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1E1D1B] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-[#1E1D1B] text-white border-b border-[#3D6338]/40 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3D6338] text-white flex items-center justify-center font-display font-bold text-lg shadow-sm">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base sm:text-lg tracking-tight">
                  Merrick Studio CMS
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#3D6338] text-[#D8E8D4] text-[10px] font-bold uppercase tracking-wider">
                  Live Sync
                </span>
              </div>
              <p className="text-[10px] text-[#9E9B92] hidden sm:block">
                All changes instantly sync to public website on Hanshoura Road
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {lastSavedAt && (
              <span className="text-[11px] text-[#B5CAB0] hidden md:flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#7A9E74]" />
                <span>Auto-saved</span>
              </span>
            )}

            <button
              onClick={handleSaveAllChanges}
              className="px-3.5 sm:px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105 active:scale-95"
              title="Save all changes to live website"
            >
              {isSaving ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-white" />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            <button
              onClick={onBackToSite}
              className="px-3.5 py-2 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="View Public Live Website"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Live Site</span>
            </button>

            <button
              onClick={handleExport}
              className="p-2 bg-white/10 hover:bg-white/20 text-[#D8E8D4] rounded-xl transition cursor-pointer"
              title="Download JSON Backup"
            >
              <Download className="w-4 h-4" />
            </button>

            <label
              className="p-2 bg-white/10 hover:bg-white/20 text-[#D8E8D4] rounded-xl transition cursor-pointer"
              title="Import JSON Backup"
            >
              <Upload className="w-4 h-4" />
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>

            <button
              onClick={handleReset}
              className="p-2 bg-white/10 hover:bg-rose-600/40 text-[#D8E8D4] rounded-xl transition cursor-pointer"
              title="Reset to Factory Defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={logout}
              className="p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition cursor-pointer"
              title="Logout from Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Navigation */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-3xl p-3 border border-[#D9D7D0] shadow-sm space-y-1 sticky top-24">
            <div className="px-3 py-2 text-[10px] uppercase font-bold text-[#9E9B92] tracking-wider">
              Website Content Modules
            </div>

            <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`w-full p-2.5 rounded-2xl text-xs font-semibold flex items-center justify-between transition cursor-pointer text-left ${
                      isActive
                        ? 'bg-[#3D6338] text-white shadow-sm'
                        : 'text-[#5A5854] hover:bg-[#F7F5F0] hover:text-[#1E1D1B]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-[#7A9E74]'}`} />
                      <span className="truncate">{tab.label}</span>
                    </div>

                    {tab.count !== undefined && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#EFEDE7] text-[#5A5854]'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}

                    {tab.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#D8E8D4] text-[#3D6338]'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Content Editor Area */}
        <main className="flex-1 w-full min-w-0">
          {/* TAB 1: GENERAL & CONTACT */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-4">
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#1E1D1B]">
                    Studio &amp; Contact Details
                  </h2>
                  <p className="text-xs text-[#5A5854] mt-0.5">
                    Update phone, WhatsApp, email, physical Hanshoura Road address, and top notification marquee.
                  </p>
                </div>
                <div className="px-3 py-1 bg-[#D8E8D4] text-[#3D6338] text-xs font-bold rounded-full">
                  Live Synced
                </div>
              </div>

              {/* Announcement Bar */}
              <div className="p-4 bg-[#F7F5F0] rounded-2xl border border-[#D9D7D0] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1E1D1B] flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.generalInfo.announcementBarEnabled}
                      onChange={(e) =>
                        updateGeneralInfo({ announcementBarEnabled: e.target.checked })
                      }
                      className="w-4 h-4 text-[#3D6338] rounded border-gray-300 focus:ring-[#3D6338]"
                    />
                    <span>Show Top Announcement Notice Banner</span>
                  </label>
                  <span className="text-[10px] text-[#5A5854]">Appears on top of website</span>
                </div>

                <input
                  type="text"
                  value={data.generalInfo.announcementBarText}
                  onChange={(e) => updateGeneralInfo({ announcementBarText: e.target.value })}
                  placeholder="e.g. 🎉 Admissions Open for Monsoon–Autumn Batches!"
                  className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#D9D7D0] text-xs outline-none"
                />
              </div>

              {/* Studio Name & Taglines */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Studio Name
                  </label>
                  <input
                    type="text"
                    value={data.generalInfo.studioName}
                    onChange={(e) => updateGeneralInfo({ studioName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Primary Tagline
                  </label>
                  <input
                    type="text"
                    value={data.generalInfo.tagline}
                    onChange={(e) => updateGeneralInfo({ tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                </div>
              </div>

              {/* Studio Logo URL with Google Drive Support */}
              <div className="p-4 bg-[#F7F5F0] rounded-2xl border border-[#D9D7D0]">
                <ImageHelper
                  label="Studio Logo Image (Navbar, Branding & Passes)"
                  value={data.generalInfo.logoUrl || ''}
                  onChange={(url) => updateGeneralInfo({ logoUrl: url })}
                  aspectRatio="square"
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Direct Phone Number
                  </label>
                  <input
                    type="text"
                    value={data.generalInfo.phoneDisplay}
                    onChange={(e) =>
                      updateGeneralInfo({
                        phoneDisplay: e.target.value,
                        phone: e.target.value.replace(/[^0-9+]/g, ''),
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    WhatsApp Desk
                  </label>
                  <input
                    type="text"
                    value={data.generalInfo.whatsappDisplay}
                    onChange={(e) =>
                      updateGeneralInfo({
                        whatsappDisplay: e.target.value,
                        whatsapp: e.target.value.replace(/[^0-9]/g, ''),
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={data.generalInfo.email}
                    onChange={(e) => updateGeneralInfo({ email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-3">
                <label className="text-[11px] font-bold uppercase text-[#5A5854] block">
                  Studio Physical Address &amp; Hanshoura Road Location
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={data.generalInfo.addressLine1}
                    onChange={(e) => updateGeneralInfo({ addressLine1: e.target.value })}
                    placeholder="Address Line 1"
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                  <input
                    type="text"
                    value={data.generalInfo.addressLine2}
                    onChange={(e) => updateGeneralInfo({ addressLine2: e.target.value })}
                    placeholder="Address Line 2"
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={data.generalInfo.city}
                    onChange={(e) => updateGeneralInfo({ city: e.target.value })}
                    placeholder="City (e.g. Ahmedabad)"
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                  <input
                    type="text"
                    value={data.generalInfo.state}
                    onChange={(e) => updateGeneralInfo({ state: e.target.value })}
                    placeholder="State (e.g. Gujarat)"
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                  <input
                    type="text"
                    value={data.generalInfo.pincode}
                    onChange={(e) => updateGeneralInfo({ pincode: e.target.value })}
                    placeholder="Pincode (e.g. 380007)"
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-[#7A9E74] block mb-1">
                    Direct Full Address Override (Instant Live Sync to All Badges, Drawer, Hero, Map, Footer &amp; Passes)
                  </label>
                  <input
                    type="text"
                    value={data.generalInfo.address || data.generalInfo.fullAddress || ''}
                    onChange={(e) =>
                      updateGeneralInfo({
                        address: e.target.value,
                        fullAddress: e.target.value,
                      })
                    }
                    placeholder="e.g. Hanshoura Road, Ahmedabad, Gujarat 380007"
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#3D6338]/40 focus:border-[#3D6338] text-xs font-semibold text-[#1E1D1B] outline-none shadow-xs"
                  />
                </div>
              </div>

              {/* Operating Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Weekday Operating Hours
                  </label>
                  <input
                    type="text"
                    value={data.generalInfo.operatingHoursWeekday}
                    onChange={(e) =>
                      updateGeneralInfo({ operatingHoursWeekday: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Weekend Operating Hours
                  </label>
                  <input
                    type="text"
                    value={data.generalInfo.operatingHoursWeekend}
                    onChange={(e) =>
                      updateGeneralInfo({ operatingHoursWeekend: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                </div>
              </div>

              {/* Key Stats */}
              <div className="pt-2 border-t border-[#EFEDE7]">
                <label className="text-xs font-bold uppercase text-[#3D6338] tracking-wider block mb-3">
                  Studio Metric Badges
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div>
                    <span className="text-[10px] text-[#5A5854] block">Students</span>
                    <input
                      type="text"
                      value={data.generalInfo.stats.studentsTrained}
                      onChange={(e) =>
                        updateGeneralInfo({
                          stats: { ...data.generalInfo.stats, studentsTrained: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5A5854] block">Years</span>
                    <input
                      type="text"
                      value={data.generalInfo.stats.yearsOfExcellence}
                      onChange={(e) =>
                        updateGeneralInfo({
                          stats: { ...data.generalInfo.stats, yearsOfExcellence: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5A5854] block">Rating</span>
                    <input
                      type="text"
                      value={data.generalInfo.stats.googleRating}
                      onChange={(e) =>
                        updateGeneralInfo({
                          stats: { ...data.generalInfo.stats, googleRating: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5A5854] block">Reviews</span>
                    <input
                      type="text"
                      value={data.generalInfo.stats.reviewsCount}
                      onChange={(e) =>
                        updateGeneralInfo({
                          stats: { ...data.generalInfo.stats, reviewsCount: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5A5854] block">Styles</span>
                    <input
                      type="text"
                      value={data.generalInfo.stats.danceDisciplines}
                      onChange={(e) =>
                        updateGeneralInfo({
                          stats: { ...data.generalInfo.stats, danceDisciplines: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs font-bold outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO & HEADLINES */}
          {activeTab === 'hero' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm space-y-6 animate-in fade-in">
              <div className="border-b border-[#EFEDE7] pb-4">
                <h2 className="font-display font-bold text-2xl text-[#1E1D1B]">
                  Hero Banner &amp; Slideshow Configuration
                </h2>
                <p className="text-xs text-[#5A5854] mt-0.5">
                  Customize the main 3-part headline, teaser description, CTA buttons, and high-impact background images.
                </p>
              </div>

              {/* Headline Customization */}
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Top Pill Badge Text
                  </label>
                  <input
                    type="text"
                    value={data.heroConfig.badgeText}
                    onChange={(e) => updateHeroConfig({ badgeText: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      Headline Part 1
                    </label>
                    <input
                      type="text"
                      value={data.heroConfig.mainHeadline1}
                      onChange={(e) => updateHeroConfig({ mainHeadline1: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#3D6338] block mb-1">
                      Highlight Word (Green Italic)
                    </label>
                    <input
                      type="text"
                      value={data.heroConfig.mainHeadlineHighlight}
                      onChange={(e) => updateHeroConfig({ mainHeadlineHighlight: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#D8E8D4]/50 rounded-xl border border-[#7A9E74] text-xs font-bold outline-none text-[#3D6338]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      Headline Part 2
                    </label>
                    <input
                      type="text"
                      value={data.heroConfig.mainHeadline2}
                      onChange={(e) => updateHeroConfig({ mainHeadline2: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Hero Sub-Description
                  </label>
                  <textarea
                    rows={3}
                    value={data.heroConfig.subDescription}
                    onChange={(e) => updateHeroConfig({ subDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      Primary CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={data.heroConfig.ctaPrimaryText}
                      onChange={(e) => updateHeroConfig({ ctaPrimaryText: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      Secondary CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={data.heroConfig.ctaSecondaryText}
                      onChange={(e) => updateHeroConfig({ ctaSecondaryText: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Slides */}
              <div className="pt-4 border-t border-[#EFEDE7] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-[#1E1D1B]">
                    Hero Slideshow Images ({data.heroConfig.slides.length})
                  </h3>
                  <button
                    onClick={() => {
                      const newSlide = {
                        id: `slide-${Date.now()}`,
                        imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1600&q=85',
                        title: 'New Dance Showcase Slide',
                        subtitle: 'Exciting routines & performance energy',
                        badge: 'Featured',
                      };
                      updateHeroConfig({ slides: [...data.heroConfig.slides, newSlide] });
                    }}
                    className="px-3 py-1.5 bg-[#3D6338] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Hero Slide</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.heroConfig.slides.map((slide, idx) => (
                    <div
                      key={slide.id}
                      className="p-4 bg-[#F7F5F0] rounded-2xl border border-[#D9D7D0] space-y-3 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#3D6338]">Slide #{idx + 1}</span>
                        {data.heroConfig.slides.length > 1 && (
                          <button
                            onClick={() => {
                              updateHeroConfig({
                                slides: data.heroConfig.slides.filter((s) => s.id !== slide.id),
                              });
                            }}
                            className="text-rose-500 hover:text-rose-700 text-xs p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <ImageHelper
                        label="Background Image URL"
                        value={slide.imageUrl}
                        onChange={(url) => {
                          const updated = data.heroConfig.slides.map((s) =>
                            s.id === slide.id ? { ...s, imageUrl: url } : s
                          );
                          updateHeroConfig({ slides: updated });
                        }}
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => {
                            const updated = data.heroConfig.slides.map((s) =>
                              s.id === slide.id ? { ...s, title: e.target.value } : s
                            );
                            updateHeroConfig({ slides: updated });
                          }}
                          placeholder="Slide Title"
                          className="px-3 py-1.5 bg-white rounded-xl border border-[#D9D7D0] text-xs font-semibold outline-none"
                        />
                        <input
                          type="text"
                          value={slide.badge}
                          onChange={(e) => {
                            const updated = data.heroConfig.slides.map((s) =>
                              s.id === slide.id ? { ...s, badge: e.target.value } : s
                            );
                            updateHeroConfig({ slides: updated });
                          }}
                          placeholder="Badge Text"
                          className="px-3 py-1.5 bg-white rounded-xl border border-[#D9D7D0] text-xs outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DANCE CLASSES */}
          {activeTab === 'classes' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-4">
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#1E1D1B]">
                    Dance Classes &amp; Programs ({data.classes.length})
                  </h2>
                  <p className="text-xs text-[#5A5854] mt-0.5">
                    Manage syllabi, calories burn, lead instructors, category tags, and cover photography.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newId = `class-${Date.now()}`;
                    const template: DanceClass = {
                      id: newId,
                      name: 'New Dance Discipline',
                      category: 'bollywood',
                      categoryLabel: 'Bollywood Fusion',
                      tagline: 'Exciting rhythm and step-by-step master choreography.',
                      description: 'Master dynamic routines and expressive confidence on Hanshoura Road.',
                      fullDescription: 'Comprehensive training with warm-up, technique drill, musicality, and performance recording.',
                      level: 'All Levels',
                      ageGroup: 'Age 8+',
                      scheduleDays: 'Tue / Thu / Sat',
                      timing: '6:00 PM – 7:15 PM',
                      instructorName: 'Shubham Rajput',
                      instructorId: 'shubham-rajput',
                      accentColor: '#3D6338',
                      lightColor: '#D8E8D4',
                      badge: 'New Batch',
                      curriculumHighlights: [
                        'Foundational body coordination & posture',
                        'Speed drills and footwork precision',
                        'Complete music routine mastered every 3 weeks',
                      ],
                      prerequisites: 'Open to all dance enthusiasts!',
                      caloriesBurn: '~450 kcal / session',
                      soundRhythmType: 'bollywood',
                      imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1000&q=80',
                    };
                    addClass(template);
                    setEditingClass(template);
                    showToast('New class created! Edit details below.');
                  }}
                  className="px-4 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Class</span>
                </button>
              </div>

              {/* Classes List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.classes.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl border border-[#D9D7D0] bg-[#F7F5F0] hover:border-[#3D6338] transition flex flex-col justify-between space-y-4"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/20 flex-shrink-0">
                        <SafeImage
                          src={c.imageUrl}
                          alt={c.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D8E8D4] text-[#3D6338]">
                            {c.categoryLabel}
                          </span>
                          {c.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3D6338] text-white">
                              {c.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="font-display font-bold text-base text-[#1E1D1B] truncate mt-1">
                          {c.name}
                        </h4>
                        <p className="text-xs text-[#5A5854] truncate">{c.tagline}</p>
                        <div className="text-[11px] text-[#7A9E74] font-semibold mt-1">
                          Instructor: {c.instructorName} • {c.timing}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#D9D7D0]">
                      <button
                        onClick={() => setEditingClass(c)}
                        className="px-3 py-1.5 bg-white hover:bg-[#EFEDE7] text-[#3D6338] border border-[#B5CAB0] rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Details</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${c.name}" class?`)) {
                            deleteClass(c.id);
                            showToast(`Class "${c.name}" deleted.`);
                          }
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-xl transition cursor-pointer"
                        title="Delete class"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INSTRUCTORS & FACULTY */}
          {activeTab === 'instructors' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-4">
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#1E1D1B]">
                    Faculty &amp; Master Choreographers ({data.instructors.length})
                  </h2>
                  <p className="text-xs text-[#5A5854] mt-0.5">
                    Update faculty bios, experience, specialties, personal quotes, and portfolio pictures.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newInst: Instructor = {
                      id: `instructor-${Date.now()}`,
                      name: 'Master Choreographer',
                      role: 'Senior Dance Faculty & Choreographer',
                      experience: '8+ Years Experience',
                      avatarText: 'MC',
                      accentColor: '#3D6338',
                      specialties: ['Bollywood Commercial', 'Urban Street', 'Contemporary Art'],
                      bio: 'Dedicated choreographer with extensive stage and competitive performance expertise.',
                      achievements: [
                        'National dance festival award winner',
                        'Trained top competitive dance ensembles',
                      ],
                      quote: 'Dance is where your spirit finds absolute freedom and rhythm.',
                      classesTaught: ['Bollywood Commercial & Fusion', 'Urban Hip-Hop'],
                      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
                      actionPhotoUrl: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=800&q=80',
                    };
                    addInstructor(newInst);
                    setEditingInstructor(newInst);
                    showToast('New instructor profile created!');
                  }}
                  className="px-4 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Instructor</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.instructors.map((inst) => (
                  <div
                    key={inst.id}
                    className="p-6 bg-[#F7F5F0] rounded-3xl border border-[#D9D7D0] space-y-4 flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <SafeImage
                        src={inst.imageUrl}
                        alt={inst.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#3D6338] shadow-sm flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-display font-bold text-lg text-[#1E1D1B]">{inst.name}</h4>
                        <div className="text-xs text-[#3D6338] font-bold">{inst.role}</div>
                        <div className="text-[11px] text-[#5A5854]">{inst.experience}</div>
                      </div>
                    </div>

                    <p className="text-xs text-[#5A5854] leading-relaxed italic">
                      "{inst.quote}"
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {inst.specialties.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 bg-white text-[#2C2B29] text-[10px] font-semibold rounded-full border border-[#D9D7D0]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#D9D7D0]">
                      <button
                        onClick={() => setEditingInstructor(inst)}
                        className="px-3 py-1.5 bg-white hover:bg-[#EFEDE7] text-[#3D6338] border border-[#B5CAB0] rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete profile of ${inst.name}?`)) {
                            deleteInstructor(inst.id);
                            showToast(`Instructor profile deleted.`);
                          }
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-xl transition cursor-pointer"
                        title="Delete instructor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: WEEKLY SCHEDULE & TIMETABLE */}
          {activeTab === 'schedule' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-4">
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#1E1D1B]">
                    Weekly Schedule Timetable ({data.scheduleSlots.length} Batches)
                  </h2>
                  <p className="text-xs text-[#5A5854] mt-0.5">
                    Configure day, time slots, studio rooms (Alpha / Beta), lead instructors, and capacity limits.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newSlot: ScheduleSlot = {
                      id: `slot-${Date.now()}`,
                      day: 'Monday',
                      time: '06:00 PM – 07:15 PM',
                      className: 'Bollywood Commercial & Fusion',
                      classId: 'bollywood-fusion',
                      level: 'All Levels',
                      instructor: 'Shubham Rajput',
                      studioRoom: 'Studio Alpha (Main)',
                      availableSpots: 5,
                      totalSpots: 24,
                    };
                    addScheduleSlot(newSlot);
                    setEditingSlot(newSlot);
                    showToast('New batch slot added to timetable!');
                  }}
                  className="px-4 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Batch Slot</span>
                </button>
              </div>

              {/* Schedule Slots Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F7F5F0] text-[#5A5854] uppercase text-[10px] tracking-wider border-b border-[#D9D7D0]">
                      <th className="p-3">Day</th>
                      <th className="p-3">Timing</th>
                      <th className="p-3">Class Name</th>
                      <th className="p-3">Studio Room</th>
                      <th className="p-3">Lead Faculty</th>
                      <th className="p-3">Spots</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFEDE7]">
                    {data.scheduleSlots.map((slot) => (
                      <tr key={slot.id} className="hover:bg-[#F7F5F0]/50 transition">
                        <td className="p-3 font-bold text-[#1E1D1B]">{slot.day}</td>
                        <td className="p-3 font-mono text-[#5A5854]">{slot.time}</td>
                        <td className="p-3 font-semibold text-[#1E1D1B]">
                          <div>{slot.className}</div>
                          <div className="text-[10px] text-[#7A9E74]">{slot.level}</div>
                        </td>
                        <td className="p-3 text-[#5A5854]">{slot.studioRoom}</td>
                        <td className="p-3 font-medium text-[#2C2B29]">{slot.instructor}</td>
                        <td className="p-3">
                          <span className="font-bold text-[#3D6338]">{slot.availableSpots}</span>
                          <span className="text-[#9E9B92]"> / {slot.totalSpots}</span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingSlot(slot)}
                              className="p-1.5 text-[#3D6338] hover:bg-[#D8E8D4] rounded-lg transition cursor-pointer"
                              title="Edit slot"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                deleteScheduleSlot(slot.id);
                                showToast('Batch slot removed.');
                              }}
                              className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                              title="Delete slot"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: PRICING & FEE CALCULATOR */}
          {activeTab === 'pricing' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm space-y-6 animate-in fade-in">
              <div className="border-b border-[#EFEDE7] pb-4">
                <h2 className="font-display font-bold text-2xl text-[#1E1D1B]">
                  Fee Structure &amp; Pricing Calculator
                </h2>
                <p className="text-xs text-[#5A5854] mt-0.5">
                  Update base monthly charges, multi-month discount percentages, add-ons (Recital, Private sessions), and guarantee guarantees.
                </p>
              </div>

              {/* Base Tuition */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-base text-[#1E1D1B]">
                  Base Monthly Tuition Fees (₹ / month)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      2 Days / Week (8 classes/mo)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#5A5854]">₹</span>
                      <input
                        type="number"
                        value={data.pricingConfig.baseMonthly2Days}
                        onChange={(e) =>
                          updatePricingConfig({ baseMonthly2Days: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-sm font-bold text-[#1E1D1B] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      3 Days / Week (12 classes/mo)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#5A5854]">₹</span>
                      <input
                        type="number"
                        value={data.pricingConfig.baseMonthly3Days}
                        onChange={(e) =>
                          updatePricingConfig({ baseMonthly3Days: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-sm font-bold text-[#1E1D1B] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      Unlimited All-Access (20+ classes/mo)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#5A5854]">₹</span>
                      <input
                        type="number"
                        value={data.pricingConfig.baseMonthlyUnlimited}
                        onChange={(e) =>
                          updatePricingConfig({ baseMonthlyUnlimited: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-sm font-bold text-[#1E1D1B] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Discounts & Add-ons */}
              <div className="pt-4 border-t border-[#EFEDE7] space-y-4">
                <h3 className="font-display font-bold text-base text-[#1E1D1B]">
                  Discounts &amp; Optional Add-ons
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      Quarterly Discount (%)
                    </label>
                    <input
                      type="number"
                      value={data.pricingConfig.quarterlyDiscountPercent}
                      onChange={(e) =>
                        updatePricingConfig({
                          quarterlyDiscountPercent: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-sm font-bold text-[#1E1D1B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      Annual Discount (%)
                    </label>
                    <input
                      type="number"
                      value={data.pricingConfig.annualDiscountPercent}
                      onChange={(e) =>
                        updatePricingConfig({
                          annualDiscountPercent: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-sm font-bold text-[#1E1D1B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      Sibling Discount (%)
                    </label>
                    <input
                      type="number"
                      value={data.pricingConfig.siblingDiscountPercent}
                      onChange={(e) =>
                        updatePricingConfig({
                          siblingDiscountPercent: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-sm font-bold text-[#1E1D1B] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      Recital Costume &amp; 4K Video Pass (₹)
                    </label>
                    <input
                      type="number"
                      value={data.pricingConfig.recitalPassFee}
                      onChange={(e) =>
                        updatePricingConfig({ recitalPassFee: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-sm font-bold text-[#1E1D1B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      1-on-1 Private Master Coaching Fee (₹ / session)
                    </label>
                    <input
                      type="number"
                      value={data.pricingConfig.privateCoachingFee}
                      onChange={(e) =>
                        updatePricingConfig({ privateCoachingFee: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-sm font-bold text-[#1E1D1B] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Annual Member Gifts Description
                  </label>
                  <input
                    type="text"
                    value={data.pricingConfig.annualGiftsText}
                    onChange={(e) =>
                      updatePricingConfig({ annualGiftsText: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: WORKSHOPS & MASTERCLASSES */}
          {activeTab === 'workshops' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-4">
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#1E1D1B]">
                    Weekend Intensives &amp; Masterclasses ({data.workshops.length})
                  </h2>
                  <p className="text-xs text-[#5A5854] mt-0.5">
                    Add upcoming guest workshops, pricing, seat limits, and promotional tags.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newWorkshop: Workshop = {
                      id: `ws-${Date.now()}`,
                      title: 'Special Weekend Dance Intensive',
                      instructor: 'Shubham Rajput',
                      date: 'Saturday & Sunday, Upcoming',
                      time: '4:00 PM – 7:00 PM',
                      badge: 'New Workshop',
                      spotsLeft: 10,
                      totalSpots: 25,
                      price: 1299,
                      originalPrice: 1999,
                      description: 'Comprehensive masterclass with 4K video shoot and personalized feedback.',
                      tags: ['Video Shoot Included', 'All Levels'],
                      imageUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
                    };
                    addWorkshop(newWorkshop);
                    setEditingWorkshop(newWorkshop);
                    showToast('New workshop created!');
                  }}
                  className="px-4 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Workshop</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.workshops.map((ws) => (
                  <div
                    key={ws.id}
                    className="p-5 bg-[#F7F5F0] rounded-3xl border border-[#D9D7D0] space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-black/20 relative">
                        <SafeImage
                          src={ws.imageUrl}
                          alt={ws.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-[#3D6338] text-white text-[10px] font-bold rounded-full uppercase">
                          {ws.badge}
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-lg text-[#1E1D1B] leading-tight">
                        {ws.title}
                      </h4>
                      <div className="text-xs text-[#7A9E74] font-semibold">
                        Lead: {ws.instructor} • {ws.date} ({ws.time})
                      </div>
                      <p className="text-xs text-[#5A5854]">{ws.description}</p>

                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-[#1E1D1B]">₹{ws.price}</span>
                        <span className="text-xs text-[#9E9B92] line-through">₹{ws.originalPrice}</span>
                        <span className="text-xs font-bold text-[#3D6338]">
                          ({ws.spotsLeft} spots left)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#D9D7D0]">
                      <button
                        onClick={() => setEditingWorkshop(ws)}
                        className="px-3 py-1.5 bg-white hover:bg-[#EFEDE7] text-[#3D6338] border border-[#B5CAB0] rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Workshop</span>
                      </button>
                      <button
                        onClick={() => {
                          deleteWorkshop(ws.id);
                          showToast('Workshop deleted.');
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-xl transition cursor-pointer"
                        title="Delete workshop"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SPECIAL SERVICES (Wedding & Corporate) */}
          {activeTab === 'specialServices' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm space-y-6 animate-in fade-in">
              <div className="border-b border-[#EFEDE7] pb-4">
                <h2 className="font-display font-bold text-2xl text-[#1E1D1B]">
                  Wedding Sangeet &amp; Special Events ({data.specialServices.length})
                </h2>
                <p className="text-xs text-[#5A5854] mt-0.5">
                  Update customized packages for Wedding Sangeet, Corporate Events, and Troupe performances.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.specialServices.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-5 bg-[#F7F5F0] rounded-3xl border border-[#D9D7D0] space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-black/20">
                        <SafeImage
                          src={svc.image}
                          alt={svc.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 bg-[#3D6338] text-white rounded-full font-bold uppercase">
                        {svc.category}
                      </span>
                      <h4 className="font-display font-bold text-base text-[#1E1D1B]">
                        {svc.title}
                      </h4>
                      <p className="text-xs text-[#5A5854]">{svc.description}</p>
                    </div>

                    <button
                      onClick={() => setEditingSpecialService(svc)}
                      className="w-full py-2 bg-white hover:bg-[#EFEDE7] text-[#3D6338] border border-[#B5CAB0] rounded-xl text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Service Package</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: STUDIO TOUR & AMENITIES */}
          {activeTab === 'amenities' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm space-y-6 animate-in fade-in">
              <div className="border-b border-[#EFEDE7] pb-4">
                <h2 className="font-display font-bold text-2xl text-[#1E1D1B]">
                  Studio Infrastructure &amp; Amenities ({data.amenities.length})
                </h2>
                <p className="text-xs text-[#5A5854] mt-0.5">
                  Showcase sprung flooring, JBL acoustics, mirror walls, and ventilation technology on Hanshoura Road.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.amenities.map((a) => (
                  <div
                    key={a.id}
                    className="p-5 bg-[#F7F5F0] rounded-3xl border border-[#D9D7D0] space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="aspect-video rounded-2xl overflow-hidden bg-black/20">
                        <SafeImage
                          src={a.imageUrl}
                          alt={a.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#1E1D1B]">{a.title}</h4>
                      <p className="text-xs text-[#5A5854]">{a.description}</p>
                    </div>

                    <button
                      onClick={() => setEditingAmenity(a)}
                      className="w-full py-1.5 bg-white hover:bg-[#EFEDE7] text-[#3D6338] border border-[#B5CAB0] rounded-xl text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Amenity</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: TESTIMONIALS & REVIEWS */}
          {activeTab === 'testimonials' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-4">
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#1E1D1B]">
                    Student &amp; Parent Reviews ({data.testimonials.length})
                  </h2>
                  <p className="text-xs text-[#5A5854] mt-0.5">
                    Add verified feedback, 5-star ratings, student avatars, and enrolled batches.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newTestimonial: Testimonial = {
                      id: `t-${Date.now()}`,
                      name: 'Student Dancer Name',
                      role: 'Adult Beginner Dancer',
                      category: 'adult',
                      stars: 5,
                      comment: 'The training environment on Hanshoura Road is outstanding! Highly recommended for beginners.',
                      avatarText: 'SD',
                      bgGradient: 'from-[#3D6338] to-[#7A9E74]',
                      yearsWithStudio: '1 Year Enrolled',
                      enrolledClass: 'Bollywood Commercial & Fusion',
                      avatarImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
                    };
                    addTestimonial(newTestimonial);
                    setEditingTestimonial(newTestimonial);
                    showToast('New review card created!');
                  }}
                  className="px-4 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-6 bg-[#F7F5F0] rounded-3xl border border-[#D9D7D0] space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex text-amber-500 gap-0.5 text-sm">
                        {'★'.repeat(t.stars)}
                      </div>
                      <p className="text-xs text-[#2C2B29] italic leading-relaxed">
                        "{t.comment}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#D9D7D0]">
                      <div className="flex items-center gap-3">
                        {t.avatarImageUrl && (
                          <SafeImage
                            src={t.avatarImageUrl}
                            alt={t.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#D9D7D0]"
                          />
                        )}
                        <div>
                          <div className="font-display font-bold text-sm text-[#1E1D1B]">{t.name}</div>
                          <div className="text-[10px] text-[#5A5854]">{t.enrolledClass}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingTestimonial(t)}
                          className="p-1.5 text-[#3D6338] hover:bg-[#D8E8D4] rounded-lg transition cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            deleteTestimonial(t.id);
                            showToast('Review deleted.');
                          }}
                          className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: FAQS & HELPDESK */}
          {activeTab === 'faqs' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-4">
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#1E1D1B]">
                    Frequently Asked Questions ({data.faqs.length})
                  </h2>
                  <p className="text-xs text-[#5A5854] mt-0.5">
                    Update student questions, trial guidelines, dress code, and admissions policies.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newFaq: FaqItem = {
                      id: `faq-${Date.now()}`,
                      question: 'New Question for Studio Desk?',
                      category: 'General',
                      answer: 'Clear and helpful answer provided by our admissions desk.',
                    };
                    addFaq(newFaq);
                    setEditingFaq(newFaq);
                    showToast('New FAQ item added!');
                  }}
                  className="px-4 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="p-4 bg-[#F7F5F0] rounded-2xl border border-[#D9D7D0] space-y-2 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-[#D8E8D4] text-[#3D6338] rounded-full">
                        {faq.category}
                      </span>
                      <h4 className="font-display font-bold text-sm text-[#1E1D1B]">
                        {faq.question}
                      </h4>
                      <p className="text-xs text-[#5A5854] leading-relaxed">{faq.answer}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingFaq(faq)}
                        className="p-1.5 text-[#3D6338] hover:bg-[#D8E8D4] rounded-lg transition cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          deleteFaq(faq.id);
                          showToast('FAQ deleted.');
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: SECURITY & ADMIN AUTH SETTINGS */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9D7D0] shadow-sm space-y-6 animate-in fade-in">
              <div className="border-b border-[#EFEDE7] pb-4">
                <h2 className="font-display font-bold text-2xl text-[#1E1D1B]">
                  Admin Credentials &amp; Security Controls
                </h2>
                <p className="text-xs text-[#5A5854] mt-0.5">
                  Update your admin login email, change master passcode, and manage authentication persistence.
                </p>
              </div>

              <form onSubmit={handleSaveSecurity} className="max-w-xl space-y-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                    Current Passcode *
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassInput}
                    onChange={(e) => setCurrentPassInput(e.target.value)}
                    placeholder="Enter current passcode (e.g. admin)"
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      New Passcode *
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassInput}
                      onChange={(e) => setNewPassInput(e.target.value)}
                      placeholder="Min 4 characters"
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#5A5854] block mb-1">
                      Confirm New Passcode *
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmNewPassInput}
                      onChange={(e) => setConfirmNewPassInput(e.target.value)}
                      placeholder="Re-type new passcode"
                      className="w-full px-3.5 py-2.5 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] text-xs text-[#1E1D1B] outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 bg-[#3D6338] hover:bg-[#2F4E2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Admin Passcode</span>
                </button>
              </form>

              <div className="pt-6 border-t border-[#EFEDE7]">
                <div className="p-4 bg-[#F7F5F0] rounded-2xl border border-[#D9D7D0] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1E1D1B]">
                    <ShieldCheck className="w-4 h-4 text-[#3D6338]" />
                    <span>Current Access Policy</span>
                  </div>
                  <p className="text-xs text-[#5A5854]">
                    The Admin route is strictly gated behind password authentication. Unauthorized users cannot view or edit any content. Changes made here persist across all visitors.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sticky Bottom Save Action Bar */}
          <div className="sticky bottom-5 z-30 mt-6 bg-[#1E1D1B] text-white p-4 rounded-3xl shadow-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#25D366] animate-pulse" />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Merrick CMS Control</span>
                  <span className="text-[10px] text-[#B5CAB0] font-normal">· Instant Live Sync</span>
                </div>
                <div className="text-[11px] text-[#9E9B92]">
                  Click Save Changes to write all modifications and publish to live website.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleSaveAllChanges}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <Check className="w-4 h-4 text-white animate-bounce" />
                    <span>Saved to Live Site!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-white" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onBackToSite}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-[#D8E8D4] text-xs font-semibold rounded-2xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Live Site</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* EDITING DIALOG: CLASS */}
      {editingClass && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#D9D7D0] max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4 animate-in zoom-in-95 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-3">
              <h3 className="font-display font-bold text-xl text-[#1E1D1B]">
                Edit Dance Class: {editingClass.name}
              </h3>
              <button
                onClick={() => setEditingClass(null)}
                className="p-1.5 text-[#5A5854] hover:text-[#1E1D1B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <ImageHelper
                label="Class Cover Photo URL"
                value={editingClass.imageUrl}
                onChange={(url) => setEditingClass({ ...editingClass, imageUrl: url })}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Class Name</label>
                  <input
                    type="text"
                    value={editingClass.name}
                    onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Category Label</label>
                  <input
                    type="text"
                    value={editingClass.categoryLabel}
                    onChange={(e) =>
                      setEditingClass({ ...editingClass, categoryLabel: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingClass.tagline}
                  onChange={(e) => setEditingClass({ ...editingClass, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingClass.description}
                  onChange={(e) =>
                    setEditingClass({ ...editingClass, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Full Curriculum Description</label>
                <textarea
                  rows={3}
                  value={editingClass.fullDescription}
                  onChange={(e) =>
                    setEditingClass({ ...editingClass, fullDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Instructor Name</label>
                  <input
                    type="text"
                    value={editingClass.instructorName}
                    onChange={(e) =>
                      setEditingClass({ ...editingClass, instructorName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Schedule Days</label>
                  <input
                    type="text"
                    value={editingClass.scheduleDays}
                    onChange={(e) =>
                      setEditingClass({ ...editingClass, scheduleDays: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Timing</label>
                  <input
                    type="text"
                    value={editingClass.timing}
                    onChange={(e) => setEditingClass({ ...editingClass, timing: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Calories Burn</label>
                  <input
                    type="text"
                    value={editingClass.caloriesBurn}
                    onChange={(e) =>
                      setEditingClass({ ...editingClass, caloriesBurn: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Badge (e.g. Most Popular)</label>
                  <input
                    type="text"
                    value={editingClass.badge || ''}
                    onChange={(e) => setEditingClass({ ...editingClass, badge: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFEDE7]">
              <button
                type="button"
                onClick={() => setEditingClass(null)}
                className="px-4 py-2 text-xs font-semibold text-[#5A5854] hover:bg-[#F7F5F0] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateClass(editingClass.id, editingClass);
                  setEditingClass(null);
                  showToast('Class updated successfully!');
                }}
                className="px-5 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm cursor-pointer"
              >
                Save Class Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDITING DIALOG: INSTRUCTOR */}
      {editingInstructor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#D9D7D0] max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4 animate-in zoom-in-95 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-3">
              <h3 className="font-display font-bold text-xl text-[#1E1D1B]">
                Edit Instructor: {editingInstructor.name}
              </h3>
              <button
                onClick={() => setEditingInstructor(null)}
                className="p-1.5 text-[#5A5854] hover:text-[#1E1D1B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImageHelper
                  label="Portrait Image URL"
                  value={editingInstructor.imageUrl}
                  aspectRatio="portrait"
                  onChange={(url) =>
                    setEditingInstructor({ ...editingInstructor, imageUrl: url })
                  }
                />
                <ImageHelper
                  label="Action Photo URL"
                  value={editingInstructor.actionPhotoUrl}
                  aspectRatio="video"
                  onChange={(url) =>
                    setEditingInstructor({ ...editingInstructor, actionPhotoUrl: url })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editingInstructor.name}
                    onChange={(e) =>
                      setEditingInstructor({ ...editingInstructor, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Experience</label>
                  <input
                    type="text"
                    value={editingInstructor.experience}
                    onChange={(e) =>
                      setEditingInstructor({ ...editingInstructor, experience: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Role Title</label>
                <input
                  type="text"
                  value={editingInstructor.role}
                  onChange={(e) =>
                    setEditingInstructor({ ...editingInstructor, role: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Biography</label>
                <textarea
                  rows={3}
                  value={editingInstructor.bio}
                  onChange={(e) =>
                    setEditingInstructor({ ...editingInstructor, bio: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Inspirational Quote</label>
                <input
                  type="text"
                  value={editingInstructor.quote}
                  onChange={(e) =>
                    setEditingInstructor({ ...editingInstructor, quote: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFEDE7]">
              <button
                type="button"
                onClick={() => setEditingInstructor(null)}
                className="px-4 py-2 text-xs font-semibold text-[#5A5854] hover:bg-[#F7F5F0] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateInstructor(editingInstructor.id, editingInstructor);
                  setEditingInstructor(null);
                  showToast('Instructor updated successfully!');
                }}
                className="px-5 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm cursor-pointer"
              >
                Save Instructor Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDITING DIALOG: SCHEDULE SLOT */}
      {editingSlot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#D9D7D0] max-w-lg w-full p-6 sm:p-8 space-y-4 animate-in zoom-in-95 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-3">
              <h3 className="font-display font-bold text-xl text-[#1E1D1B]">
                Edit Batch Slot
              </h3>
              <button
                onClick={() => setEditingSlot(null)}
                className="p-1.5 text-[#5A5854] hover:text-[#1E1D1B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Day of the Week</label>
                  <select
                    value={editingSlot.day}
                    onChange={(e) =>
                      setEditingSlot({ ...editingSlot, day: e.target.value as any })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                      (d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Studio Room</label>
                  <select
                    value={editingSlot.studioRoom}
                    onChange={(e) =>
                      setEditingSlot({ ...editingSlot, studioRoom: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  >
                    <option value="Studio Alpha (Main)">Studio Alpha (Main)</option>
                    <option value="Studio Beta (Acoustic)">Studio Beta (Acoustic)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Batch Class Name</label>
                <input
                  type="text"
                  value={editingSlot.className}
                  onChange={(e) => setEditingSlot({ ...editingSlot, className: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Batch Time</label>
                  <input
                    type="text"
                    value={editingSlot.time}
                    onChange={(e) => setEditingSlot({ ...editingSlot, time: e.target.value })}
                    placeholder="06:00 PM – 07:15 PM"
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Lead Instructor</label>
                  <input
                    type="text"
                    value={editingSlot.instructor}
                    onChange={(e) => setEditingSlot({ ...editingSlot, instructor: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Available Trial Spots</label>
                  <input
                    type="number"
                    value={editingSlot.availableSpots}
                    onChange={(e) =>
                      setEditingSlot({ ...editingSlot, availableSpots: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Total Max Capacity</label>
                  <input
                    type="number"
                    value={editingSlot.totalSpots}
                    onChange={(e) =>
                      setEditingSlot({ ...editingSlot, totalSpots: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFEDE7]">
              <button
                type="button"
                onClick={() => setEditingSlot(null)}
                className="px-4 py-2 text-xs font-semibold text-[#5A5854] hover:bg-[#F7F5F0] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateScheduleSlot(editingSlot.id, editingSlot);
                  setEditingSlot(null);
                  showToast('Batch slot updated!');
                }}
                className="px-5 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm cursor-pointer"
              >
                Save Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDITING DIALOG: WORKSHOP */}
      {editingWorkshop && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#D9D7D0] max-w-xl w-full p-6 sm:p-8 space-y-4 animate-in zoom-in-95 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-3">
              <h3 className="font-display font-bold text-xl text-[#1E1D1B]">
                Edit Workshop
              </h3>
              <button
                onClick={() => setEditingWorkshop(null)}
                className="p-1.5 text-[#5A5854] hover:text-[#1E1D1B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <ImageHelper
                label="Workshop Banner Image URL"
                value={editingWorkshop.imageUrl}
                onChange={(url) => setEditingWorkshop({ ...editingWorkshop, imageUrl: url })}
              />

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Title</label>
                <input
                  type="text"
                  value={editingWorkshop.title}
                  onChange={(e) =>
                    setEditingWorkshop({ ...editingWorkshop, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Instructor</label>
                  <input
                    type="text"
                    value={editingWorkshop.instructor}
                    onChange={(e) =>
                      setEditingWorkshop({ ...editingWorkshop, instructor: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Badge</label>
                  <input
                    type="text"
                    value={editingWorkshop.badge}
                    onChange={(e) =>
                      setEditingWorkshop({ ...editingWorkshop, badge: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Date</label>
                  <input
                    type="text"
                    value={editingWorkshop.date}
                    onChange={(e) => setEditingWorkshop({ ...editingWorkshop, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Time</label>
                  <input
                    type="text"
                    value={editingWorkshop.time}
                    onChange={(e) => setEditingWorkshop({ ...editingWorkshop, time: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Early-Bird Fee (₹)</label>
                  <input
                    type="number"
                    value={editingWorkshop.price}
                    onChange={(e) =>
                      setEditingWorkshop({ ...editingWorkshop, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editingWorkshop.originalPrice}
                    onChange={(e) =>
                      setEditingWorkshop({
                        ...editingWorkshop,
                        originalPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingWorkshop.description}
                  onChange={(e) =>
                    setEditingWorkshop({ ...editingWorkshop, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFEDE7]">
              <button
                type="button"
                onClick={() => setEditingWorkshop(null)}
                className="px-4 py-2 text-xs font-semibold text-[#5A5854] hover:bg-[#F7F5F0] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateWorkshop(editingWorkshop.id, editingWorkshop);
                  setEditingWorkshop(null);
                  showToast('Workshop updated successfully!');
                }}
                className="px-5 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm cursor-pointer"
              >
                Save Workshop
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDITING DIALOG: SPECIAL SERVICES */}
      {editingSpecialService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#D9D7D0] max-w-lg w-full p-6 sm:p-8 space-y-4 animate-in zoom-in-95 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-3">
              <h3 className="font-display font-bold text-xl text-[#1E1D1B]">
                Edit Special Service Package
              </h3>
              <button
                onClick={() => setEditingSpecialService(null)}
                className="p-1.5 text-[#5A5854] hover:text-[#1E1D1B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <ImageHelper
                label="Package Photo URL"
                value={editingSpecialService.image}
                onChange={(url) =>
                  setEditingSpecialService({ ...editingSpecialService, image: url })
                }
              />

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Package Title</label>
                <input
                  type="text"
                  value={editingSpecialService.title}
                  onChange={(e) =>
                    setEditingSpecialService({ ...editingSpecialService, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Category Badge</label>
                <input
                  type="text"
                  value={editingSpecialService.category}
                  onChange={(e) =>
                    setEditingSpecialService({ ...editingSpecialService, category: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingSpecialService.description}
                  onChange={(e) =>
                    setEditingSpecialService({
                      ...editingSpecialService,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFEDE7]">
              <button
                type="button"
                onClick={() => setEditingSpecialService(null)}
                className="px-4 py-2 text-xs font-semibold text-[#5A5854] hover:bg-[#F7F5F0] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateSpecialService(editingSpecialService.id, editingSpecialService);
                  setEditingSpecialService(null);
                  showToast('Service package updated!');
                }}
                className="px-5 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm cursor-pointer"
              >
                Save Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDITING DIALOG: AMENITY */}
      {editingAmenity && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#D9D7D0] max-w-lg w-full p-6 sm:p-8 space-y-4 animate-in zoom-in-95 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-3">
              <h3 className="font-display font-bold text-xl text-[#1E1D1B]">
                Edit Studio Amenity
              </h3>
              <button
                onClick={() => setEditingAmenity(null)}
                className="p-1.5 text-[#5A5854] hover:text-[#1E1D1B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <ImageHelper
                label="Amenity Photo URL"
                value={editingAmenity.imageUrl}
                onChange={(url) => setEditingAmenity({ ...editingAmenity, imageUrl: url })}
              />

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Amenity Title</label>
                <input
                  type="text"
                  value={editingAmenity.title}
                  onChange={(e) =>
                    setEditingAmenity({ ...editingAmenity, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingAmenity.description}
                  onChange={(e) =>
                    setEditingAmenity({ ...editingAmenity, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFEDE7]">
              <button
                type="button"
                onClick={() => setEditingAmenity(null)}
                className="px-4 py-2 text-xs font-semibold text-[#5A5854] hover:bg-[#F7F5F0] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateAmenity(editingAmenity.id, editingAmenity);
                  setEditingAmenity(null);
                  showToast('Amenity updated!');
                }}
                className="px-5 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm cursor-pointer"
              >
                Save Amenity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDITING DIALOG: TESTIMONIAL */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#D9D7D0] max-w-lg w-full p-6 sm:p-8 space-y-4 animate-in zoom-in-95 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-3">
              <h3 className="font-display font-bold text-xl text-[#1E1D1B]">
                Edit Review
              </h3>
              <button
                onClick={() => setEditingTestimonial(null)}
                className="p-1.5 text-[#5A5854] hover:text-[#1E1D1B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <ImageHelper
                label="Reviewer Photo URL (Optional)"
                value={editingTestimonial.avatarImageUrl || ''}
                aspectRatio="square"
                onChange={(url) =>
                  setEditingTestimonial({ ...editingTestimonial, avatarImageUrl: url })
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Student / Parent Name</label>
                  <input
                    type="text"
                    value={editingTestimonial.name}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5A5854] block mb-1">Star Rating (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={editingTestimonial.stars}
                    onChange={(e) =>
                      setEditingTestimonial({
                        ...editingTestimonial,
                        stars: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Role / Description</label>
                <input
                  type="text"
                  value={editingTestimonial.role}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, role: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Enrolled Class</label>
                <input
                  type="text"
                  value={editingTestimonial.enrolledClass}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      enrolledClass: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Review Comment</label>
                <textarea
                  rows={4}
                  value={editingTestimonial.comment}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, comment: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFEDE7]">
              <button
                type="button"
                onClick={() => setEditingTestimonial(null)}
                className="px-4 py-2 text-xs font-semibold text-[#5A5854] hover:bg-[#F7F5F0] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateTestimonial(editingTestimonial.id, editingTestimonial);
                  setEditingTestimonial(null);
                  showToast('Review updated!');
                }}
                className="px-5 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm cursor-pointer"
              >
                Save Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDITING DIALOG: FAQ */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#D9D7D0] max-w-lg w-full p-6 sm:p-8 space-y-4 animate-in zoom-in-95 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EFEDE7] pb-3">
              <h3 className="font-display font-bold text-xl text-[#1E1D1B]">
                Edit FAQ Item
              </h3>
              <button
                onClick={() => setEditingFaq(null)}
                className="p-1.5 text-[#5A5854] hover:text-[#1E1D1B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Category</label>
                <input
                  type="text"
                  value={editingFaq.category}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  placeholder="e.g. Fees, Attendance, Attire"
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Question</label>
                <input
                  type="text"
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-[#5A5854] block mb-1">Answer</label>
                <textarea
                  rows={4}
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#D9D7D0] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFEDE7]">
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="px-4 py-2 text-xs font-semibold text-[#5A5854] hover:bg-[#F7F5F0] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateFaq(editingFaq.id, editingFaq);
                  setEditingFaq(null);
                  showToast('FAQ updated!');
                }}
                className="px-5 py-2.5 bg-[#3D6338] hover:bg-[#2F4E2B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm cursor-pointer"
              >
                Save FAQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1D1B] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#3D6338] flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <div className="w-6 h-6 rounded-full bg-[#3D6338] text-white flex items-center justify-center flex-shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
