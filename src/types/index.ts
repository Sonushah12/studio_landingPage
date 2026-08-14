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
}

export interface ScheduleSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  className: string;
  classId: string;
  level: string;
  instructor: string;
  studioRoom: 'Studio Alpha (Main)' | 'Studio Beta (Acoustic)';
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
}
