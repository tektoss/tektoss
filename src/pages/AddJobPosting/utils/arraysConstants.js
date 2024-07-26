export const educationLevels = () => [
  'No education needed',
  'High School',
  'GED',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctorate',
  'Other',
];

export const travelRequired = () => [
  'No travel needed',
  '0-20% travel',
  '20-50% travel',
  '50-75% travel',
  '75-100% travel',
];

export const jobType = () => [
  'Contract',
  'Onsite',
  'Freelance',
  'Full-Time',
  'Part-Time',
];

export const expertise = [
  // Expertise in Vehicles
  {
    label: 'Vehicles Repairs',
    id: 0,
    // Sub-expertise in Vehicles
    items: [
      {
        label: 'Mechanical Engine & Transmission',
        value: 'Mechanical Engine & Transmission',
        id: 10,
      },
      {
        label: 'Wiring, Lights',
        value: 'Wiring, Lights',
        id: 11,
      },
      {
        label: 'Body Work, Painting, Dent Repair',
        value: 'Body Work, Painting, Dent Repair',
        id: 12,
      },
      {
        label: 'Car Purchase Advice',
        value: 'Car Purchase Advice',
        id: 13,
      },
      {
        label: 'Auto Detailing',
        value: 'Auto Detailing',
        id: 14,
      },
      {
        label: 'Tire Repair/Replacement',
        value: 'Tire Repair/Replacement',
        id: 15,
      },
      {
        label: 'Brake System Repair',
        value: 'Brake System Repair',
        id: 16,
      },
      {
        label: 'Exhaust System Repair',
        value: 'Exhaust System Repair',
        id: 17,
      },
      {
        label: 'Suspension System Repair',
        value: 'Suspension System Repair',
        id: 18,
      },
      {
        label: 'Steering System Repair',
        value: 'Steering System Repair',
        id: 19,
      },
      {
        label: 'Diagnostic Services',
        value: 'Diagnostic Services',
        id: 20,
      },
      {
        label: 'Fuel System Repair',
        value: 'Fuel System Repair',
        id: 21,
      },
      {
        label: 'Vehicle Modification',
        value: 'Vehicle Modification',
        id: 22,
      },
      {
        label: 'Windshield/Glass Repair',
        value: 'Windshield/Glass Repair',
        id: 23,
      },
      {
        label: 'Vehicle Restoration',
        value: 'Vehicle Restoration',
        id: 24,
      },
    ],
  },

  {
    label: 'Plumbing',
    id: 1,
    items: [

      {
        label: 'Pipe Repair',
        value: 'Pipe Repair',
        id: 25,
      },
      {
        label: 'Drain Cleaning',
        value: 'Drain Cleaning',
        id: 26,
      },
      {
        label: 'Fixture Installation',
        value: 'Fixture Installation',
        id: 27,
      },
      {
        label: 'Water Heater Installation/Repair',
        value: 'Water Heater Installation/Repair',
        id: 28,
      },
      {
        label: 'Leak Detection',
        value: 'Leak Detection',
        id: 29,
      },
      {
        label: 'Sewer Line Repair/Replacement',
        value: 'Sewer Line Repair/Replacement',
        id: 30,
      },
      {
        label: 'Toilet Repair/Installation',
        value: 'Toilet Repair/Installation',
        id: 31,
      },
      {
        label: 'Water Filtration System Installation/Repair',
        value: 'Water Filtration System Installation/Repair',
        id: 32,
      }],
  },

  // Expertise in Electronics
  {
    label: 'Electronics Repairs',
    id: 2,
    // Sub-expertise in Electronics
    items: [
      {
        label: 'Computer Repair',
        value: 'Computer Repair',
        id: 33,
      },
      {
        label: 'Smartphone Repair',
        value: 'Smartphone Repair',
        id: 34,
      },
      {
        label: 'TV Repair',
        value: 'TV Repair',
        id: 35,
      },
      {
        label: 'Operating System Repair',
        value: 'Operating System Repair',
        id: 36,
      },
      {
        label: 'Circuit Board Repair',
        value: 'Circuit Board Repair',
        id: 37,
      },
      {
        label: 'Audio System Repair',
        value: 'Audio System Repair',
        id: 38,
      },
      {
        label: 'Video Game Console Repair',
        value: 'Video Game Console Repair',
        id: 39,
      },
      {
        label: 'Home Appliance Repair',
        value: 'Home Appliance Repair',
        id: 40,
      },
      {
        label: 'Camera Repair',
        value: 'Camera Repair',
        id: 41,
      },
      {
        label: 'Drone Repair',
        value: 'Drone Repair',
        id: 45,
      },
      {
        label: 'GPS Device Repair',
        value: 'GPS Device Repair',
        id: 46,
      },
      {
        label: 'Networking Equipment Repair',
        value: 'Networking Equipment Repair',
        id: 47,
      },
      {
        label: 'Tablet Repair',
        value: 'Tablet Repair',
        id: 48,
      },
      {
        label: 'Wearable Device Repair',
        value: 'Wearable Device Repair',
        id: 49,
      },
      {
        label: 'Printers/Scanners Repair',
        value: 'Printers/Scanners Repair',
        id: 50,
      },
    ],
  },
  {
    label: 'Dog Services',
    id: 3,
    // Sub-expertise in Dog Services
    items: [
      {
        label: 'Dog Walking',
        value: 'Dog Walking',
        id: 101,
      },
      {
        label: 'Pet Sitting',
        value: 'Pet Sitting',
        id: 102,
      },
      {
        label: 'Dog Grooming',
        value: 'Dog Grooming',
        id: 103,
      },
      {
        label: 'Dog Training',
        value: 'Dog Training',
        id: 104,
      },
      {
        label: 'Veterinary Services',
        value: 'Veterinary Services',
        id: 105,
      },
      // Add more sub-services here
    ],
  },
  {
    label: 'Home Repair Services',
    id: 4,
    // Sub-expertise in Home Repair Services
    items: [
      {
        label: 'Electrical Repairs',
        value: 'Electrical Repairs',
        id: 201,
      },
      {
        label: 'Plumbing Repairs',
        value: 'Plumbing Repairs',
        id: 202,
      },
      {
        label: 'Carpentry',
        value: 'Carpentry',
        id: 203,
      },
      {
        label: 'Painting',
        value: 'Painting',
        id: 204,
      },
      {
        label: 'Drywall Repair',
        value: 'Drywall Repair',
        id: 205,
      },
      // Add more sub-services here
    ],
  },
  {
    label: 'Carpentry',
    id: 5,
    // Sub-expertise in Carpentry
    items: [
      {
        label: 'Furniture Repair',
        value: 'Furniture Repair',
        id: 20301,
      },
      {
        label: 'Cabinet Making',
        value: 'Cabinet Making',
        id: 20302,
      },
      {
        label: 'Trim Work',
        value: 'Trim Work',
        id: 20303,
      },
      {
        label: 'Custom Woodworking',
        value: 'Custom Woodworking',
        id: 20304,
      },
      // Add more sub-services here
    ],
  },
  {
    label: 'Cleaning Services',
    id: 6,
    // Sub-expertise in Cleaning Services
    items: [
      {
        label: 'House Cleaning',
        value: 'House Cleaning',
        id: 301,
      },
      {
        label: 'Office Cleaning',
        value: 'Office Cleaning',
        id: 302,
      },
      {
        label: 'Carpet Cleaning',
        value: 'Carpet Cleaning',
        id: 303,
      },
      {
        label: 'Window Cleaning',
        value: 'Window Cleaning',
        id: 304,
      },
      {
        label: 'Deep Cleaning',
        value: 'Deep Cleaning',
        id: 305,
      },
      // Add more sub-services here
    ],
  },
  {
    label: 'Electrical Services',
    id: 7,
    items: [
      {
        label: 'Electrical Wiring',
        value: 'Electrical Wiring',
        id: 11,
      },
      {
        label: 'Lighting Installation',
        value: 'Lighting Installation',
        id: 12,
      },
      {
        label: 'Electrical Appliance Repair',
        value: 'Electrical Appliance Repair',
        id: 13,
      },
      {
        label: 'Circuit Breaker Installation/Repair',
        value: 'Circuit Breaker Installation/Repair',
        id: 14,
      },
      {
        label: 'Generator Installation/Repair',
        value: 'Generator Installation/Repair',
        id: 15,
      },
      // Add more specific services as needed
    ],
  },
  {
    label: 'Landscaping/Gardening Services',
    id: 8,
    items: [
      { label: 'Lawn Maintenance', id: 21, value: 'Lawn Maintenance' },
      { label: 'Garden Design', id: 22, value: 'Garden Design' },
      { label: 'Tree Trimming/Removal', id: 23, value: 'Tree Trimming/Removal' },
      { label: 'Irrigation System Installation/Repair', id: 24, value: 'Irrigation System Installation/Repair' },
      { label: 'Landscaping Construction', id: 25, value: 'Landscaping Construction' },
      // Add more specific services as needed
    ],
  },
  {
    label: 'HVAC (Heating, Ventilation, and Air Conditioning)',
    id: 9,
    items: [
      { label: 'AC Installation/Repair', id: 31, value: 'AC Installation/Repair' },
      { label: 'Heating System Installation/Repair', id: 32, value: 'Heating System Installation/Repair' },
      { label: 'Ventilation System Installation/Repair', id: 33, value: 'Ventilation System Installation/Repair' },
      { label: 'Indoor Air Quality Assessment', id: 34, value: 'Indoor Air Quality Assessment' },
      // Add more specific services as needed
    ],
  },
  {
    label: 'Pest Control',
    id: 10,
    items: [
      { label: 'Insect Control', id: 41, value: 'Insect Control' },
      { label: 'Rodent Control', id: 42, value: 'Rodent Control' },
      { label: 'Termite Treatment', id: 43, value: 'Termite Treatment' },
      { label: 'Wildlife Removal', id: 44, value: 'Wildlife Removal' },
      // Add more specific services as needed
    ],
  },
  {
    label: 'Roofing Services',
    id: 11,
    items: [
      { label: 'Roof Installation/Replacement', id: 51, value: 'Roof Installation/Replacement' },
      { label: 'Roof Repair/Maintenance', id: 52, value: 'Roof Repair/Maintenance' },
      { label: 'Gutter Installation/Cleaning', id: 53, value: 'Gutter Installation/Cleaning' },
      { label: 'Roof Inspection', id: 54, value: 'Roof Inspection' },
      // Add more specific services as needed
    ],
  },

  // Add more expertise categories here if needed
];

export const jobitems = [
  // Expertise in Vehicles
  {
    name: 'Type of Job',
    id: 100,
    // Sub-expertise in Vehicles
    children: [
      {
        name: 'Part-Time',
        id: 101,
      },
      {
        name: 'Full-Time',
        id: 102,
      },
      {
        name: 'Remote',
        id: 103,
      },
      {
        name: 'OnSite',
        id: 104,
      },
      {
        name: 'Hybrid',
        id: 110,
      },

      {
        name: 'Contract',
        id: 105,
      },
      {
        name: 'Freelance',
        id: 106,
      },
      {
        name: 'Commission-based',
        id: 107,
      },
      {
        name: 'Temporary',
        id: 108,
      },

    ],
  },
];

// const educationLevels = [
//   'No education needed',
//   'High School',
//   'GED',
//   'Associate Degree',
//   'Bachelor\'s Degree',
//   'Master\'s Degree',
//   'Doctorate',
//   'Other',
// ];

// const travelRequired = [
//   'No travel needed',
//   '0-20% travel',
//   '20-50% travel',
//   '50-75% travel',
//   '75-100% travel',
// ];
