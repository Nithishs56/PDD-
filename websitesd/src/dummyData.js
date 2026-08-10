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
];

export const routes = [
  {
    id: 'route1',
    name: 'Route 1',
    label: 'Tambaram to College',
    bus: 'TN01AB1234',
    driver: 'Rajan Kumar',
    stops: [
      { name: 'Tambaram', time: '7:00 AM', lat: 12.9249, lng: 80.1000 },
      { name: 'Chromepet', time: '7:15 AM', lat: 12.9516, lng: 80.1462 },
      { name: 'Pallavaram', time: '7:30 AM', lat: 12.9675, lng: 80.1510 },
      { name: 'Guindy', time: '7:45 AM', lat: 13.0067, lng: 80.2206 },
      { name: 'College Gate', time: '8:00 AM', lat: 13.0100, lng: 80.2350 },
    ],
  },
  {
    id: 'route2',
    name: 'Route 2',
    label: 'Velachery to College',
    bus: 'TN03EF9012',
    driver: 'Kumar S',
    stops: [
      { name: 'Velachery', time: '7:00 AM', lat: 12.9815, lng: 80.2180 },
      { name: 'Madipakkam', time: '7:20 AM', lat: 12.9547, lng: 80.1965 },
      { name: 'Keelkattalai', time: '7:40 AM', lat: 12.9456, lng: 80.1923 },
      { name: 'College Gate', time: '8:00 AM', lat: 13.0100, lng: 80.2350 },
    ],
  },
];

export const routeStudents = {
  'Route 1': [
    { id: 1, name: 'Ravi Kumar', stop: 'Tambaram', roll: 'CIT-2023-CS08', status: 'pending' },
    { id: 2, name: 'Ananya R', stop: 'Chromepet', roll: 'CIT-2023-IT03', status: 'pending' },
    { id: 3, name: 'Dinesh K', stop: 'Guindy', roll: 'CIT-2023-ME12', status: 'pending' },
    { id: 4, name: 'Priya M', stop: 'Tambaram', roll: 'CIT-2022-CS01', status: 'pending' },
    { id: 5, name: 'Karthik V', stop: 'Chromepet', roll: 'CIT-2022-EC07', status: 'absent' },
  ],
  'Route 2': [
    { id: 1, name: 'Kiran S', stop: 'Velachery', roll: 'CIT-2023-EC14', status: 'pending' },
    { id: 2, name: 'Suresh B', stop: 'Madipakkam', roll: 'CIT-2022-CS09', status: 'pending' },
  ],
};
