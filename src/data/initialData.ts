import { CollectionRecord, IncidentReport, WasteGuideItem, WorkerProfile, ResidentProfile, AdminProfile } from '../types';

export const DEMO_RESIDENT: ResidentProfile = {
  id: 'RES-204',
  name: 'Aarav Sharma',
  building: 'Building A',
  flat: 'Flat 204',
  phone: '+91 98201 44521'
};

export const DEMO_WORKERS: WorkerProfile[] = [
  {
    id: 'WKR-101',
    name: 'Ramesh Patil',
    phone: '+91 94220 89123',
    assignedSector: 'Sector 1 (Blocks A, B, C)',
    avatar: 'RP'
  },
  {
    id: 'WKR-102',
    name: 'Suresh Kumar',
    phone: '+91 97115 33490',
    assignedSector: 'Sector 2 (Civic Amenities & Central Bay)',
    avatar: 'SK'
  }
];

export const DEMO_ADMIN: AdminProfile = {
  id: 'ADM-01',
  name: 'Priya Deshmukh',
  roleTitle: 'Society Facility Director',
  societyName: 'Green Oaks Cooperative Housing Society'
};

export const INITIAL_COLLECTIONS: CollectionRecord[] = [
  {
    id: 'COL-201',
    collectionPoint: 'Building A - Chute Floor 1-4',
    building: 'Building A',
    wasteStream: 'Wet Waste',
    scheduledDate: 'Today',
    scheduledTime: '07:30 AM',
    assignedWorkerId: 'WKR-101',
    assignedWorkerName: 'Ramesh Patil',
    status: 'Completed',
    completedAt: '07:42 AM',
    instructions: 'Collect from green segregated bins only. Verify household liners are compostable.'
  },
  {
    id: 'COL-202',
    collectionPoint: 'Building A - Chute Floor 5-8',
    building: 'Building A',
    wasteStream: 'Dry Waste',
    scheduledDate: 'Today',
    scheduledTime: '08:15 AM',
    assignedWorkerId: 'WKR-101',
    assignedWorkerName: 'Ramesh Patil',
    status: 'In Progress',
    instructions: 'Flatten carton boxes before loading into the blue compactor trolley.'
  },
  {
    id: 'COL-203',
    collectionPoint: 'Building B - Ground Collection Room',
    building: 'Building B',
    wasteStream: 'Wet Waste',
    scheduledDate: 'Today',
    scheduledTime: '08:45 AM',
    assignedWorkerId: 'WKR-101',
    assignedWorkerName: 'Ramesh Patil',
    status: 'Pending',
    instructions: 'Check bin seals. Ensure no plastic carry bags are mixed into wet drum.'
  },
  {
    id: 'COL-204',
    collectionPoint: 'Building B - Podium Chutes',
    building: 'Building B',
    wasteStream: 'Dry Waste',
    scheduledDate: 'Today',
    scheduledTime: '09:30 AM',
    assignedWorkerId: 'WKR-101',
    assignedWorkerName: 'Ramesh Patil',
    status: 'Pending',
    instructions: 'Check paper recyclables for moisture damage.'
  },
  {
    id: 'COL-205',
    collectionPoint: 'Building C - Central Basement Bay',
    building: 'Building C',
    wasteStream: 'Wet Waste',
    scheduledDate: 'Today',
    scheduledTime: '10:00 AM',
    assignedWorkerId: 'WKR-101',
    assignedWorkerName: 'Ramesh Patil',
    status: 'Pending',
    instructions: 'Transfer to municipal composting truck bay 2.'
  },
  {
    id: 'COL-206',
    collectionPoint: 'Community Hall & Clubhouse',
    building: 'Community Hall',
    wasteStream: 'Dry Waste',
    scheduledDate: 'Today',
    scheduledTime: '10:45 AM',
    assignedWorkerId: 'WKR-102',
    assignedWorkerName: 'Suresh Kumar',
    status: 'Completed',
    completedAt: '10:55 AM',
    instructions: 'High volume of beverage cans and disposable paper cups after society meeting.'
  },
  {
    id: 'COL-207',
    collectionPoint: 'Central E-Waste & Hazardous Locker',
    building: 'Central Collection Bay',
    wasteStream: 'Special Waste',
    scheduledDate: 'Today',
    scheduledTime: '11:15 AM',
    assignedWorkerId: 'WKR-102',
    assignedWorkerName: 'Suresh Kumar',
    status: 'Pending',
    instructions: 'Inspect battery terminals for insulation tape. Keep e-waste moisture-free.'
  },
  {
    id: 'COL-208',
    collectionPoint: 'Building C - North Wing Chute',
    building: 'Building C',
    wasteStream: 'Dry Waste',
    scheduledDate: 'Today',
    scheduledTime: '11:45 AM',
    assignedWorkerId: 'WKR-102',
    assignedWorkerName: 'Suresh Kumar',
    status: 'Pending',
    instructions: 'Inspect cardboard stacks.'
  },
  {
    id: 'COL-209',
    collectionPoint: 'Children Park & Garden Bay',
    building: 'Gardens & Amenities',
    wasteStream: 'Wet Waste',
    scheduledDate: 'Today',
    scheduledTime: '12:15 PM',
    assignedWorkerId: 'WKR-102',
    assignedWorkerName: 'Suresh Kumar',
    status: 'Completed',
    completedAt: '12:28 PM',
    instructions: 'Organic horticulture clippings & fallen leaves for vermicompost pit.'
  },
  {
    id: 'COL-210',
    collectionPoint: 'Building A - Service Lift Bay',
    building: 'Building A',
    wasteStream: 'Special Waste',
    scheduledDate: 'Today',
    scheduledTime: '02:00 PM',
    assignedWorkerId: 'WKR-101',
    assignedWorkerName: 'Ramesh Patil',
    status: 'Pending',
    instructions: 'Quarterly tube light & CFL bulb safe collection box.'
  }
];

export const INITIAL_INCIDENTS: IncidentReport[] = [
  {
    id: 'INC-1001',
    reporterRole: 'resident',
    reporterName: 'Aarav Sharma',
    reporterId: 'RES-204',
    reporterUnit: 'Building A, Flat 204',
    issueType: 'Wet and dry waste mixed during collection',
    location: 'Building A, 2nd Floor Chute',
    building: 'Building A',
    wasteStream: 'Wet Waste',
    description: 'Noticed worker emptying both the green organic bin and blue cardboard bin into a single pushcart hopper during the morning round.',
    reportedAt: 'Today, 07:45 AM',
    status: 'Under Review',
    photoUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80',
    photoName: 'chute_mixed_waste.jpg',
    administrativeNotes: 'Supervisor verified with floor housekeeper. Reminder issued to use dual-compartment partition.',
    correctiveAction: 'Dual-bin divider checked and fixed on Trolley #3.',
    timeline: [
      {
        id: 'TL-1',
        timestamp: '07:45 AM',
        title: 'Report Submitted',
        description: 'Resident reported waste mixing at Building A floor 2.',
        author: 'Aarav Sharma',
        role: 'resident'
      },
      {
        id: 'TL-2',
        timestamp: '08:10 AM',
        title: 'Review Initiated',
        description: 'Admin assigned supervisor to inspect morning collection trolley.',
        author: 'Priya Deshmukh',
        role: 'admin'
      }
    ]
  },
  {
    id: 'INC-1002',
    reporterRole: 'worker',
    reporterName: 'Ramesh Patil',
    reporterId: 'WKR-101',
    issueType: 'Waste not segregated at source',
    location: 'Building B, Ground Collection Room',
    building: 'Building B',
    wasteStream: 'Wet Waste',
    description: 'Found 4 unsegregated plastic carrier bags containing wet kitchen food remnants thrown inside the dry recyclables hamper.',
    reportedAt: 'Yesterday, 04:15 PM',
    status: 'Action Planned',
    administrativeNotes: 'Notice drafted for Building B residents. Ground floor CCTV being reviewed.',
    correctiveAction: 'Displaying bilingual segregation signage above Building B ground bins.',
    timeline: [
      {
        id: 'TL-3',
        timestamp: 'Yesterday, 04:15 PM',
        title: 'Report Submitted',
        description: 'Worker reported non-segregated bags in dry hamper.',
        author: 'Ramesh Patil',
        role: 'worker'
      },
      {
        id: 'TL-4',
        timestamp: 'Yesterday, 05:30 PM',
        title: 'Action Planned',
        description: 'Society committee approved installation of laminated bilingual pictorial signs.',
        author: 'Priya Deshmukh',
        role: 'admin'
      }
    ]
  },
  {
    id: 'INC-1003',
    reporterRole: 'resident',
    reporterName: 'Meera Iyer',
    reporterId: 'RES-302',
    reporterUnit: 'Building B, Flat 302',
    issueType: 'Wet and dry waste mixed during collection',
    location: 'Building B, Service Elevator Area',
    building: 'Building B',
    wasteStream: 'Wet Waste',
    description: 'Collection staff poured segregated dry paper bin into the wet drum to finish round quickly before 9 AM.',
    reportedAt: '2 days ago, 08:50 AM',
    status: 'Pending Review',
    administrativeNotes: 'Repeated issue flagged at Building B. High priority for audit.',
    timeline: [
      {
        id: 'TL-5',
        timestamp: '2 days ago, 08:50 AM',
        title: 'Report Submitted',
        description: 'Resident observed mixing during quick morning turnaround.',
        author: 'Meera Iyer',
        role: 'resident'
      }
    ]
  },
  {
    id: 'INC-1004',
    reporterRole: 'worker',
    reporterName: 'Suresh Kumar',
    reporterId: 'WKR-102',
    issueType: 'Collection point inaccessible',
    location: 'Building C, Central Basement Bay',
    building: 'Building C',
    wasteStream: 'Dry Waste',
    description: 'Contractor renovation debris and scaffold poles blocking access ramp to dry waste bins.',
    reportedAt: '2 days ago, 11:20 AM',
    status: 'Resolved',
    administrativeNotes: 'Estate manager warned contractor. Ramp cleared within 2 hours.',
    correctiveAction: 'Ramp cleared, safety cones installed.',
    timeline: [
      {
        id: 'TL-6',
        timestamp: '2 days ago, 11:20 AM',
        title: 'Report Submitted',
        description: 'Access ramp obstructed by construction materials.',
        author: 'Suresh Kumar',
        role: 'worker'
      },
      {
        id: 'TL-7',
        timestamp: '2 days ago, 01:15 PM',
        title: 'Resolved',
        description: 'Contractor cleared ramp and reinstated clear access corridor.',
        author: 'Priya Deshmukh',
        role: 'admin'
      }
    ]
  },
  {
    id: 'INC-1005',
    reporterRole: 'resident',
    reporterName: 'Rohit Kulkarni',
    reporterId: 'RES-501',
    reporterUnit: 'Building B, Flat 501',
    issueType: 'Collection missed',
    location: 'Building B, 5th Floor Chute',
    building: 'Building B',
    wasteStream: 'Dry Waste',
    description: 'Dry waste bin was not cleared on Thursday schedule. Bin is overflowing into the corridor.',
    reportedAt: '3 days ago, 06:10 PM',
    status: 'Resolved',
    administrativeNotes: 'Relief worker had missed 5th floor due to lift maintenance. Cleared via auxiliary run.',
    correctiveAction: 'Auxiliary evening run completed.',
    timeline: [
      {
        id: 'TL-8',
        timestamp: '3 days ago, 06:10 PM',
        title: 'Report Submitted',
        description: 'Missed collection logged by resident.',
        author: 'Rohit Kulkarni',
        role: 'resident'
      },
      {
        id: 'TL-9',
        timestamp: '3 days ago, 07:30 PM',
        title: 'Resolved',
        description: 'Special round completed by evening relief staff.',
        author: 'Priya Deshmukh',
        role: 'admin'
      }
    ]
  },
  {
    id: 'INC-1006',
    reporterRole: 'resident',
    reporterName: 'Aarav Sharma',
    reporterId: 'RES-204',
    reporterUnit: 'Building A, Flat 204',
    issueType: 'Waste category handled incorrectly',
    location: 'Building A, Ground Floor Foyer',
    building: 'Building A',
    wasteStream: 'Special Waste',
    description: 'Dead lithium-ion batteries left on top of the organic bin rather than deposited in the dedicated red hazard box.',
    reportedAt: '4 days ago, 09:15 AM',
    status: 'Resolved',
    administrativeNotes: 'Housekeeping retrieved batteries and safely stored them in the battery locker.',
    correctiveAction: 'Moved battery box to high-visibility security desk location.',
    timeline: [
      {
        id: 'TL-10',
        timestamp: '4 days ago, 09:15 AM',
        title: 'Report Submitted',
        description: 'Special hazard items left on organic lid.',
        author: 'Aarav Sharma',
        role: 'resident'
      },
      {
        id: 'TL-11',
        timestamp: '4 days ago, 10:00 AM',
        title: 'Resolved',
        description: 'Batteries transferred to hazard box; relocation completed.',
        author: 'Priya Deshmukh',
        role: 'admin'
      }
    ]
  }
];

export const WASTE_GUIDE_ITEMS: WasteGuideItem[] = [
  {
    id: 'WG-1',
    name: 'Vegetable & Fruit Peels',
    category: 'Wet Waste',
    subCategory: 'Kitchen Organics',
    instructions: 'Drain excess water and dispose directly in the green biodegradable bin. Do not bag in regular plastic.',
    iconName: 'Apple',
    doAndDont: {
      dos: ['Remove plastic stickers from fruit skins', 'Wrap in newspaper or compostable bag if necessary'],
      donts: ['Never put plastic bags or cling wrap in the wet bin']
    }
  },
  {
    id: 'WG-2',
    name: 'Leftover Food & Cooked Rice',
    category: 'Wet Waste',
    subCategory: 'Cooked Food',
    instructions: 'Keep separate from dry packaging. Suitable for community organic bio-composting.',
    iconName: 'Soup',
    doAndDont: {
      dos: ['Drain thick gravy or liquids before binning', 'Keep bin lid tightly closed'],
      donts: ['Do not mix plastic cutlery or aluminum foil']
    }
  },
  {
    id: 'WG-3',
    name: 'Tea Bags & Coffee Grounds',
    category: 'Wet Waste',
    subCategory: 'Kitchen Organics',
    instructions: 'Ensure synthetic mesh or staple pins are removed before disposing in the wet bin.',
    iconName: 'Coffee',
    doAndDont: {
      dos: ['Excellent for society garden vermiculture'],
      donts: ['Remove metal staples from luxury tea bags']
    }
  },
  {
    id: 'WG-4',
    name: 'Newspaper & Office Paper',
    category: 'Dry Waste',
    subCategory: 'Paper Recyclables',
    instructions: 'Keep dry and flat. Tie with twine or store in a carton box for the dry collection round.',
    iconName: 'Newspaper',
    doAndDont: {
      dos: ['Keep paper dry and free of food grease'],
      donts: ['Do not include soiled paper towels or greasy pizza boxes']
    }
  },
  {
    id: 'WG-5',
    name: 'Cardboard & Delivery Boxes',
    category: 'Dry Waste',
    subCategory: 'Packaging Material',
    instructions: 'Flatten all corrugated boxes to conserve bin volume. Remove plastic packing tape.',
    iconName: 'Package',
    doAndDont: {
      dos: ['Flatten cartons fully before chute deposit', 'Remove shipping bubble wrap'],
      donts: ['Do not dispose damp or moldy cartons in dry stream']
    }
  },
  {
    id: 'WG-6',
    name: 'Clean Plastic Bottles (PET)',
    category: 'Dry Waste',
    subCategory: 'Plastics',
    instructions: 'Empty liquids, rinse briefly, and crush to reduce size. Subject to local municipal recyclability rules.',
    iconName: 'Milk',
    doAndDont: {
      dos: ['Rinse out residual milk/oil/juice', 'Replace screw cap so it gets recycled too'],
      donts: ['Do not mix dirty sauce packets or greasy films']
    }
  },
  {
    id: 'WG-7',
    name: 'Glass Bottles & Jars',
    category: 'Dry Waste',
    subCategory: 'Glass',
    instructions: 'Rinse cleanly. Handle carefully to prevent breakage. Place gently in the blue bin crate.',
    iconName: 'Wine',
    doAndDont: {
      dos: ['Rinse sauce jars with leftover dishwater', 'Remove metal lids and put in dry metal stream'],
      donts: ['Do not mix broken window panes or light bulbs with bottle glass']
    }
  },
  {
    id: 'WG-8',
    name: 'Household Batteries (AA/AAA/9V)',
    category: 'Special Waste',
    subCategory: 'Hazardous Chemicals',
    instructions: 'Tape terminals with clear tape to prevent short circuits. Hand over only at the designated Red Special Box.',
    iconName: 'BatteryCharging',
    doAndDont: {
      dos: ['Drop at Central Bay Hazardous Locker or security desk container', 'Keep out of reach of children'],
      donts: ['NEVER dispose in household wet or dry bins — fire & toxic hazard!']
    }
  },
  {
    id: 'WG-9',
    name: 'Electronic Accessories & Cables',
    category: 'Special Waste',
    subCategory: 'E-Waste',
    instructions: 'Old phone chargers, USB cables, earphones, and circuit boards. Stored for authorized e-waste recyclers.',
    iconName: 'Cpu',
    doAndDont: {
      dos: ['Bundle cables neatly', 'Hand over to bi-weekly e-waste drive'],
      donts: ['Do not burn or discard in municipal dry compactors']
    }
  },
  {
    id: 'WG-10',
    name: 'Fluorescent Tubes & CFL Bulbs',
    category: 'Special Waste',
    subCategory: 'Mercury / Toxic',
    instructions: 'Contains toxic mercury vapor. Keep intact in original sleeve or wrap in bubble wrap for drop-off.',
    iconName: 'Lightbulb',
    doAndDont: {
      dos: ['Deliver directly to building supervisor or special collection locker'],
      donts: ['Never throw down building garbage chutes where they will shatter']
    }
  }
];
