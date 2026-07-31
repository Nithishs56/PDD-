/**
 * Test Data Generator — provides realistic test data based on dummyData.js
 */

const validDriverCredentials = {
  email: 'rajan@cit.edu',
  password: 'driver123',
  name: 'Rajan Kumar',
  role: 'driver',
  bus: 'TN01AB1234',
  route: 'Route 1',
};

const validStudentCredentials = {
  email: 'ravi@cit.edu',
  password: 'student123',
  name: 'Ravi Kumar',
  role: 'student',
  route: 'Route 1',
  stop: 'Tambaram',
  roll: 'CIT-2023-CS08',
};

const invalidCredentials = {
  wrongEmail: 'invalid@cit.edu',
  wrongPassword: 'wrongpass999',
  emptyEmail: '',
  emptyPassword: '',
  malformedEmail: 'not-an-email',
  sqlInjection: "' OR 1=1 --",
  xssPayload: '<script>alert("xss")</script>',
  longString: 'a'.repeat(500),
  specialChars: '!@#$%^&*()_+{}|:"<>?',
  unicodeChars: '日本語テスト',
};

const validOTPs = ['1234', '5678', '9012', '4567'];
const invalidOTPs = ['0000', '9999', '1111', 'abcd', '12', '123456', ''];

const vehicleFormData = {
  valid: {
    plate: 'TN10XY5678',
    capacity: '52',
    driver: 'Rajan Kumar',
    lastService: '15-07-2026',
    insurance: '15-01-2027',
    pollution: '15-10-2026',
  },
  emptyPlate: { plate: '', capacity: '52' },
  invalidCapacity: { plate: 'TN10XY5678', capacity: 'abc' },
  zeroCapacity: { plate: 'TN10XY5678', capacity: '0' },
  negativeCapacity: { plate: 'TN10XY5678', capacity: '-5' },
  longPlate: { plate: 'A'.repeat(100), capacity: '52' },
};

const routeFormData = {
  valid: {
    name: 'Route 10',
    bus: 'TN01AB1234',
    stops: [
      { name: 'Stop A', time: '7:00 AM' },
      { name: 'Stop B', time: '7:15 AM' },
      { name: 'College Gate', time: '8:00 AM' },
    ],
  },
  emptyName: { name: '', bus: 'TN01AB1234', stops: [{ name: 'S1', time: '7:00 AM' }] },
  noStops: { name: 'Route 11', bus: 'TN01AB1234', stops: [] },
  singleStop: { name: 'Route 12', bus: 'TN01AB1234', stops: [{ name: 'S1', time: '7:00 AM' }] },
};

const routes = [
  { id: 'route1', name: 'Route 1', label: 'Tambaram to College', bus: 'TN01AB1234', driver: 'Rajan Kumar' },
  { id: 'route2', name: 'Route 2', label: 'Velachery to College', bus: 'TN03EF9012', driver: 'Kumar S' },
  { id: 'route8', name: 'Route 8', label: 'Ambattur to College', bus: 'TN08JK5678', driver: 'Preetham V' },
];

module.exports = {
  validDriverCredentials,
  validStudentCredentials,
  invalidCredentials,
  validOTPs,
  invalidOTPs,
  vehicleFormData,
  routeFormData,
  routes,
};
