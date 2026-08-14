export interface StudioStats {
  studentsTrained: string;
  yearsOfExcellence: string;
  googleRating: string;
  reviewsCount: string;
  danceDisciplines: string;
  studentsCount?: string;
  yearsExp?: string;
  choreographersCount?: string;
  productionsCount?: string;
}

export interface StudioGeneralInfo {
  studioName: string;
  tagline: string;
  subtagline: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  fullAddress: string;
  address?: string;
  operatingHoursWeekday: string;
  operatingHoursWeekend: string;
  operatingHoursSunday?: string;
  announcementBarText: string;
  announcementBarEnabled: boolean;
  announcementBarLinkText: string;
  announcementBarLinkUrl: string;
  stats: StudioStats;
  googleMapsUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
  logoUrl?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  badge: string;
}

export interface HeroConfig {
  badgeText: string;
  mainHeadline1: string;
  mainHeadlineHighlight: string;
  mainHeadline2: string;
  subDescription: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  bannerNotice: string;
  slides: HeroSlide[];
}

export interface DanceClass {
  id: string;
  name: string;
  category: 'bollywood' | 'classical' | 'urban' | 'latin' | 'contemporary' | 'kids' | 'events';
  categoryLabel: string;
  tagline: string;
  description: string;
  fullDescription: string;
  level: string;
  ageGroup: string;
  scheduleDays: string;
  timing: string;
  instructorName: string;
  instructorId: string;
  accentColor: string;
  lightColor: string;
  badge?: string;
  curriculumHighlights: string[];
  prerequisites: string;
  caloriesBurn: string;
  soundRhythmType: 'bollywood' | 'classical' | 'hiphop' | 'salsa' | 'contemporary' | 'kids';
  imageUrl: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  experience: string;
  avatarText: string;
  accentColor: string;
  specialties: string[];
  bio: string;
  achievements: string[];
  quote: string;
  classesTaught: string[];
  imageUrl: string;
  actionPhotoUrl: string;
}

export interface ScheduleSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  className: string;
  classId: string;
  level: string;
  instructor: string;
  studioRoom: string;
  availableSpots: number;
  totalSpots: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  category: 'kids' | 'adult' | 'classical' | 'contemporary' | 'wedding';
  stars: number;
  comment: string;
  avatarText: string;
  bgGradient: string;
  yearsWithStudio: string;
  enrolledClass: string;
  avatarImageUrl?: string;
}

export interface Workshop {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  badge: string;
  spotsLeft: number;
  totalSpots: number;
  price: number;
  originalPrice: number;
  description: string;
  tags: string[];
  imageUrl: string;
}

export interface SpecialService {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  points: string[];
  btnText: string;
  btnAction: string;
}

export interface StudioAmenity {
  id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  category: string;
  answer: string;
}

export interface PricingConfig {
  baseMonthly2Days: number;
  baseMonthly3Days: number;
  baseMonthlyUnlimited: number;
  quarterlyDiscountPercent: number;
  annualDiscountPercent: number;
  siblingDiscountPercent: number;
  recitalPassFee: number;
  privateCoachingFee: number;
  annualGiftsText: string;
  guaranteeNotice: string;
}

export interface StudioFullData {
  generalInfo: StudioGeneralInfo;
  heroConfig: HeroConfig;
  classes: DanceClass[];
  instructors: Instructor[];
  scheduleSlots: ScheduleSlot[];
  workshops: Workshop[];
  specialServices: SpecialService[];
  amenities: StudioAmenity[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  pricingConfig: PricingConfig;
}

export interface TrialBooking {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedClass: string;
  preferredDay: string;
  preferredTime: string;
  ageGroup: string;
  experienceLevel: string;
  notes: string;
  bookingCode?: string;
  createdAt?: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}
