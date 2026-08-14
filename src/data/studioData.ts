import { DanceClass, Instructor, ScheduleSlot, Testimonial, Workshop } from '../types';

export const DANCE_CLASSES: DanceClass[] = [
  {
    id: 'bollywood-fusion',
    name: 'Bollywood Commercial & Fusion',
    category: 'bollywood',
    categoryLabel: 'Bollywood Fusion',
    tagline: 'High-octane cinematic choreography, lyrical storytelling, and infectious energy.',
    description: 'Master dynamic Bollywood routines blending commercial street jazz, expressive hook steps, and current chartbusters.',
    fullDescription: 'Our signature Bollywood Commercial & Fusion program is crafted for dance lovers seeking high energy, theatrical expression, and stage-ready confidence. From retro beats to the newest Bollywood viral choreographies, each session sharpens your body coordination, rhythmic ear, and cinematic expressions (abhinaya).',
    level: 'All Levels',
    ageGroup: 'Age 8+',
    scheduleDays: 'Mon / Wed / Fri',
    timing: '6:00 PM – 7:15 PM & 7:30 PM – 8:45 PM',
    instructorName: 'Sonu Shah & Shubham Rajput',
    instructorId: 'sonu-shah',
    accentColor: '#3D6338',
    lightColor: '#D8E8D4',
    badge: 'Most Popular',
    curriculumHighlights: [
      'Cinematic expressions (Abhinaya) & stage presence',
      'Fluid transitions between folk, lyrical & western beats',
      'Dynamic speed variations, footwork, and signature hook steps',
      'Full music video style routine mastered every 3 weeks'
    ],
    prerequisites: 'None! Open to enthusiastic beginners and advanced performers alike.',
    caloriesBurn: '~450 - 600 kcal / session',
    soundRhythmType: 'bollywood'
  },
  {
    id: 'hiphop-urban',
    name: 'Urban Hip-Hop, Popping & Breaking',
    category: 'urban',
    categoryLabel: 'Street & Urban',
    tagline: 'Groove, control, musicality, isolations, and battle-ready street confidence.',
    description: 'Learn authentic street styles from breaking footwork to smooth popping, waving, and hard-hitting choreography.',
    fullDescription: 'Step into the vibrant culture of street dance. Led by Nitin Oad, this class breaks down bounce, rock, isolations, popping mechanics, gliding, floorwork, and cypher freestyle skills. Whether you aspire to compete in battles or groove effortlessly at any event, this class unleashes your inner rhythm.',
    level: 'All Levels',
    ageGroup: 'Age 10+ to Adults',
    scheduleDays: 'Mon / Thu / Sat',
    timing: '5:30 PM – 6:45 PM & 7:00 PM – 8:15 PM',
    instructorName: 'Nitin Oad',
    instructorId: 'nitin-oad',
    accentColor: '#5A5854',
    lightColor: '#E8EAD0',
    badge: 'High Energy',
    curriculumHighlights: [
      'Body isolations, chest pops, wrist rolls & waving mechanics',
      'Top-rock, footwork, freezes, and foundation breaking basics',
      'Musicality breakdown: pocket dancing, syncopation & bass hits',
      'Monthly studio Cypher battle sessions to build confidence'
    ],
    prerequisites: 'Comfortable sneakers and loose athletic attire.',
    caloriesBurn: '~500 - 700 kcal / session',
    soundRhythmType: 'hiphop'
  },
  {
    id: 'latin-salsa-bachata',
    name: 'Salsa Sensual & Bachata Partnering',
    category: 'latin',
    categoryLabel: 'Latin & Partnering',
    tagline: 'Connection, spins, fluid partner dynamics, and captivating Latin rhythm.',
    description: 'No partner needed! Master social dancing etiquette, Cuban motion, cross-body leads, and romantic Bachata body rolls.',
    fullDescription: 'Discover the electric connection and elegance of Latin social dancing. Led by Shubham Rajput, we teach authentic LA-style Salsa On1 and modern Sensual Bachata. Learn how to lead and follow with effortless finesse, master balance in multi-spins, and build undeniable musicality for social dance floors worldwide.',
    level: 'Beginner & Intermediate',
    ageGroup: 'Age 16+',
    scheduleDays: 'Sat & Sun (Weekend Batches)',
    timing: '11:00 AM – 12:30 PM & 5:00 PM – 6:30 PM',
    instructorName: 'Shubham Rajput',
    instructorId: 'shubham-rajput',
    accentColor: '#7A9E74',
    lightColor: '#F5EDE8',
    badge: 'Social Night Ready',
    curriculumHighlights: [
      'Fundamental timing: Son Clave, 1-2-3, 5-6-7 step rhythm',
      'Lead & Follow mechanics: frame tension, weight transfers & cues',
      'Cross-body lead variations, inside/outside turns & hammerlocks',
      'Bachata body waves, sensual isolations & musical accents'
    ],
    prerequisites: 'No partner or prior experience required. Rotational teaching.',
    caloriesBurn: '~400 - 550 kcal / session',
    soundRhythmType: 'salsa'
  },
  {
    id: 'contemporary-flow',
    name: 'Contemporary & Lyrical Flow',
    category: 'contemporary',
    categoryLabel: 'Modern Movement',
    tagline: 'Graceful fluidity, floorwork, extension, breath control, and emotional storytelling.',
    description: 'Blend athletic floor transitions, releases, momentum sweeps, and deep expressive improvisation.',
    fullDescription: 'Contemporary dance is a journey of body awareness, breath, and profound emotional release. Guided by Nitin Oad and Sonu Shah, students develop elongated lines, core strength, soaring leaps, and seamless floor recovery techniques with modern lyrical phrasing.',
    level: 'All Levels',
    ageGroup: 'Age 8+ to Adults',
    scheduleDays: 'Wed / Sat / Sun',
    timing: '7:00 PM – 8:15 PM & Sunday Special 9:30 AM',
    instructorName: 'Nitin Oad & Sonu Shah',
    instructorId: 'nitin-oad',
    accentColor: '#3D6338',
    lightColor: '#DDE8DA',
    badge: 'Artistic Flow',
    curriculumHighlights: [
      'Dynamic floor sweeps, spirals, shoulder rolls & soft drops',
      'Core stabilization, leg extensions and suspension jumps',
      'Lyrical phrase choreography with emotive musical phrasing',
      'Improvisation exercises to unlock personal movement vocabulary'
    ],
    prerequisites: 'Comfortable stretchable clothing, barefoot or dance socks.',
    caloriesBurn: '~420 - 550 kcal / session',
    soundRhythmType: 'contemporary'
  },
  {
    id: 'kids-creative-movement',
    name: 'Little Stars — Kids Movement & Rhythm',
    category: 'kids',
    categoryLabel: 'Little Movers',
    tagline: 'Joyful exploration of music, posture, flexibility, and creative self-expression.',
    description: 'Designed specifically for young minds aged 3–8 to foster discipline, stage confidence, motor skills, and pure joy.',
    fullDescription: 'Our early childhood dance program introduces young children to the magic of dance through playful games, storytelling, rhythmic clapping, animal movement patterns, and foundational dance postures. Led by Shubham Rajput, we nurture their innate creativity while building posture, teamwork, and fearless stage presence.',
    level: 'Beginners',
    ageGroup: 'Age 3 – 8 Years',
    scheduleDays: 'Tue / Thu / Sat',
    timing: '4:00 PM – 5:00 PM (Batch A) & 5:00 PM – 6:00 PM (Batch B)',
    instructorName: 'Shubham Rajput & Team',
    instructorId: 'shubham-rajput',
    accentColor: '#7A9E74',
    lightColor: '#E8F0E6',
    badge: 'Kids Favourite',
    curriculumHighlights: [
      'Rhythm clapping games and ear-training on vibrant global beats',
      'Gross motor coordination: skipping, galloping, balancing & leaps',
      'Fun mini-routines set to Disney, animated themes and Bollywood hits',
      'Mid-term Parent Showcase & Annual Stage Production performance'
    ],
    prerequisites: 'Just their boundless energy and excitement!',
    caloriesBurn: '~300 kcal / session',
    soundRhythmType: 'kids'
  },
  {
    id: 'sangeet-wedding-choreography',
    name: 'Wedding Sangeet & Event Masterclass',
    category: 'events',
    categoryLabel: 'Special Choreography',
    tagline: 'Grand couple first dance, energetic family flashmobs, and seamless audio mixes.',
    description: 'Bespoke choreography packages for couples, families, and corporate galas with video tutorials and home/studio rehearsals.',
    fullDescription: 'Make your grand celebrations magical! Sonu Shah and the senior choreography team specialize in crafting signature dance sequences tailored to all skill levels. From romantic slow waltzes and Bollywood couple medleys to high-energy 40-person family medleys and custom music mashups.',
    level: 'Custom for All Ages',
    ageGroup: 'All Age Groups',
    scheduleDays: 'Flexible Custom Timings',
    timing: 'Daily by Appointment (Morning / Afternoon / Evening)',
    instructorName: 'Sonu Shah & Choreography Team',
    instructorId: 'sonu-shah',
    accentColor: '#3D6338',
    lightColor: '#E8EAD0',
    badge: 'Bespoke Experience',
    curriculumHighlights: [
      'Custom song mashup and high-definition audio track mixing',
      'Easy-to-learn steps designed for non-dancers & grandparents alike',
      'HD video practice tutorials shared for distant family members',
      'Rehearsal options at Merrick Studio or your private residence'
    ],
    prerequisites: 'Choose your favourite songs and let us handle the rest!',
    caloriesBurn: '~400 kcal / session',
    soundRhythmType: 'bollywood'
  }
];

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'sonu-shah',
    name: 'Sonu Shah',
    role: 'Founder, Artistic Director & Lead Choreographer',
    experience: '14+ Years Experience',
    avatarText: 'SS',
    accentColor: '#3D6338',
    specialties: ['Bollywood Commercial', 'Urban & Hip-Hop Choreography', 'Wedding Sangeet Direction', 'Stage Production'],
    bio: 'With over 14 years of professional choreography and stage direction across film productions, music videos, and mega stage recitals, Sonu Shah leads Merrick Dance & Entertainment Studio with artistic vision, explosive energy, and dedication to building confident performers.',
    achievements: [
      'Directed 50+ mega stage productions & national entertainment events',
      'Choreographed celebrity music videos and award show routines',
      'Mentored over 1,200 dancers from first-time beginners to pro stage performers'
    ],
    quote: 'Dance is passion made visible. When you own the stage with confidence, the world moves with you.',
    classesTaught: ['Bollywood Commercial & Fusion', 'Contemporary & Lyrical Flow', 'Wedding Sangeet & Event Masterclass']
  },
  {
    id: 'nitin-oad',
    name: 'Nitin Oad',
    role: 'Senior Faculty & Urban / Contemporary Specialist',
    experience: '10+ Years Experience',
    avatarText: 'NO',
    accentColor: '#5A5854',
    specialties: ['Urban Hip-Hop', 'Popping & Breaking', 'Contemporary Floorwork', 'Acrobatic Dynamics'],
    bio: 'A powerhouse street dancer and versatile contemporary artist, Nitin Oad brings razor-sharp technique, ground-breaking musicality, and empowering battle methodology. His classes blend high-octane groove with athletic floor control and precision body isolations.',
    achievements: [
      'Winner & Finalist in national street dance and cypher battles',
      'Head trainer for competitive crew championship routines',
      'Specialist in somatic movement, joint conditioning, and acrobatic transitions'
    ],
    quote: 'Never hold back on the floor. Isolate every beat, master your gravity, and dance with authentic power.',
    classesTaught: ['Urban Hip-Hop, Popping & Breaking', 'Contemporary & Lyrical Flow']
  },
  {
    id: 'shubham-rajput',
    name: 'Shubham Rajput',
    role: 'Senior Choreographer & Latin / Foundation Lead',
    experience: '9+ Years Experience',
    avatarText: 'SR',
    accentColor: '#7A9E74',
    specialties: ['Salsa & Bachata Partnering', 'Bollywood Fusion', 'Kids Movement & Little Stars', 'Folk & Garba Fusion'],
    bio: 'Known for his engaging teaching style, infectious smile, and deep musical intuition, Shubham Rajput makes partner dancing and foundational movement accessible and exciting for dancers of all ages, from toddlers to adults.',
    achievements: [
      'Certified Latin social dance instructor & energetic performer',
      'Trained over 500 kids in stage confidence, motor skills, and rhythm',
      'Choreographed 70+ couple first dances and vibrant wedding family sangeets'
    ],
    quote: 'Partner dance is a conversation without words; all it takes is rhythm, trust, and a smile.',
    classesTaught: ['Salsa Sensual & Bachata Partnering', 'Little Stars — Kids Movement & Rhythm', 'Bollywood Commercial & Fusion']
  }
];

export const SCHEDULE_SLOTS: ScheduleSlot[] = [
  // Monday
  { id: 'm1', day: 'Monday', time: '07:00 AM – 08:15 AM', className: 'Morning Barre & Conditioning', classId: 'contemporary-flow', level: 'All Levels', instructor: 'Nitin Oad', studioRoom: 'Studio Alpha (Main)', availableSpots: 4, totalSpots: 18 },
  { id: 'm2', day: 'Monday', time: '05:30 PM – 06:45 PM', className: 'Urban Hip-Hop (Beginners)', classId: 'hiphop-urban', level: 'Beginner', instructor: 'Nitin Oad', studioRoom: 'Studio Beta (Acoustic)', availableSpots: 6, totalSpots: 20 },
  { id: 'm3', day: 'Monday', time: '07:00 PM – 08:15 PM', className: 'Bollywood Commercial & Fusion', classId: 'bollywood-fusion', level: 'All Levels', instructor: 'Sonu Shah', studioRoom: 'Studio Alpha (Main)', availableSpots: 2, totalSpots: 24 },

  // Tuesday
  { id: 'tu1', day: 'Tuesday', time: '04:00 PM – 05:00 PM', className: 'Little Stars (Kids Movement)', classId: 'kids-creative-movement', level: 'Beginners (Age 3-8)', instructor: 'Shubham Rajput', studioRoom: 'Studio Beta (Acoustic)', availableSpots: 5, totalSpots: 15 },
  { id: 'tu2', day: 'Tuesday', time: '05:30 PM – 06:45 PM', className: 'Bollywood High-Energy Routine', classId: 'bollywood-fusion', level: 'All Levels', instructor: 'Shubham Rajput', studioRoom: 'Studio Alpha (Main)', availableSpots: 4, totalSpots: 22 },
  { id: 'tu3', day: 'Tuesday', time: '07:00 PM – 08:15 PM', className: 'Urban Popping & Body Isolations', classId: 'hiphop-urban', level: 'Intermediate', instructor: 'Nitin Oad', studioRoom: 'Studio Alpha (Main)', availableSpots: 3, totalSpots: 20 },

  // Wednesday
  { id: 'w1', day: 'Wednesday', time: '06:00 PM – 07:15 PM', className: 'Bollywood Cinematic Masterpiece', classId: 'bollywood-fusion', level: 'All Levels', instructor: 'Sonu Shah', studioRoom: 'Studio Alpha (Main)', availableSpots: 7, totalSpots: 24 },
  { id: 'w2', day: 'Wednesday', time: '07:30 PM – 08:45 PM', className: 'Contemporary Floorwork & Flow', classId: 'contemporary-flow', level: 'Intermediate', instructor: 'Nitin Oad', studioRoom: 'Studio Beta (Acoustic)', availableSpots: 5, totalSpots: 18 },

  // Thursday
  { id: 'th1', day: 'Thursday', time: '04:00 PM – 05:00 PM', className: 'Little Stars (Kids Rhythm & Games)', classId: 'kids-creative-movement', level: 'Beginners (Age 3-8)', instructor: 'Shubham Rajput', studioRoom: 'Studio Beta (Acoustic)', availableSpots: 3, totalSpots: 15 },
  { id: 'th2', day: 'Thursday', time: '05:30 PM – 06:45 PM', className: 'Urban Hip-Hop & Breaking Basics', classId: 'hiphop-urban', level: 'Intermediate', instructor: 'Nitin Oad', studioRoom: 'Studio Alpha (Main)', availableSpots: 4, totalSpots: 20 },
  { id: 'th3', day: 'Thursday', time: '07:00 PM – 08:15 PM', className: 'Bollywood Lyrical & Stage Choreography', classId: 'bollywood-fusion', level: 'All Levels', instructor: 'Sonu Shah', studioRoom: 'Studio Alpha (Main)', availableSpots: 2, totalSpots: 24 },

  // Friday
  { id: 'f1', day: 'Friday', time: '06:00 PM – 07:15 PM', className: 'Bollywood Commercial Music Video Prep', classId: 'bollywood-fusion', level: 'All Levels', instructor: 'Sonu Shah & Shubham Rajput', studioRoom: 'Studio Alpha (Main)', availableSpots: 3, totalSpots: 24 },
  { id: 'f2', day: 'Friday', time: '07:30 PM – 09:00 PM', className: 'Friday Night Open Cypher & Freestyle', classId: 'hiphop-urban', level: 'Open To All', instructor: 'Nitin Oad', studioRoom: 'Studio Beta (Acoustic)', availableSpots: 8, totalSpots: 25 },

  // Saturday
  { id: 'sa1', day: 'Saturday', time: '09:00 AM – 10:15 AM', className: 'Contemporary Weekend Flow & Stretch', classId: 'contemporary-flow', level: 'All Levels', instructor: 'Nitin Oad', studioRoom: 'Studio Alpha (Main)', availableSpots: 5, totalSpots: 20 },
  { id: 'sa2', day: 'Saturday', time: '11:00 AM – 12:30 PM', className: 'Salsa Sensual & Bachata (Beginners)', classId: 'latin-salsa-bachata', level: 'Beginner (No Partner Needed)', instructor: 'Shubham Rajput', studioRoom: 'Studio Alpha (Main)', availableSpots: 6, totalSpots: 22 },
  { id: 'sa3', day: 'Saturday', time: '04:00 PM – 05:00 PM', className: 'Little Stars Weekend Showcase Prep', classId: 'kids-creative-movement', level: 'Kids (Age 3-8)', instructor: 'Shubham Rajput', studioRoom: 'Studio Beta (Acoustic)', availableSpots: 2, totalSpots: 15 },
  { id: 'sa4', day: 'Saturday', time: '05:30 PM – 07:00 PM', className: 'Salsa & Bachata Social Mastery', classId: 'latin-salsa-bachata', level: 'Intermediate', instructor: 'Shubham Rajput', studioRoom: 'Studio Alpha (Main)', availableSpots: 4, totalSpots: 20 },

  // Sunday
  { id: 'su1', day: 'Sunday', time: '09:30 AM – 11:00 AM', className: 'Sunday Mega Dance Cardio Intensive', classId: 'bollywood-fusion', level: 'All Levels', instructor: 'Sonu Shah', studioRoom: 'Studio Alpha (Main)', availableSpots: 5, totalSpots: 25 },
  { id: 'su2', day: 'Sunday', time: '11:30 AM – 01:00 PM', className: 'Masterclass Guest Intensive', classId: 'hiphop-urban', level: 'Open Masterclass', instructor: 'Nitin Oad & Sonu Shah', studioRoom: 'Studio Alpha (Main)', availableSpots: 5, totalSpots: 30 },
  { id: 'su3', day: 'Sunday', time: '05:00 PM – 07:00 PM', className: 'Latin Social Dancing & Practice Social', classId: 'latin-salsa-bachata', level: 'All Dancers', instructor: 'Shubham Rajput', studioRoom: 'Studio Alpha (Main)', availableSpots: 10, totalSpots: 35 }
];

export const UPCOMING_WORKSHOPS: Workshop[] = [
  {
    id: 'ws-1',
    title: 'Cinematic Bollywood & Semi-Classical Lyrical Weekend',
    instructor: 'Sonu Shah',
    date: 'Saturday & Sunday, Aug 22–23',
    time: '4:00 PM – 7:00 PM',
    badge: 'Selling Fast',
    spotsLeft: 6,
    totalSpots: 25,
    price: 1499,
    originalPrice: 2200,
    description: 'Learn a complete stage-ready Bollywood lyrical routine with 4K professional video footage provided to each participant.',
    tags: ['Video Shoot Included', 'Certificate', 'All Levels']
  },
  {
    id: 'ws-2',
    title: 'Urban Hip-Hop Floorwork & Musicality Intensive',
    instructor: 'Nitin Oad',
    date: 'Sunday, Aug 30',
    time: '10:00 AM – 1:30 PM',
    badge: 'Limited Edition',
    spotsLeft: 4,
    totalSpots: 20,
    price: 999,
    originalPrice: 1500,
    description: 'Master effortless floor slides, threading, freezes, and syncopated rhythmic control to elevate your freestyle.',
    tags: ['Freestyle Boost', 'High Cardio', 'Intermediate']
  },
  {
    id: 'ws-3',
    title: 'Salsa Musicality & Dip Technique Masterclass',
    instructor: 'Shubham Rajput',
    date: 'Saturday, Sep 5',
    time: '5:00 PM – 8:00 PM',
    badge: 'Partner Dancing',
    spotsLeft: 8,
    totalSpots: 24,
    price: 1299,
    originalPrice: 1800,
    description: 'Learn safe, show-stopping dips, musical phrasing, and fluid social dance styling for leads and follows.',
    tags: ['No Partner Required', 'Social Dance Party Included']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sneha & Raj Patel',
    role: 'Parents of Ananya (Age 7)',
    category: 'kids',
    stars: 5,
    comment: 'My daughter joined the Little Stars program at age 4 feeling shy and hesitant. Under Shubham Sir\'s guidance, she now performs fearlessly on stage! The instructors at Merrick build genuine character, poise, and happiness.',
    avatarText: 'SP',
    bgGradient: 'from-[#3D6338] to-[#7A9E74]',
    yearsWithStudio: '3 Years Enrolled',
    enrolledClass: 'Little Stars & Kids Movement'
  },
  {
    id: 't2',
    name: 'Arjun Mehta',
    role: 'Corporate Tech Lead (Age 34)',
    category: 'adult',
    stars: 5,
    comment: 'I had two left feet and zero rhythm when I walked in for a trial class. Shubham Sir\'s Salsa teaching is so patient, humorous, and structured that within 3 months I was dancing comfortably at weekend socials. Best stress buster after work!',
    avatarText: 'AM',
    bgGradient: 'from-[#5A5854] to-[#2C2B29]',
    yearsWithStudio: '1.5 Years Enrolled',
    enrolledClass: 'Salsa & Bachata'
  },
  {
    id: 't3',
    name: 'Kavya Shah',
    role: 'University Student & Performer',
    category: 'contemporary',
    stars: 5,
    comment: 'Sonu Sir and Nitin Sir have unmatched energy! The choreography in Bollywood and Urban Hip-Hop is so fresh and dynamic. The annual stage recital production values are second to none in Ahmedabad. Merrick is my creative home!',
    avatarText: 'KS',
    bgGradient: 'from-[#7A9E74] to-[#3D6338]',
    yearsWithStudio: '2 Years Enrolled',
    enrolledClass: 'Bollywood Fusion & Urban Hip-Hop'
  },
  {
    id: 't4',
    name: 'Rohan & Tina Desai',
    role: 'Newly Married Couple',
    category: 'wedding',
    stars: 5,
    comment: 'Sonu Shah choreographed our entire wedding sangeet — from our couple first dance to our 40-person family flashmob. They customized the steps so even our grandparents danced comfortably. It made our wedding night unforgettable!',
    avatarText: 'RT',
    bgGradient: 'from-[#3D6338] to-[#5A5854]',
    yearsWithStudio: 'Wedding Choreography Client',
    enrolledClass: 'Custom Wedding Sangeet Package'
  }
];

export const STUDIO_AMENITIES = [
  {
    title: '1,800 sq.ft Sprung Wood Floors',
    description: 'European multi-layered shock-absorbing subfloors engineered to protect dancers\' knees, ankles, and joints during high-impact jumps, turns, and footwork.',
    iconName: 'ShieldCheck'
  },
  {
    title: '12-ft High Floor-to-Ceiling Mirrors',
    description: 'Distortion-free acoustic-backed mirror walls allowing complete 360-degree alignment feedback and posture correction from any spot in the room.',
    iconName: 'Maximize2'
  },
  {
    title: 'JBL Pro Concert Surround Sound',
    description: 'Acoustically treated sound-dampened studios with crisp high-definition audio separation so you feel every bass drop, drum kick, and subtle melody.',
    iconName: 'Volume2'
  },
  {
    title: 'Climate Controlled Air Purification',
    description: 'High-volume fresh air ventilation and HEPA purification maintaining a crisp, oxygen-rich 22°C environment throughout intense choreography sessions.',
    iconName: 'Wind'
  },
  {
    title: 'Luxury Green Rooms & Changing Suites',
    description: 'Private, secure lockers, changing booths, touch-up vanity stations, filtered water bar, and a tranquil student relaxation lounge.',
    iconName: 'Sparkles'
  },
  {
    title: 'Safe Campus with CCTV & Free Parking',
    description: 'Dedicated parking on ground floor in Satellite, 24/7 CCTV surveillance, and secure check-in protocols for complete peace of mind.',
    iconName: 'Lock'
  }
];

export const FREQUENT_FAQS = [
  {
    id: 'faq-1',
    question: 'How do I book my Free Trial Class, and what happens during it?',
    category: 'Trial & Enrollment',
    answer: 'Booking your free trial is 100% complimentary with zero commitment! Simply click "Book a Free Trial" on this page, choose your preferred dance style and day. When you arrive, you\'ll meet our faculty 10 minutes prior, join the full active class alongside other students, and receive friendly guidance on your movement and progress.'
  },
  {
    id: 'faq-2',
    question: 'I have never danced before and feel self-conscious. Are your beginner batches really beginner-friendly?',
    category: 'Skill Levels',
    answer: 'Over 65% of our adult students walked through our doors with absolutely zero prior dance background. Our beginner batches are specifically structured with zero judgment: Sonu Shah, Nitin Oad, and Shubham Rajput break down steps slowly, repeat patterns at half-tempo, and emphasize personal joy and rhythm over perfection.'
  },
  {
    id: 'faq-3',
    question: 'What is the fee structure and payment options?',
    category: 'Fees & Packages',
    answer: 'Our fee packages are transparent and structured by monthly, quarterly, and annual tiers. Monthly 2-days/week batches start from ₹2,200/month. Quarterly packages offer up to 15% savings, and Annual enrollments save up to 25% plus include complimentary studio masterclasses and stage recital vouchers. We accept UPI, Cards, and Net Banking.'
  },
  {
    id: 'faq-4',
    question: 'What should I wear to my first class?',
    category: 'Class Preparation',
    answer: 'For Bollywood, Hip-Hop, and Salsa: Wear comfortable athletic clothing (track pants, leggings, t-shirt) and clean indoor sneakers. For Contemporary & Lyrical: Stretchable leggings/tights with dance socks or barefoot.'
  },
  {
    id: 'faq-5',
    question: 'What happens if I miss a scheduled class due to work or travel?',
    category: 'Attendance & Makeups',
    answer: 'We understand busy schedules! Active monthly and quarterly students are granted up to 2 flexible make-up classes per month. You can attend any parallel batch in your category or an open weekend session by notifying us in advance via WhatsApp at +91 99098 43221.'
  },
  {
    id: 'faq-6',
    question: 'Do all students get to perform on stage in annual showcases?',
    category: 'Performances & Recitals',
    answer: 'Yes! We believe stage performance is where true confidence blossoms. Every enrolled student—from our 3-year-old Little Stars to our adult Salsa and Bollywood dancers—is invited to participate in our signature Grand Annual Day Recital held at premier auditoriums in Ahmedabad with professional lighting, costumes, and 4K filming.'
  },
  {
    id: 'faq-7',
    question: 'Do you offer private 1-on-1 coaching and wedding sangeet choreography?',
    category: 'Specialized Services',
    answer: 'Yes! Under Sonu Shah\'s artistic direction, our custom choreography division specializes in Wedding Sangeet choreography (Bride & Groom first dance, family concepts, flashmobs, audio mixing), Corporate team-building workshops, and private 1-on-1 intensive technique coaching.'
  }
];
