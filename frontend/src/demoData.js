// Centralized Mock Data for LEME App

export const USER_PROFILE = {
    name: 'Ahmed Al-Mansouri',
    age: 28,
    gender: 'Male',
    eid: '784-1998-8472913-9',
    role: 'Entrepreneur',
    lastLogin: 'Sharjah, UAE',
    sponsorshipTotal: '42,500', // AED
    dependents: [
        { id: 'dep1', name: 'Fatima Al-Mansouri', relation: 'Spouse', status: 'Active', statusColor: 'success' },
        { id: 'dep2', name: 'Zayed Al-Mansouri', relation: 'Child', status: 'School Enrollment Pending', statusColor: 'warning' },
    ]
};

export const PAYMENT_DATA = {
    totalDue: '1,250.00',
    fees: [
        { id: 'f1', title: 'ID Card Renewal', amount: '370.00' },
        { id: 'f2', title: 'Knowledge Fee', amount: '10.00' },
        { id: 'f3', title: 'Express Service', amount: '150.00' },
        { id: 'f4', title: 'Health Insurance Deposit', amount: '720.00' },
    ]
};

export const TRACKING_DATA = {
    documentTitle: 'Passport Renewal',
    currentLocation: 'Federal Authority for Identity & Citizenship',
    status: 'Out for Delivery',
    mapImage: 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/55.3687,25.2694,14,0/600x400?access_token=pk.mock', // Placeholder for concept
    steps: [
        { title: 'Application Submitted', date: 'Jan 15, 09:00 AM', completed: true },
        { title: 'Biometrics Verified', date: 'Jan 16, 11:30 AM', completed: true },
        { title: 'Processing at HQ', date: 'Jan 17, 02:15 PM', completed: true },
        { title: 'Out for Delivery', date: 'Today, 08:00 AM', completed: true, active: true },
        { title: 'Delivered', date: 'Estimated: Today, 05:00 PM', completed: false },
    ]
};

export const ACTIVE_JOURNEY = {
    id: 'j1',
    title: 'Business Setup',
    subtitle: 'Main License Issuance',
    progress: 0.65,
    status: 'In Progress',
    deadline: 'Jan 25, 2026',
};

export const QUICK_ACTIONS = [
    { id: 'qa1', title: 'Scan QR', icon: 'scan', type: 'scan' },
    { id: 'qa2', title: 'Pay Fees', icon: 'credit-card', type: 'payment' },
    { id: 'qa3', title: 'Track ID', icon: 'map-pin', type: 'track' },
];

export const LIFE_EVENTS = [
    { id: 'le1', title: 'Having a Baby', icon: 'baby', desc: 'Birth Cert & Insurance' },
    { id: 'le2', title: 'Moving Cities', icon: 'map-pin', desc: 'Utilities & Tawtheeq' },
    { id: 'le3', title: 'Job Search', icon: 'search', desc: 'Career Listings' },
    { id: 'le4', title: 'Vehicle Reg', icon: 'car', desc: 'Renewal & Fines' },
];

export const DOCUMENTS = {
    expiryAlerts: [
        { id: 'd1', title: 'Passport', daysLeft: 45, status: 'warning' },
        { id: 'd2', title: 'Visa', daysLeft: 10, status: 'critical' },
    ],
    folders: [
        { id: 'f1', title: 'Personal IDs', count: 4 },
        { id: 'f2', title: 'Work & Tax', count: 8 },
        { id: 'f3', title: 'Health', count: 2 },
        { id: 'f4', title: 'Travel', count: 5 },
    ],
    history: [
        { id: 'h1', title: 'Tenancy Contract', date: 'Signed Jan 15' },
        { id: 'h2', title: 'Offer Letter', date: 'Signed Jan 12' },
    ]
};

export const SEARCH_DATA = {
    trending: ['Golden Visa', 'Winter Subsidy', 'Student Grants', 'Remote Work'],
    faqs: [
        { id: 'q1', question: 'How to renew driver license?' },
        { id: 'q2', question: 'Registering a newborn?' },
        { id: 'q3', question: 'Pay traffic fines?' },
    ]
};

export const ACTIVITY_TIMELINE = [
    {
        id: 't1',
        title: 'Business License',
        status: 'Security Check (Active)',
        estimatedDate: 'Ready by Jan 25',
        steps: [
            { label: 'Submitted', active: true, completed: true },
            { label: 'Security Check', active: true, completed: false },
            { label: 'Dept. Approval', active: false, completed: false },
            { label: 'Issuance', active: false, completed: false },
        ]
    },
    {
        id: 't2',
        title: 'Visa Sponsorship',
        status: 'Approved',
        estimatedDate: 'Completed Jan 10',
        steps: [
            { label: 'Submitted', active: false, completed: true },
            { label: 'Medical', active: false, completed: true },
            { label: 'Stamping', active: false, completed: true },
            { label: 'Delivered', active: true, completed: true },
        ]
    }
];
