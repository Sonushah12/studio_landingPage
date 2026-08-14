import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudioFullData,
  StudioGeneralInfo,
  HeroConfig,
  DanceClass,
  Instructor,
  ScheduleSlot,
  Testimonial,
  Workshop,
  SpecialService,
  StudioAmenity,
  FaqItem,
  PricingConfig,
} from '../types';
import { INITIAL_STUDIO_DATA } from '../data/studioData';

const CMS_STORAGE_KEY = 'MERRICK_STUDIO_CMS_DATA_V2';

interface StudioDataContextType {
  data: StudioFullData;
  // Section updaters
  updateGeneralInfo: (info: Partial<StudioGeneralInfo>) => void;
  updateHeroConfig: (config: Partial<HeroConfig>) => void;
  updatePricingConfig: (pricing: Partial<PricingConfig>) => void;
  // Classes CRUD
  addClass: (newClass: DanceClass) => void;
  updateClass: (id: string, updated: Partial<DanceClass>) => void;
  deleteClass: (id: string) => void;
  // Instructors CRUD
  addInstructor: (newInstructor: Instructor) => void;
  updateInstructor: (id: string, updated: Partial<Instructor>) => void;
  deleteInstructor: (id: string) => void;
  // Schedule Slots CRUD
  addScheduleSlot: (newSlot: ScheduleSlot) => void;
  updateScheduleSlot: (id: string, updated: Partial<ScheduleSlot>) => void;
  deleteScheduleSlot: (id: string) => void;
  // Workshops CRUD
  addWorkshop: (newWorkshop: Workshop) => void;
  updateWorkshop: (id: string, updated: Partial<Workshop>) => void;
  deleteWorkshop: (id: string) => void;
  // Special Services CRUD
  addSpecialService: (service: SpecialService) => void;
  updateSpecialService: (id: string, updated: Partial<SpecialService>) => void;
  deleteSpecialService: (id: string) => void;
  // Amenities CRUD
  updateAmenity: (id: string, updated: Partial<StudioAmenity>) => void;
  addAmenity: (amenity: StudioAmenity) => void;
  deleteAmenity: (id: string) => void;
  // Testimonials CRUD
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, updated: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  // FAQs CRUD
  addFaq: (faq: FaqItem) => void;
  updateFaq: (id: string, updated: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  // Global actions
  resetToFactoryDefaults: () => void;
  importBackupData: (importedData: StudioFullData) => { success: boolean; message: string };
  exportBackupData: () => string;
  saveAllChanges: () => void;
  lastSavedAt: Date | null;
}

const StudioDataContext = createContext<StudioDataContextType | undefined>(undefined);

export const StudioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<StudioFullData>(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure all required fields exist
        return {
          ...INITIAL_STUDIO_DATA,
          ...parsed,
          generalInfo: {
            ...INITIAL_STUDIO_DATA.generalInfo,
            ...(parsed.generalInfo || {}),
            stats: {
              ...INITIAL_STUDIO_DATA.generalInfo.stats,
              ...(parsed.generalInfo?.stats || {}),
            },
            socialLinks: {
              ...INITIAL_STUDIO_DATA.generalInfo.socialLinks,
              ...(parsed.generalInfo?.socialLinks || {}),
            },
            address:
              parsed.generalInfo?.address ||
              parsed.generalInfo?.fullAddress ||
              INITIAL_STUDIO_DATA.generalInfo.address ||
              INITIAL_STUDIO_DATA.generalInfo.fullAddress,
          },
          heroConfig: { ...INITIAL_STUDIO_DATA.heroConfig, ...(parsed.heroConfig || {}) },
          pricingConfig: { ...INITIAL_STUDIO_DATA.pricingConfig, ...(parsed.pricingConfig || {}) },
        };
      }
    } catch (e) {
      console.warn('Failed to parse CMS data from localStorage, using defaults', e);
    }
    return INITIAL_STUDIO_DATA;
  });

  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(new Date());

  // Save to localStorage whenever data changes
  const saveState = (nextData: StudioFullData) => {
    setData(nextData);
    setLastSavedAt(new Date());
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(nextData));
    } catch (e) {
      console.error('Failed to save CMS data to localStorage', e);
    }
  };

  const saveAllChanges = () => {
    setLastSavedAt(new Date());
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save CMS data to localStorage', e);
    }
  };

  const updateGeneralInfo = (info: Partial<StudioGeneralInfo>) => {
    const rawUpdated = {
      ...data.generalInfo,
      ...info,
      stats: {
        ...data.generalInfo.stats,
        ...(info.stats || {}),
      },
    };

    // Keep address in sync
    const addressParts = [
      rawUpdated.addressLine1,
      rawUpdated.addressLine2,
      rawUpdated.city,
      rawUpdated.state,
      rawUpdated.pincode,
    ].filter(Boolean);

    const computedAddress = addressParts.length > 0 ? addressParts.join(', ') : rawUpdated.address;
    if (computedAddress) {
      rawUpdated.fullAddress = computedAddress;
      rawUpdated.address = computedAddress;
    }

    // Keep stats aliases in sync
    if (rawUpdated.stats) {
      rawUpdated.stats.studentsCount = rawUpdated.stats.studentsTrained || rawUpdated.stats.studentsCount;
      rawUpdated.stats.yearsExp = rawUpdated.stats.yearsOfExcellence || rawUpdated.stats.yearsExp;
      rawUpdated.stats.choreographersCount = rawUpdated.stats.danceDisciplines || rawUpdated.stats.choreographersCount;
      rawUpdated.stats.productionsCount = rawUpdated.stats.reviewsCount || rawUpdated.stats.productionsCount;
    }

    // Keep operating hours alias in sync
    if (rawUpdated.operatingHoursWeekend && !rawUpdated.operatingHoursSunday) {
      rawUpdated.operatingHoursSunday = rawUpdated.operatingHoursWeekend;
    }

    const next = {
      ...data,
      generalInfo: rawUpdated,
    };
    saveState(next);
  };

  const updateHeroConfig = (config: Partial<HeroConfig>) => {
    const next = {
      ...data,
      heroConfig: {
        ...data.heroConfig,
        ...config,
      },
    };
    saveState(next);
  };

  const updatePricingConfig = (pricing: Partial<PricingConfig>) => {
    const next = {
      ...data,
      pricingConfig: {
        ...data.pricingConfig,
        ...pricing,
      },
    };
    saveState(next);
  };

  // Classes
  const addClass = (newClass: DanceClass) => {
    const next = { ...data, classes: [newClass, ...data.classes] };
    saveState(next);
  };

  const updateClass = (id: string, updated: Partial<DanceClass>) => {
    const next = {
      ...data,
      classes: data.classes.map((c) => (c.id === id ? { ...c, ...updated } : c)),
    };
    saveState(next);
  };

  const deleteClass = (id: string) => {
    const next = {
      ...data,
      classes: data.classes.filter((c) => c.id !== id),
    };
    saveState(next);
  };

  // Instructors
  const addInstructor = (newInstructor: Instructor) => {
    const next = { ...data, instructors: [...data.instructors, newInstructor] };
    saveState(next);
  };

  const updateInstructor = (id: string, updated: Partial<Instructor>) => {
    const next = {
      ...data,
      instructors: data.instructors.map((inst) => (inst.id === id ? { ...inst, ...updated } : inst)),
    };
    saveState(next);
  };

  const deleteInstructor = (id: string) => {
    const next = {
      ...data,
      instructors: data.instructors.filter((inst) => inst.id !== id),
    };
    saveState(next);
  };

  // Schedule Slots
  const addScheduleSlot = (newSlot: ScheduleSlot) => {
    const next = { ...data, scheduleSlots: [...data.scheduleSlots, newSlot] };
    saveState(next);
  };

  const updateScheduleSlot = (id: string, updated: Partial<ScheduleSlot>) => {
    const next = {
      ...data,
      scheduleSlots: data.scheduleSlots.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    };
    saveState(next);
  };

  const deleteScheduleSlot = (id: string) => {
    const next = {
      ...data,
      scheduleSlots: data.scheduleSlots.filter((s) => s.id !== id),
    };
    saveState(next);
  };

  // Workshops
  const addWorkshop = (newWorkshop: Workshop) => {
    const next = { ...data, workshops: [...data.workshops, newWorkshop] };
    saveState(next);
  };

  const updateWorkshop = (id: string, updated: Partial<Workshop>) => {
    const next = {
      ...data,
      workshops: data.workshops.map((w) => (w.id === id ? { ...w, ...updated } : w)),
    };
    saveState(next);
  };

  const deleteWorkshop = (id: string) => {
    const next = {
      ...data,
      workshops: data.workshops.filter((w) => w.id !== id),
    };
    saveState(next);
  };

  // Special Services
  const addSpecialService = (service: SpecialService) => {
    const next = { ...data, specialServices: [...data.specialServices, service] };
    saveState(next);
  };

  const updateSpecialService = (id: string, updated: Partial<SpecialService>) => {
    const next = {
      ...data,
      specialServices: data.specialServices.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    };
    saveState(next);
  };

  const deleteSpecialService = (id: string) => {
    const next = {
      ...data,
      specialServices: data.specialServices.filter((s) => s.id !== id),
    };
    saveState(next);
  };

  // Amenities
  const updateAmenity = (id: string, updated: Partial<StudioAmenity>) => {
    const next = {
      ...data,
      amenities: data.amenities.map((a) => (a.id === id ? { ...a, ...updated } : a)),
    };
    saveState(next);
  };

  const addAmenity = (amenity: StudioAmenity) => {
    const next = { ...data, amenities: [...data.amenities, amenity] };
    saveState(next);
  };

  const deleteAmenity = (id: string) => {
    const next = {
      ...data,
      amenities: data.amenities.filter((a) => a.id !== id),
    };
    saveState(next);
  };

  // Testimonials
  const addTestimonial = (testimonial: Testimonial) => {
    const next = { ...data, testimonials: [testimonial, ...data.testimonials] };
    saveState(next);
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    const next = {
      ...data,
      testimonials: data.testimonials.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    };
    saveState(next);
  };

  const deleteTestimonial = (id: string) => {
    const next = {
      ...data,
      testimonials: data.testimonials.filter((t) => t.id !== id),
    };
    saveState(next);
  };

  // FAQs
  const addFaq = (faq: FaqItem) => {
    const next = { ...data, faqs: [...data.faqs, faq] };
    saveState(next);
  };

  const updateFaq = (id: string, updated: Partial<FaqItem>) => {
    const next = {
      ...data,
      faqs: data.faqs.map((f) => (f.id === id ? { ...f, ...updated } : f)),
    };
    saveState(next);
  };

  const deleteFaq = (id: string) => {
    const next = {
      ...data,
      faqs: data.faqs.filter((f) => f.id !== id),
    };
    saveState(next);
  };

  // Reset to Factory Defaults
  const resetToFactoryDefaults = () => {
    saveState(INITIAL_STUDIO_DATA);
  };

  // Export JSON
  const exportBackupData = () => {
    return JSON.stringify(data, null, 2);
  };

  // Import JSON
  const importBackupData = (importedData: StudioFullData) => {
    try {
      if (!importedData.generalInfo || !Array.isArray(importedData.classes)) {
        return { success: false, message: 'Invalid studio data backup structure.' };
      }
      saveState(importedData);
      return { success: true, message: 'Studio data restored and synced successfully!' };
    } catch (e) {
      return { success: false, message: 'Failed to import JSON data.' };
    }
  };

  return (
    <StudioDataContext.Provider
      value={{
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
      }}
    >
      {children}
    </StudioDataContext.Provider>
  );
};

export const useStudioData = () => {
  const context = useContext(StudioDataContext);
  if (!context) {
    throw new Error('useStudioData must be used within a StudioDataProvider');
  }
  return context;
};
