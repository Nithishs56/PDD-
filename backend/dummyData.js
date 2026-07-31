// ─── Auth Credentials ────────────────────────────────────────────────────────
export const driverAccounts = [
  {
    id: 1,
    name: 'Rajan Kumar',
    email: 'rajan@cit.edu',
    password: 'driver123',
    role: 'driver',
    bus: 'TN01AB1234',
    route: 'Route 1',
    phone: '+91 98765 43210',
    institution: 'Chennai Institute of Technology',
  },
  {
    id: 2,
    name: 'Kumar S',
    email: 'kumar@cit.edu',
    password: 'driver222',
    role: 'driver',
    bus: 'TN03EF9012',
    route: 'Route 2',
    phone: '+91 91234 88776',
    institution: 'Chennai Institute of Technology',
  },
  {
    id: 3,
    name: 'Preetham V',
    email: 'preetham@cit.edu',
    password: 'driver888',
    role: 'driver',
    bus: 'TN08JK5678',
    route: 'Route 8',
    phone: '+91 99887 77665',
    institution: 'Chennai Institute of Technology',
  },
];

export const studentAccounts = [
  {
    id: 1,
    name: 'Ravi Kumar',
    email: 'ravi@cit.edu',
    password: 'student123',
    role: 'student',
    route: 'Route 1',
    stop: 'Tambaram',
    roll: 'CIT-2023-CS08',
    parentPhone: '+91 91234 56789',
    institution: 'Chennai Institute of Technology',
  },
  {
    id: 2,
    name: 'Kiran S',
    email: 'kiran@cit.edu',
    password: 'kiran123',
    role: 'student',
    route: 'Route 2',
    stop: 'Velachery',
    roll: 'CIT-2023-EC14',
    parentPhone: '+91 99008 81122',
    institution: 'Chennai Institute of Technology',
  },
  {
    id: 3,
    name: 'Ananya R',
    email: 'ananya@cit.edu',
    password: 'ananya123',
    role: 'student',
    route: 'Route 1',
    stop: 'Chromepet',
    roll: 'CIT-2023-IT03',
    parentPhone: '+91 98112 23344',
    institution: 'Chennai Institute of Technology',
  },
  {
    id: 4,
    name: 'Dinesh K',
    email: 'dinesh@cit.edu',
    password: 'dinesh123',
    role: 'student',
    route: 'Route 1',
    stop: 'Guindy',
    roll: 'CIT-2023-ME12',
    parentPhone: '+91 97334 45566',
    institution: 'Chennai Institute of Technology',
  },
];

// ─── Routes ──────────────────────────────────────────────────────────────────
export const routes = [
  {
    id: 'route1',
    name: 'Route 1',
    label: 'Tambaram to College',
    bus: 'TN01AB1234',
    driver: 'Rajan Kumar',
    stops: [
      { name: 'Tambaram',    time: '7:00 AM', latitude: 12.9249, longitude: 80.1000 },
      { name: 'Chromepet',   time: '7:15 AM', latitude: 12.9516, longitude: 80.1462 },
      { name: 'Pallavaram',  time: '7:30 AM', latitude: 12.9675, longitude: 80.1510 },
      { name: 'Guindy',      time: '7:45 AM', latitude: 13.0067, longitude: 80.2206 },
      { name: 'College Gate',time: '8:00 AM', latitude: 13.0100, longitude: 80.2350 },
    ],
  },
  {
    id: 'route2',
    name: 'Route 2',
    label: 'Velachery to College',
    bus: 'TN03EF9012',
    driver: 'Kumar S',
    stops: [
      { name: 'Velachery',    time: '7:00 AM', latitude: 12.9815, longitude: 80.2180 },
      { name: 'Madipakkam',   time: '7:20 AM', latitude: 12.9547, longitude: 80.1965 },
      { name: 'Keelkattalai', time: '7:40 AM', latitude: 12.9456, longitude: 80.1923 },
      { name: 'College Gate', time: '8:00 AM', latitude: 13.0100, longitude: 80.2350 },
    ],
  },
  {
    id: 'route3',
    name: 'Route 3',
    label: 'Porur to College',
    bus: 'TN05XY9876',
    driver: 'Unassigned',
    stops: [
      { name: 'Porur',        time: '7:15 AM', latitude: 13.0358, longitude: 80.1549 },
      { name: 'Ramapuram',    time: '7:30 AM', latitude: 13.0234, longitude: 80.1764 },
      { name: 'Guindy',       time: '7:45 AM', latitude: 13.0067, longitude: 80.2206 },
      { name: 'College Gate', time: '8:00 AM', latitude: 13.0100, longitude: 80.2350 },
    ],
  },
  {
    id: 'route8',
    name: 'Route 8',
    label: 'Ambattur to College',
    bus: 'TN08JK5678',
    driver: 'Preetham V',
    stops: [
      { name: 'Ambattur',      time: '6:45 AM', latitude: 13.1143, longitude: 80.1548 },
      { name: 'Padi',          time: '7:05 AM', latitude: 13.0878, longitude: 80.1833 },
      { name: 'Thirumangalam', time: '7:25 AM', latitude: 13.0732, longitude: 80.1952 },
      { name: 'College Gate',  time: '8:00 AM', latitude: 13.0100, longitude: 80.2350 },
    ],
  },
];

// ─── Students on routes (for driver view) ────────────────────────────────────
export const routeStudents = {
  'Route 1': [
    { id: 1, name: 'Ravi Kumar', stop: 'Tambaram', roll: 'CIT-2023-CS08', status: 'boarded' },
    { id: 2, name: 'Ananya R', stop: 'Chromepet', roll: 'CIT-2023-IT03', status: 'boarded' },
    { id: 3, name: 'Dinesh K', stop: 'Guindy', roll: 'CIT-2023-ME12', status: 'not_yet' },
    { id: 4, name: 'Priya M', stop: 'Tambaram', roll: 'CIT-2022-CS01', status: 'boarded' },
    { id: 5, name: 'Karthik V', stop: 'Chromepet', roll: 'CIT-2022-EC07', status: 'absent' },
    { id: 6, name: 'Meena R', stop: 'Pallavaram', roll: 'CIT-2022-IT12', status: 'boarded' },
    { id: 7, name: 'Arun S', stop: 'Guindy', roll: 'CIT-2023-ME05', status: 'not_yet' },
    { id: 8, name: 'Divya N', stop: 'Tambaram', roll: 'CIT-2022-CS14', status: 'absent' },
    { id: 9, name: 'Surya K', stop: 'Chromepet', roll: 'CIT-2023-EC11', status: 'boarded' },
    { id: 10, name: 'Lalitha P', stop: 'Pallavaram', roll: 'CIT-2023-CS19', status: 'boarded' },
  ],
  'Route 2': [
    { id: 1, name: 'Kiran S', stop: 'Velachery', roll: 'CIT-2023-EC14', status: 'boarded' },
    { id: 2, name: 'Suresh B', stop: 'Madipakkam', roll: 'CIT-2022-CS09', status: 'not_yet' },
    { id: 3, name: 'Lakshmi P', stop: 'Keelkattalai', roll: 'CIT-2022-ME08', status: 'boarded' },
    { id: 4, name: 'Ganesh T', stop: 'Velachery', roll: 'CIT-2023-IT06', status: 'absent' },
    { id: 5, name: 'Deepa V', stop: 'Madipakkam', roll: 'CIT-2023-CS03', status: 'boarded' },
  ],
  'Route 8': [
    { id: 1, name: 'Vijay R', stop: 'Ambattur', roll: 'CIT-2023-ME01', status: 'boarded' },
    { id: 2, name: 'Sakthi S', stop: 'Padi', roll: 'CIT-2023-CS05', status: 'not_yet' },
    { id: 3, name: 'Nithya K', stop: 'Thirumangalam', roll: 'CIT-2022-EC03', status: 'boarded' },
  ],
};

// ─── Maintenance Alerts ───────────────────────────────────────────────────────
export const maintenanceAlerts = [
  { id: 1, bus: 'TN05XY9876', type: 'Pollution Certificate', daysRemaining: 3, severity: 'Critical' },
  { id: 2, bus: 'TN08JK5678', type: 'Insurance Certificate', daysRemaining: 2, severity: 'Critical' },
  { id: 3, bus: 'TN03EF9012', type: 'Engine Service', daysRemaining: 7, severity: 'Warning' },
];

// ─── Fraud Logs ───────────────────────────────────────────────────────────────
export const fraudLogs = [
  {
    id: 1,
    student: 'Suresh Pillai',
    assignedRoute: 'Route 2',
    attemptedRoute: 'Route 1',
    stop: 'Chromepet',
    time: '07:05 AM',
    reason: 'Assigned to Route 2 but attempted Route 1 boarding',
  },
];

// ─── Trip History ─────────────────────────────────────────────────────────────
export const tripHistory = [
  { id: 1, date: '2026-05-27', day: 'Tuesday', route: 'Route 1', stop: 'Tambaram', bus: 'TN01AB1234', driver: 'Rajan Kumar', boardingTime: '7:02 AM', status: 'boarded' },
  { id: 2, date: '2026-05-26', day: 'Monday', route: 'Route 1', stop: 'Tambaram', bus: 'TN01AB1234', driver: 'Rajan Kumar', boardingTime: '-', status: 'absent' },
  { id: 3, date: '2026-05-25', day: 'Sunday', route: 'Route 1', stop: 'Tambaram', bus: 'TN01AB1234', driver: 'Rajan Kumar', boardingTime: '7:05 AM', status: 'boarded' },
  { id: 4, date: '2026-05-24', day: 'Saturday', route: 'Route 1', stop: 'Tambaram', bus: 'TN01AB1234', driver: 'Rajan Kumar', boardingTime: '6:58 AM', status: 'boarded' },
  { id: 5, date: '2026-05-23', day: 'Friday', route: 'Route 1', stop: 'Tambaram', bus: 'TN01AB1234', driver: 'Rajan Kumar', boardingTime: '7:01 AM', status: 'boarded' },
  { id: 6, date: '2026-05-22', day: 'Thursday', route: 'Route 1', stop: 'Tambaram', bus: 'TN01AB1234', driver: 'Rajan Kumar', boardingTime: '-', status: 'absent' },
  { id: 7, date: '2026-05-21', day: 'Wednesday', route: 'Route 1', stop: 'Tambaram', bus: 'TN01AB1234', driver: 'Rajan Kumar', boardingTime: '7:03 AM', status: 'boarded' },
];

export const absentHistory = [
  { id: 1, date: '2026-05-26', day: 'Monday' },
  { id: 2, date: '2026-05-22', day: 'Thursday' },
  { id: 3, date: '2026-05-15', day: 'Thursday' },
];

// ─── Design tokens ────────────────────────────────────────────────────────────
export const COLORS = {
  bg: '#080a0f',
  card: '#111318',
  cardAlt: '#0a0c12',
  border: '#1e2235',
  accent: '#7c8ff7',
  success: '#34d399',
  warning: '#fbbf24',
  danger: '#f87171',
  text: '#e2e8f0',
  muted: '#6b7280',
  successBg: '#0d2e1f',
  dangerBg: '#3f1f1f',
  accentBg: '#1f2340',
  avatarBg: '#2d3148',
};
