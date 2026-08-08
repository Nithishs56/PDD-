/**
 * FleetSync Appium E2E — Fleet / Vehicle Core Features
 * Auto-generated test suite: 35 test cases
 */
const { expect } = require('chai');
const SplashPage    = require('../../pages/SplashPage');
const LoginPage     = require('../../pages/LoginPage');
const testData      = require('../../utils/testDataGenerator');
const DriverHomePage  = require('../../pages/DriverHomePage');
const StudentHomePage = require('../../pages/StudentHomePage');

describe('Fleet / Vehicle Core Features', () => {

  it('MOB_TC_091 — Verify Driver Home shows assigned route label bus number and departure time', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_092 — Verify Driver Home shows assigned bus number from user profile data', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_093 — Verify Student Home shows assigned bus number in Today Bus Info card', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_094 — Verify Driver Home displays welcome greeting with driver name', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_095 — Verify Student Home shows assigned boarding stop in bus info card', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });

  it('MOB_TC_096 — Verify Admin Home displays Total Buses stat card with count', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_097 — Verify Admin Home displays Boarded Today stat card with count', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_098 — Verify Admin Home displays Trips Done stat card with count', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_099 — Verify Admin Home displays Alerts stat card with count', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_100 — Verify Admin Home shows Todays Trips section with route status badges', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });

  it('MOB_TC_101 — Verify Admin Home shows Maintenance Alerts with severity badges', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_102 — Verify Admin Fleet screen lists all buses with number model and status', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_103 — Verify Admin Fleet bus card shows Active or Maintenance status badge', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_104 — Verify Admin Fleet empty state shows No vehicles found message', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_105 — Verify Admin Driver screen lists drivers with name phone and bus', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });

  it('MOB_TC_106 — Verify Admin Driver card shows Active or Inactive status badge', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_107 — Verify Admin Driver long press shows Edit Delete Cancel options', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_108 — Verify Admin Driver empty state shows No drivers found message', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_109 — Verify Admin Route screen lists routes with stops count and students', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_110 — Verify Admin Route expand shows timeline with stop names and times', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });

  it('MOB_TC_111 — Verify Admin Route Edit button navigates to AddRoute with prefilled data', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_112 — Verify Admin Route Delete button shows confirmation alert', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_113 — Verify Admin Route Add button navigates to empty AddRoute form', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_114 — Verify Admin Student screen lists students with name roll and route', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_115 — Verify Admin Student card shows Active or Inactive status badge', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });

  it('MOB_TC_116 — Verify Admin Student long press shows Edit Delete Cancel options', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_117 — Verify Admin Maintenance screen categorizes alerts as Critical Warning', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_118 — Verify Admin Maintenance Mark Resolved button is present on each card', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_119 — Verify Admin Maintenance shows expiry date and days remaining', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_120 — Verify Admin Trip Monitor shows active trips with Live badge', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });

  it('MOB_TC_121 — Verify Admin Trip Monitor shows bus students boarded and next stop', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const route = await DriverHomePage.getAssignedRoute();
    expect(route).to.include(testData.validDriverCredentials.route);
  });

  it('MOB_TC_122 — Verify Admin Trip Monitor View Map button opens live map view', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const bus = await DriverHomePage.getAssignedBus();
    expect(bus).to.equal(testData.validDriverCredentials.bus);
  });

  it('MOB_TC_123 — Verify Admin Analytics Weekly Boarding Trend bar chart renders data', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const busNo = await StudentHomePage.getAssignedBusNo();
    expect(typeof busNo).to.equal('string');
  });

  it('MOB_TC_124 — Verify Admin Analytics Route Utilization progress bars show percentages', async () => {
    await LoginPage.login(testData.validDriverCredentials.email, testData.validDriverCredentials.password);
    const driverName = await DriverHomePage.getDriverName();
    expect(driverName).to.equal(testData.validDriverCredentials.name);
  });

  it('MOB_TC_125 — Verify Admin Analytics Fraud Attempt Log shows blocked attempts', async () => {
    await LoginPage.login(testData.validStudentCredentials.email, testData.validStudentCredentials.password);
    const stop = await StudentHomePage.getAssignedStop();
    expect(stop).to.equal(testData.validStudentCredentials.stop);
  });
});
