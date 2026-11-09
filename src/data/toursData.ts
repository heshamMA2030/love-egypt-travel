import { Tour, BookingAddon, Review, MarineCondition } from '../types';

export const TOURS_DATA: Tour[] = [
  {
    id: 'ras-mohammed-white-island',
    title: 'Ras Mohammed National Park & White Island Luxury Yacht',
    subtitle: 'Sail to Egypt’s crown jewel marine reserve with open-sea seafood buffet & sandbank lagoon',
    category: 'diving',
    categoryLabel: 'Snorkeling & Diving',
    priceUSD: 55,
    originalPriceUSD: 75,
    duration: '8 Hours (08:00 - 16:30)',
    rating: 4.95,
    reviewsCount: 342,
    difficulty: 'Easy',
    groupSize: 'Max 25 on 3-Deck Luxury Yacht',
    pickupZones: ['Naama Bay', 'Nabq Bay', 'Hadaba', "Shark's Bay", 'Ras Um Sid'],
    departureTime: '08:00 AM (Hotel Lobby)',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Ras Mohammed is globally hailed among the top 10 dive locations on Earth. Embark aboard a pristine 3-deck yacht from Sharm El Maya Marina towards the southern tip of the Sinai peninsula where the Gulf of Suez meets the Gulf of Aqaba. Marvel at vertical coral walls dropping over 800 meters into sapphire depths at Yolanda Reef, swim in the turquoise shallows of the disappearing White Island sandbank, and enjoy freshly grilled Red Sea fish & calamari prepared onboard by our private chef.',
    highlights: [
      'Stops at Yolanda & Shark Reef with over 1,000 species of reef fish',
      'Disembark on the breathtaking powdery sands of White Island',
      'Fresh gourmet seafood & BBQ buffet with soft drinks throughout the day',
      'Professional PADI dive masters and certified snorkel guides onboard',
      'Complimentary sanitized snorkeling mask, snorkel, and life vests'
    ],
    inclusions: [
      'Round-trip air-conditioned hotel transfers (all Sharm regions)',
      'Ras Mohammed National Park eco-entry permit',
      'Gourmet onboard buffet lunch (Fish, chicken, salads, pasta, desserts)',
      'Unlimited mineral water, sodas, hot tea & coffee',
      'English, Russian, Italian, & German speaking marine guides'
    ],
    exclusions: [
      'National park nature conservation fee ($5 payable at harbor)',
      'Wetsuit rental ($7 if needed during winter)',
      'Professional underwater photo & video USB drive (optional add-on)'
    ],
    whatToBring: [
      'Passports or Egyptian ID (mandatory for port coast guard clearance)',
      'Swimwear, beach towels, and change of clothes',
      'Reef-safe sunscreen & sunglasses',
      'Waterproof phone case or action camera'
    ],
    badge: 'Most Popular',
    coralSpot: 'Shark & Yolanda Reef'
  },
  {
    id: 'straits-of-tiran-diving',
    title: 'Straits of Tiran Scuba & Snorkel Safari: Jackson & Gordon Reefs',
    subtitle: 'Explore legendary sunken shipwrecks, dramatic drop-offs, and hammerhead coral pinnacles',
    category: 'diving',
    categoryLabel: 'Snorkeling & Diving',
    priceUSD: 65,
    originalPriceUSD: 85,
    duration: '7.5 Hours (08:30 - 16:00)',
    rating: 4.92,
    reviewsCount: 218,
    difficulty: 'Moderate',
    groupSize: 'Max 20 guests',
    pickupZones: ['Naama Bay', 'Nabq Bay', 'Hadaba', "Shark's Bay"],
    departureTime: '08:30 AM',
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Lying in the narrow channel between the Sinai Peninsula and Saudi Arabia’s Tiran Island, the Straits of Tiran are home to four world-renowned coral pinnacles: Jackson, Woodhouse, Thomas, and Gordon Reefs. Towering above Gordon Reef sits the iconic rusted hull of the Loullia cargo shipwreck. Experience world-class underwater visibility of 30+ meters, giant gorgonian sea fans, passing sea turtles, eagle rays, and vibrant anthias schools.',
    highlights: [
      'Cruising past the historic Loullia shipwreck perched atop Gordon Reef',
      'Unsurpassed 30-40m water clarity ideal for both beginner & advanced divers',
      'Introductory scuba dive session available with 1-on-1 certified instructor',
      'Chef-prepared lunch buffet served on the shaded dining deck'
    ],
    inclusions: [
      'VIP hotel pick-up and return in modern A/C Mercedes Sprinter',
      'Full yacht day cruise with shaded sun-deck loungers',
      'Buffet lunch, seasonal fruit platter, and all non-alcoholic beverages',
      'Marine park entrance permits'
    ],
    exclusions: [
      'Introductory scuba dive with cylinder & gear (optional $25 add-on)',
      'Gratuities for captain & marine crew'
    ],
    whatToBring: [
      'Passports, beach towels, sunglass strap, reef shoes',
      'Warm hoodie for the afternoon ocean breeze'
    ],
    badge: 'Divers Choice',
    coralSpot: 'Jackson & Gordon Reef'
  },
  {
    id: 'super-desert-vip-safari',
    title: 'Super Sinai VIP Desert Safari: Quads, Buggies, Camel & Bedouin Feast',
    subtitle: 'Golden hour dunes, Echo Valley, camel caravan, Bedouin feast & astronomical stargazing',
    category: 'safari',
    categoryLabel: 'Desert Safari & Quad',
    priceUSD: 40,
    originalPriceUSD: 55,
    duration: '6 Hours (15:00 - 21:00)',
    rating: 4.89,
    reviewsCount: 489,
    difficulty: 'Easy',
    groupSize: 'Single / Double Quads Available',
    pickupZones: ['Naama Bay', 'Nabq Bay', 'Hadaba', "Shark's Bay", 'Ras Um Sid'],
    departureTime: '15:00 PM',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Feel the thrilling horsepower of automatic quad bikes tearing through the dramatic desert canyons of South Sinai. Ride into the geological wonder of Echo Valley, watch the crimson sun sink behind the jagged granite mountains, and arrive at a candlelit authentic Bedouin tent village. Enjoy hot Bedouin herbal Habak tea, a gentle sunset camel ride, freshly baked unleavened bread, an open charcoal grill dinner, and an enchanting folklore Tanoura whirling dervish performance followed by high-powered digital telescope stargazing.',
    highlights: [
      '2.5 hours of adrenaline quad biking through desert ravines & sand valleys',
      'Scenic sunset camel trek through the golden desert foothills',
      'Authentic candlelit Bedouin feast with Kofta, grilled chicken, rice, & salads',
      'Live Oriental folklore show: Tanoura spinning dance & fire show',
      'Deep desert astronomy session viewing Saturn’s rings and the Milky Way'
    ],
    inclusions: [
      'Hotel pickup & return in air-conditioned transfer',
      'Modern 250cc automatic ATV quad bike (helmets provided)',
      'Guided camel trek with local Bedouin handlers',
      'Traditional Bedouin dinner and hot Habak mint tea',
      'Full evening cultural show & astronomy briefing'
    ],
    exclusions: [
      'Desert keffiyeh scarf (Arafat scarf $3 if purchased at camp)',
      'Protective dust goggles ($3 rental)'
    ],
    whatToBring: [
      'Comfortable trainers/sneakers (no open sandals)',
      'Comfortable jeans/trousers and warm light jacket for desert evening',
      'Sunglasses and small cash for Bedouin handicrafts'
    ],
    badge: 'Bestseller',
    coralSpot: 'Echo Valley & Sinai Oasis'
  },
  {
    id: 'mount-sinai-sunrise-trek',
    title: 'Mount Sinai Sunrise Pilgrimage & St. Catherine Monastery',
    subtitle: 'Ascend the Holy Peak of Moses at dawn and tour the world’s oldest functioning Christian monastery',
    category: 'sinai',
    categoryLabel: 'Mount Sinai & Culture',
    priceUSD: 50,
    originalPriceUSD: 70,
    duration: '14 Hours (Overnight: 21:00 - 13:00)',
    rating: 4.96,
    reviewsCount: 194,
    difficulty: 'Moderate',
    groupSize: 'Small Group with Bedouin Mountain Guide',
    pickupZones: ['Naama Bay', 'Nabq Bay', 'Hadaba', "Shark's Bay"],
    departureTime: '21:00 PM (Night departure)',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A transformative spiritual and natural pilgrimage. Climb Mount Sinai (2,285m / 7,497ft), where biblical tradition holds that Moses received the Ten Commandments. Ascend by torchlight under a tapestry of millions of stars with your native Jabaliya Bedouin guide. As dawn breaks, witness a celestial sea of red and violet clouds illuminating the Sinai mountain range. Descend to tour the UNESCO World Heritage St. Catherine Monastery, built in the 6th century by Byzantine Emperor Justinian, housing the Chapel of the Burning Bush and ancient religious icons.',
    highlights: [
      'Breathtaking sunrise from the summit of Mount Sinai (Gebel Musa)',
      'Guided trek via the gentle camel path with 750 Steps of Repentance',
      'Tour UNESCO-protected 6th-century St. Catherine Monastery',
      'See the legendary living Burning Bush & Moses Well',
      'Bedouin tea houses along the trail with hot beverages and blankets'
    ],
    inclusions: [
      'Round-trip transportation in comfortable air-conditioned coach',
      'Licensed Jabaliya Bedouin mountain guide for the ascent',
      'Saint Catherine National Park & Monastery admission tickets',
      'Breakfast box provided at monastery cafe'
    ],
    exclusions: [
      'Camel ride up mountain (optional, payable to Bedouin on site ~$20)',
      'Monastery museum/icon gallery entry ticket ($5)'
    ],
    whatToBring: [
      'PASSPORT IS STRICTLY REQUIRED for security checkpoints',
      'Sturdy hiking boots or sports shoes with good traction',
      'Thermal jacket, fleece, warm hat & gloves (summit temperatures drop to 2-8°C)',
      'Headlamp or flashlight with spare batteries'
    ],
    badge: 'Iconic Heritage',
    coralSpot: 'Sinai High Mountains'
  },
  {
    id: 'dahab-blue-hole-safari',
    title: 'Dahab Blue Hole & Canyon Jeep Expedition with Camel Ride',
    subtitle: 'Dive the world-famous submarine sinkhole, canyon scramble, and bohemian beach town stroll',
    category: 'dahab',
    categoryLabel: 'Dahab Day Trip',
    priceUSD: 45,
    originalPriceUSD: 60,
    duration: '10 Hours (07:30 - 17:30)',
    rating: 4.88,
    reviewsCount: 312,
    difficulty: 'Moderate',
    groupSize: '4x4 Land Cruiser Safari',
    pickupZones: ['Naama Bay', 'Nabq Bay', 'Hadaba', "Shark's Bay"],
    departureTime: '07:30 AM',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Journey 90km north along the Gulf of Aqaba coast into the bohemian paradise of Dahab. Snorkel the legendary Blue Hole, a 130m deep marine sinkhole surrounded by dramatic coral walls. Ride camels along the seaside cliff path, explore the twisting sandstone labyrinth of the Colored Canyon, and savor a seaside Bedouin lunch before shopping for silver, spices, and handmade rugs in Dahab’s artisan promenade.',
    highlights: [
      'Snorkeling the world-renowned Blue Hole coral perimeter',
      'Off-road 4x4 Land Cruiser drive through majestic desert wadis',
      'Scenic seaside camel trek along the coastline of Ras Abu Galum',
      'Fresh Bedouin lunch served right over the water in a beach arisha',
      'Free time to explore Dahab’s laid-back coffee shops & artisan bazaar'
    ],
    inclusions: [
      'Hotel pickup & drop-off in air-conditioned 4x4 Jeep/Minivan',
      'Blue Hole Nature Reserve entry fee',
      'Guided snorkeling session with safety briefing',
      'Seaside lunch at authentic Bedouin beach club',
      'Dahab town sightseeing & shopping walk'
    ],
    exclusions: [
      'Snorkel gear hire ($5 if you do not bring your own)',
      'Drinks at lunch in Dahab'
    ],
    whatToBring: [
      'Passports, swimwear, sun protection, water shoes',
      'Cash for Dahab market souvenirs & mango juices'
    ],
    badge: 'Adventure Pick',
    coralSpot: 'Dahab Blue Hole & Bells'
  },
  {
    id: 'private-sunset-speedboat',
    title: 'Private VIP Speedboat Charter & Wild Dolphin Bay Quest',
    subtitle: 'Exclusive private vessel with captain, secluded lagoons, snorkeling with dolphins & champagne',
    category: 'boat',
    categoryLabel: 'Boat Charters',
    priceUSD: 160,
    originalPriceUSD: 210,
    duration: '3 Hours (Flexible departure: 09:00, 13:00, or Sunset 15:30)',
    rating: 4.98,
    reviewsCount: 147,
    difficulty: 'Easy',
    groupSize: 'Private Charter (Up to 6 guests)',
    pickupZones: ['Naama Bay', 'Nabq Bay', 'Hadaba', "Shark's Bay", 'Ras Um Sid'],
    departureTime: '15:30 PM (Sunset Cruise Recommended)',
    image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Experience the Red Sea in ultimate seclusion. Step aboard a luxury 28ft twin-engine private speedboat reserved exclusively for you and your companion or family. Zip across the waves to Dolphin Bay near Tiran Island where pods of wild spinner dolphins dance in the bow wave. Anchor in crystal-clear lagoons inaccessible to large tour boats, snorkel virgin reefs in total privacy, and toast the desert sunset with sparkling refreshments and gourmet Egyptian sweets.',
    highlights: [
      '100% private boat: no crowds, customized itinerary at your pace',
      'Encounter wild pods of spinner dolphins in their natural habitat',
      'Access secluded coral coves and hidden bays',
      'Bluetooth premium sound system on board to play your own playlist',
      'Complimentary chilled champagne/sparkling cider, fresh fruit platter & refreshments'
    ],
    inclusions: [
      'Private luxury VIP car hotel pickup & drop-off',
      'Exclusive 3-hour speedboat charter with licensed captain',
      'Top-tier Cressi snorkeling equipment for all guests',
      'Fresh tropical fruit platter, mineral water, soft drinks, & champagne toast'
    ],
    exclusions: [
      'Optional watersports: Banana boat or parasailing tow ($20 extra)'
    ],
    whatToBring: [
      'Passports, swimsuit, beach towel, sunglasses',
      'Phone or camera for unforgettable dolphin photos'
    ],
    badge: 'Luxury VIP',
    coralSpot: 'Tiran Dolphin Sanctuary'
  },
  {
    id: 'semi-submarine-coral-safari',
    title: 'Royal Sea Scope Semi-Submarine & Underwater Coral Observatory',
    subtitle: 'Air-conditioned underwater observation deck with 360° coral views—ideal for families & non-swimmers',
    category: 'boat',
    categoryLabel: 'Boat Charters',
    priceUSD: 25,
    originalPriceUSD: 35,
    duration: '2.5 Hours (Multiple departures: 10:00, 11:30, 14:00)',
    rating: 4.84,
    reviewsCount: 388,
    difficulty: 'Easy',
    groupSize: 'Comfortable family capacity',
    pickupZones: ['Naama Bay', 'Nabq Bay', 'Hadaba', "Shark's Bay"],
    departureTime: '10:00 AM / 14:00 PM',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Immerse yourself 3 meters below the surface of the Red Sea without getting wet! The Royal Sea Scope features a deep hull lined on both sides with expansive optical-quality viewing windows and swivel armchairs. Cruise through the coral gardens of Near Garden and Middle Garden. Witness schools of butterflyfish, clownfish nestled in sea anemones, giant clams, stingrays, and sea turtles with live informative commentary by marine biologists.',
    highlights: [
      'Full underwater panoramic views while staying completely dry and cool',
      'Climate-controlled observation deck with individual swivel seats',
      'Child and senior friendly — no swimming skills required',
      'Live diver feeding show right outside your viewing window',
      'Short 2.5-hour duration leaves your afternoon free for poolside relaxation'
    ],
    inclusions: [
      'Hotel pickup & return from any Sharm El Sheikh resort',
      'Semi-submarine cruise tickets and marine reserve admission',
      'Soft drink or chilled juice onboard',
      'English, Italian, & German marine narration'
    ],
    exclusions: [
      'Souvenir onboard photos'
    ],
    whatToBring: [
      'Camera or phone for aquarium-like coral photos',
      'Light jacket (A/C viewing deck is pleasantly cool)'
    ],
    badge: 'Family Favorite',
    coralSpot: 'Near Garden Marine Sanctuary'
  },
  {
    id: 'ras-um-sid-night-dive',
    title: 'Ras Um Sid Guided Night Scuba & Bioluminescence Dive',
    subtitle: 'Witness the surreal nighttime metamorphosis of the reef with glowing plankton and Spanish Dancers',
    category: 'diving',
    categoryLabel: 'Snorkeling & Diving',
    priceUSD: 70,
    originalPriceUSD: 95,
    duration: '3.5 Hours (18:30 - 22:00)',
    rating: 4.97,
    reviewsCount: 126,
    difficulty: 'Advanced',
    groupSize: 'Max 4 divers per divemaster',
    pickupZones: ['Naama Bay', 'Hadaba', "Shark's Bay", 'Ras Um Sid'],
    departureTime: '18:30 PM (Twilight)',
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'As twilight falls over the lighthouse of Ras Um Sid, the Red Sea transforms into an alien neon wonderland. Day fish retreat into coral nooks while nocturnal predators emerge: hunting moray eels slithering along the seafloor, active lionfish, feather stars unfurling their arms, and the legendary Spanish Dancer nudibranch. Switch off your dive torches at 10 meters depth and wave your hands to ignite millions of swirling bioluminescent plankton sparks.',
    highlights: [
      'Intimate dive master ratio of 1:4 for optimal safety and observation',
      'Encounter rare nocturnal marine life including Spanish Dancers & sleeping parrotfish',
      'Breathtaking bioluminescent plankton sparkle session in total darkness',
      'Ras Um Sid famous gorgonian fan coral forest illuminated by torches'
    ],
    inclusions: [
      'Hotel pickup & return in private diver van',
      'High-lumen primary underwater dive torch + backup torch',
      '12L aluminum tank, weights, and certified PADI Divemaster guide',
      'Warm Bedouin mint tea & debrief snacks after the dive'
    ],
    exclusions: [
      'Full BCD, regulator, and 5mm wetsuit rental ($15 package)'
    ],
    whatToBring: [
      'PADI Open Water certification card or logbook',
      'Warm clothes and windbreaker for after the dive'
    ],
    badge: 'Expert Pick',
    coralSpot: 'Ras Um Sid Lighthouse Reef'
  }
];

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: 'vip-private-transfer',
    name: 'VIP Private Mercedes Van Transfer',
    description: 'Skip group bus stops. Direct private transfer straight from your hotel lobby to the boat/camp.',
    priceUSD: 25
  },
  {
    id: 'gopro-4k-photo-pack',
    name: 'GoPro 4K Underwater Photo & Video Album',
    description: 'Our certified dive photographer will shoot 50+ high-res underwater photos & 4K video reel delivered to your phone.',
    priceUSD: 20
  },
  {
    id: 'premium-scuba-intro',
    name: 'Introductory 20-min Scuba Dive with Instructor',
    description: 'No license required! Dive down to 6-8 meters with your own dedicated PADI dive instructor.',
    priceUSD: 25
  },
  {
    id: 'wetsuit-thermal-pack',
    name: 'Premium 5mm Neoprene Wetsuit & Fin Upgrade',
    description: 'Guaranteed warm comfort during longer snorkeling/diving sessions with high-grade Cressi gear.',
    priceUSD: 8
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'James & Sarah Thornton',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    tourTitle: 'Ras Mohammed National Park & White Island Luxury Yacht',
    rating: 5,
    date: '3 days ago',
    comment: 'The absolute highlight of our two weeks in Sharm! The yacht was immaculate, the White Island sandbank felt like the Maldives in Egypt, and the grilled calamari lunch was fresh and delicious. Our guide Karim pointed out a pair of spotted eagle rays on the second snorkel reef. Booking was so seamless!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    country: 'Germany / Russia',
    countryFlag: '🇩🇪',
    tourTitle: 'Super Sinai VIP Desert Safari: Quads & Bedouin Feast',
    rating: 5,
    date: '1 week ago',
    comment: 'Riding quads at sunset through Echo Valley was unforgettable. We took the double buggy with our 10-year-old son who couldn’t stop smiling. The Bedouin dinner in the tent was very atmospheric, and looking through the telescope at Saturn’s rings out in the desert darkness was pure magic.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Marco Bellini',
    country: 'Italy',
    countryFlag: '🇮🇹',
    tourTitle: 'Straits of Tiran Scuba & Snorkel Safari: Jackson Reef',
    rating: 5,
    date: '2 weeks ago',
    comment: 'I have logged over 200 dives across the globe, and Jackson Reef with Love Egypt was world-class. Over 35m of visibility, vibrant soft corals, and great crew discipline. The Ramses AI concierge on the site even helped me select the right dive spot for my experience level.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Sophie Dupont',
    country: 'France',
    countryFlag: '🇫🇷',
    tourTitle: 'Mount Sinai Sunrise Pilgrimage & St. Catherine',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The sunrise above the Sinai peaks brought tears to my eyes. Yes, it was chilly at the summit so definitely take the advice from Ramses to pack layers, but drinking hot sweet Bedouin tea as the sun breached the clouds is an image I will treasure forever.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    verified: true
  }
];

export const CURRENT_CONDITIONS: MarineCondition = {
  waterTempC: 25.5,
  waterTempF: 78,
  airTempC: 30,
  airTempF: 86,
  visibilityMeters: 35,
  waveCondition: 'Calm - Flat Glass',
  windSpeedKnots: 7,
  windDirection: 'NNE (Gentle Breeze)',
  uvIndex: 7,
  tideStatus: 'High Tide Peaking (Optimal for Coral Walls)',
  diveSites: [
    {
      name: 'Shark & Yolanda Reef (Ras Mohammed)',
      zone: 'Ras Mohammed',
      status: 'Optimal',
      highlight: 'Massive schools of barracuda & pristine soft corals',
      depthMeters: '10m - 40m'
    },
    {
      name: 'Jackson Reef (Straits of Tiran)',
      zone: 'Tiran Straits',
      status: 'Optimal',
      highlight: '35m visibility, sea turtles & red sea anemone garden',
      depthMeters: '15m - 35m'
    },
    {
      name: 'The Blue Hole (Dahab)',
      zone: 'Dahab Coast',
      status: 'Very Good',
      highlight: 'Crystal calm lagoon, arch viewpoint & colorful bells',
      depthMeters: '5m - 100m+'
    },
    {
      name: 'Ras Um Sid Lighthouse',
      zone: 'Hadaba Sharm',
      status: 'Optimal',
      highlight: 'Giant gorgonian fan forest & shallow coral table',
      depthMeters: '8m - 25m'
    }
  ]
};

export const SHARM_HOTEL_ZONES = [
  'Naama Bay (Center & Promenade)',
  'Nabq Bay (Northern Lagoon & Resorts)',
  'Hadaba & Ras Um Sid (Cliffs & Diving Hub)',
  "Shark's Bay & Coral Bay (Airport & Tiran Views)",
  'Pasha Coast & Tower Bay'
];
