// Centralized Mock Data for LEME App

export const USER_PROFILE = {
    name: 'Muhammad Nazir',
    age: 32,
    gender: 'Male',
    eid: '784-1992-3847261-7',
    role: 'Business Owner',
    lastLogin: 'Dubai, UAE',
    sponsorshipTotal: '125,750', // AED
};

export const BUSINESS_INFO = {
    name: 'LEME Tech Solutions',
    tradeLicense: 'DED-784529-2024',
    status: 'Active',
    established: 'Jan 2024',
    employees: 12,
};

export const SPONSORSHIP_LEDGER = [
    {
        id: 'dep1',
        name: 'Layla Nazir',
        relation: 'Spouse',
        visaStatus: 'Valid until Dec 2027',
        statusColor: 'success',
        emiratesId: '784-1994-2847391-3'
    },
    {
        id: 'dep2',
        name: 'Zaid Nazir',
        relation: 'Child',
        visaStatus: 'Renewing',
        statusColor: 'warning',
        emiratesId: '784-2020-8847521-1'
    },
];

export const FINANCIAL_OVERVIEW = {
    total: '125,750',
    breakdown: [
        { id: 'fin1', category: 'Visa Fees', amount: '45,000', icon: 'file-text' },
        { id: 'fin2', category: 'Office Rent', amount: '60,000', icon: 'building' },
        { id: 'fin3', category: 'Health Insurance', amount: '20,750', icon: 'heart-pulse' },
    ]
};

export const GOVERNMENT_INSIGHTS = [
    {
        id: 'news1',
        title: 'New Freelance Visa Rules',
        summary: 'Remote work permits now available for digital nomads',
        date: 'Jan 18, 2026',
        tag: 'Policy Update'
    },
    {
        id: 'news2',
        title: 'Corporate Tax Deadlines',
        summary: 'Q1 2026 filing deadline extended to March 31',
        date: 'Jan 15, 2026',
        tag: 'Tax'
    },
    {
        id: 'news3',
        title: 'Golden Visa Expansion',
        summary: 'New eligibility criteria for 10-year residency',
        date: 'Jan 10, 2026',
        tag: 'Immigration'
    },
];

export const UTILITY_SERVICES = [
    { id: 'util1', title: 'Parking', icon: 'car', type: 'parking' },
    { id: 'util2', title: 'Fines', icon: 'alert-circle', type: 'fines' },
    { id: 'util3', title: 'DEWA', icon: 'zap', type: 'utilities' },
    { id: 'util4', title: 'Salik', icon: 'radio', type: 'tolls' },
    { id: 'util5', title: 'RTA', icon: 'bus', type: 'transport' },
    { id: 'util6', title: 'DHA', icon: 'heart', type: 'health' },
    { id: 'util7', title: 'DEWA Bills', icon: 'file-text', type: 'bills' },
    { id: 'util8', title: 'Telecom', icon: 'smartphone', type: 'telecom' },
];

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
    mapImage: 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/55.3687,25.2694,14,0/600x400?access_token=pk.mock',
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
    title: 'Business License Renewal',
    subtitle: 'Trade License Update',
    progress: 0.75,
    status: 'In Progress',
    deadline: 'Feb 15, 2026',
};

export const QUICK_ACTIONS = [
    { id: 'qa1', title: 'Scan QR', icon: 'scan', type: 'scan' },
    { id: 'qa2', title: 'Pay Fees', icon: 'credit-card', type: 'payment' },
    { id: 'qa3', title: 'Track ID', icon: 'map-pin', type: 'track' },
];

export const LIFE_EVENTS = [
    {
        id: 'le1',
        title: 'Having a Baby',
        icon: 'baby',
        desc: 'Birth Cert & Insurance',
        checklist: [
            { id: 1, title: 'Birth Notification', description: 'Hospital issues notification', is_completed: true },
            { id: 2, title: 'Birth Certificate', description: 'Apply via MOHAP', is_completed: false },
            { id: 3, title: 'Emirates ID (Newborn)', description: 'Register within 120 days', is_completed: false },
            { id: 4, title: 'Health Insurance', description: 'Link to parents policy', is_completed: false }
        ]
    },
    {
        id: 'le2',
        title: 'Moving Cities',
        icon: 'map-pin',
        desc: 'Utilities & Tawtheeq',
        checklist: [
            { id: 1, title: 'Tawtheeq / Ejari', description: 'Register tenancy contract', is_completed: true },
            { id: 2, title: 'Utility Transfer (DEWA/SEWA)', description: 'Move electricity & water', is_completed: false },
            { id: 3, title: 'Update Emirates ID', description: 'Update residential address', is_completed: false },
            { id: 4, title: 'School District Notification', description: 'Transfer student files', is_completed: false }
        ]
    },
    {
        id: 'le3',
        title: 'Job Search',
        icon: 'search',
        desc: 'Career Listings',
        checklist: [
            { id: 1, title: 'Update Resume', description: 'Upload to national portal', is_completed: false },
            { id: 2, title: 'Attest Degrees', description: 'MOFA attestation', is_completed: false }
        ]
    },
    {
        id: 'le4',
        title: 'Vehicle Reg',
        icon: 'car',
        desc: 'Renewal & Fines',
        checklist: [
            { id: 1, title: 'Vehicle Inspection', description: 'Pass technical test', is_completed: false },
            { id: 2, title: 'Pay Traffic Fines', description: 'Clear all pending fines', is_completed: false }
        ]
    },
    {
        id: 'le5',
        title: 'Starting Business',
        icon: 'briefcase',
        desc: 'License & Setup',
        checklist: [
            { id: 1, title: 'Business Name Approval', description: 'Reserve company name', is_completed: false },
            { id: 2, title: 'Initial Approval', description: 'Department of Economic Development', is_completed: false }
        ]
    },
    {
        id: 'le6',
        title: 'Marriage',
        icon: 'heart',
        desc: 'Certificate & Registration',
        checklist: [
            { id: 1, title: 'Marriage Certificate', description: 'MOHAP attestation', is_completed: false },
            { id: 2, title: 'Sponsor Registration', description: 'Add spouse to visa', is_completed: false }
        ]
    },
    {
        id: 'le7',
        title: 'Starting University',
        icon: 'book-open',
        desc: 'Enrollment & Visa',
        checklist: [
            { id: 1, title: 'Student Visa Application', description: 'Apply for student residence permit', is_completed: false },
            { id: 2, title: 'University Registration', description: 'Complete enrollment forms', is_completed: false }
        ]
    },
    {
        id: 'le8',
        title: 'Buying Property',
        icon: 'home',
        desc: 'Ownership Registration',
        checklist: [
            { id: 1, title: 'Title Deed Transfer', description: 'Register property with DLD', is_completed: false },
            { id: 2, title: 'Mortgage Registration', description: 'Bank financing documentation', is_completed: false }
        ]
    },
    {
        id: 'le9',
        title: 'Retiring',
        icon: 'palmtree',
        desc: 'Pension & Long Stay',
        checklist: [
            { id: 1, title: 'Retirement Visa', description: 'Apply for long-term residence', is_completed: false },
            { id: 2, title: 'Pension Registration', description: 'Social security benefits', is_completed: false }
        ]
    },
    {
        id: 'le10',
        title: 'Getting Divorced',
        icon: 'users',
        desc: 'Legal Procedures',
        checklist: [
            { id: 1, title: 'Divorce Certificate', description: 'Court attestation', is_completed: false },
            { id: 2, title: 'Sponsorship Transfer', description: 'Update visa dependencies', is_completed: false }
        ]
    },
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
        estimatedDate: 'Ready by Feb 15',
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
